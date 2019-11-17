import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry, FileSystemEntry } from 'ngx-file-drop';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { resolve } from 'url';
import { reject } from 'q';

interface ViewerFile extends File {
  relativePath: string;
  reader: CompoundReader;
  contentSetter: ContentSetter;
}

type ReaderDelegate = (blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene) => void;
type CompoundReader = (blob: ViewerFile, fileMap: Map<string, File>, scene: THREE.Scene) => void;
type ContentSetter = (scene: THREE.Scene, sceneGLTF: THREE.Scene, clips: THREE.AnimationClip[]) => void;

@Injectable({
  providedIn: 'root'
})

export class ThreeSceneService {
  private scene: THREE.Scene;

  constructor(
// private http: HttpClient
  ) { }

  public getScene(): THREE.Scene {

    if (this.scene === undefined) {
      this.scene = new THREE.Scene();
    }

    return this.scene;
  }

  public getNewScene(): THREE.Scene {

    this.scene = new THREE.Scene();
    let light = new THREE.DirectionalLight('#ffffff', 3);
    light.position.set(0, 1, 1);
    this.scene.add(light);
    light = new THREE.DirectionalLight('#ffffff', 2);
    light.position.set(0, -1, -1);
    this.scene.add(light);

    return this.scene;
  }

  public getSceneJSON(): string {
    if (this.scene === undefined) {
      return '';
    }

    return JSON.stringify(this.scene);
  }

  public addFiles(files: NgxFileDropEntry[]): void {
    for (const file of files) {

      // Is it a file?
      if (file.fileEntry.isFile) {
        this.addFile(file, files);
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        console.log(`Unprocessed folder ${file.relativePath}`);
      }
    }
  }

  public addFile(file: NgxFileDropEntry, files: NgxFileDropEntry[]): void {

    const fileExtension = file.relativePath.split('.').pop().toLocaleLowerCase();

    let readerDelegate: ReaderDelegate;
    let reader: CompoundReader;
    let contentSetter: ContentSetter;

    switch (fileExtension) {
      case 'gltf':
      case 'glb':
        readerDelegate = this.addGLTFFile;
        reader = this.readGLTFFile;
        contentSetter = this.setContent;
        break;
      case 'json':
        readerDelegate = this.addJSONFile;
        break;
      case 'stl':
        readerDelegate = this.addSTLFile;
        break;
      default:
        console.warn(`'${fileExtension}' is unsupported file type.`);
        return;
    }

    if (this.scene === undefined) {
      this.scene = new THREE.Scene();
    }

    const fileEntry = file.fileEntry as FileSystemFileEntry;
    readerDelegate.bind(this);
    fileEntry.file.bind(this);
    fileEntry.file((blob: File) => {
      const vf = blob as ViewerFile;
      vf.relativePath = file.relativePath;
      vf.reader = reader;
      vf.contentSetter = contentSetter;
      readerDelegate(vf, file, files, this.scene);
     });
  }

  public addGLTFFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    const rootPath = file.relativePath.replace(file.fileEntry.name, '');
    const readers: Promise<ViewerFile>[] = [];
    const fileMap = new Map<string, File>();

    for (const f of files) {
      if (!f.relativePath.startsWith(rootPath) || file.relativePath === f.relativePath) {
        continue;
      }
      const reader = new Promise<ViewerFile>((ret) => {
        const fileEntry = f.fileEntry as FileSystemFileEntry;
        fileEntry.file((data) => {
          const vf = data as ViewerFile;
          vf.relativePath = f.relativePath;
          ret(vf);
        });
      });
      readers.push(reader);
    }

    Promise.all(readers).then(fs => {
      for (const f of fs) {
        fileMap[f.relativePath] = f;
      }
      blob.reader(blob, fileMap, scene);
    });
  }

  private readGLTFFile(blob: ViewerFile, fileMap: Map<string, File>, scene: THREE.Scene): void {

    const fileUrl = URL.createObjectURL(blob);
    const rootPath = blob.relativePath.replace(blob.name, '');
    const baseURL = THREE.LoaderUtils.extractUrlBase(fileUrl);

    const manager = new THREE.LoadingManager();

    const blobURLs = [];

    // Intercept and override relative URLs.
    manager.setURLModifier((url: string) => {

      if (url === fileUrl) {
        return url;
      }

      const normalizedURL = rootPath + url
        .replace(baseURL, '')
        .replace(/^(\.?\/)/, '');

      const data = fileMap[normalizedURL];
      if (!data) {
        return url;
      }
      const blobURL = URL.createObjectURL(data);
      blobURLs.push(blobURL);
      return blobURL;
    });

    const loader = new GLTFLoader(manager);
    loader.setCrossOrigin('anonymous');

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath( '/assets/lib/draco/' );
    loader.setDRACOLoader( dracoLoader );

    loader.load(fileUrl, (gltf) => {
      const sceneGLTF = gltf.scene || gltf.scenes[0];
      const clips = gltf.animations || [];
      this.contentSetter(scene, sceneGLTF, clips);

      blobURLs.forEach(URL.revokeObjectURL);
    }, undefined, reject);
  }

  private setContent(scene: THREE.Scene, sceneGLTF: THREE.Scene,
                     clips: THREE.AnimationClip[]): void {

      const box = new THREE.Box3().setFromObject(sceneGLTF);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      scene.add(sceneGLTF);
  }

  public addJSONFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    console.log('JSON file read.');
    console.warn('JSON not implemented.');
  }

  public addSTLFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    const url = URL.createObjectURL(blob);
    const loader = new STLLoader();
    const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    loader.load(url, geometry => {
      const mesh = new THREE.Mesh( geometry, material );
      scene.add(mesh);
    });
  }
 }
