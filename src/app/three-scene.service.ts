import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

type ReaderDelegate = (blob: File, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene) => void;

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

    switch (fileExtension) {
      case 'gltf':
      case 'glb':
        readerDelegate = this.addGLTFFile;
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
    fileEntry.file((blob: File) => {

      // Here you can access the real file
      console.log(file.relativePath, file);

      readerDelegate(blob, file, files, this.scene);
     });
  }

  public addGLTFFile(blob: File, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene): void {

    const fileUrl = URL.createObjectURL(blob);
    const rootPath = file.relativePath.replace(file.fileEntry.name, '');
    const baseURL = THREE.LoaderUtils.extractUrlBase(fileUrl);
    const assetMap = new Map<string, File>();

    const loaderGLTF = new Promise((resolve, reject) => {

      const manager = new THREE.LoadingManager();

      // Intercept and override relative URLs.
      manager.setURLModifier((url: string) => {

        if (url == fileUrl) return url;

        const normalizedURL = rootPath + url
          .replace(baseURL, '')
          .replace(/^(\.?\/)/, '');

        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
          const blobURL = URL.createObjectURL(blob);
          blobURLs.push(blobURL);
          return blobURL;
        } else {
          for (const f in files) {
            const i = 1;
          }
        }
      });

      const loader = new GLTFLoader(manager);
      loader.setCrossOrigin('anonymous');

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath( 'lib/draco/' );
      loader.setDRACOLoader( dracoLoader );

      const blobURLs = [];

      loader.load(fileUrl, (gltf) => {

        const sceneGLTF = gltf.scene || gltf.scenes[0];
        const clips = gltf.animations || [];
        //this.setContent(scene, sceneGLTF, clips);
        {
          const box = new THREE.Box3().setFromObject(sceneGLTF);
          const size = box.getSize(new THREE.Vector3()).length();
          const center = box.getCenter(new THREE.Vector3());
      
          scene.add(sceneGLTF);
        }

        blobURLs.forEach(URL.revokeObjectURL);

        // See: https://github.com/google/draco/issues/349
        // THREE.DRACOLoader.releaseDecoderModule();

        resolve(gltf);

      }, undefined, reject);

    });
  }

  private setContent(scene: THREE.Scene, sceneGLTF: THREE.Scene, 
    clips: THREE.AnimationClip[]): void {

      const box = new THREE.Box3().setFromObject(sceneGLTF);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());
  
      scene.add(sceneGLTF);
  }

  public addJSONFile(blob: File, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    console.log('JSON file read.');
    console.warn('JSON not implemented.');
  }

  public addSTLFile(blob: File, file: NgxFileDropEntry, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    const url = URL.createObjectURL(blob);
    const loader = new STLLoader();
    const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    loader.load(url, geometry => {
      const mesh = new THREE.Mesh( geometry, material );
      scene.add(mesh);
    });
  }
 }
