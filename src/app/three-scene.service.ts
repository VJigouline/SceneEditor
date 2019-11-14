import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type ReaderDelegate = (file: File, files: NgxFileDropEntry[], scene: THREE.Scene) => void;

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

      readerDelegate(blob, files, this.scene);
     });
  }

  public addGLTFFile(blob: File, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    /*
    const loader = new Promise((resolve, reject) => {

      const manager = new THREE.LoadingManager();

      // Intercept and override relative URLs.
      manager.setURLModifier((url: string) => {

        const normalizedURL = rootPath + url
          .replace(baseURL, '')
          .replace(/^(\.?\/)/, '');

        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
          const blobURL = URL.createObjectURL(blob);
          blobURLs.push(blobURL);
          return blobURL;
        }

        return (path || '') + url;

      });

      const loader = new THREE.GLTFLoader(manager);
      loader.setCrossOrigin('anonymous');

      const dracoLoader = new THREE.DRACOLoader();
      dracoLoader.setDecoderPath( 'lib/draco/' );
      loader.setDRACOLoader( dracoLoader );

      const blobURLs = [];

      loader.load(url, (gltf) => {

        const scene = gltf.scene || gltf.scenes[0];
        const clips = gltf.animations || [];
        this.setContent(scene, clips);

        blobURLs.forEach(URL.revokeObjectURL);

        // See: https://github.com/google/draco/issues/349
        // THREE.DRACOLoader.releaseDecoderModule();

        resolve(gltf);

      }, undefined, reject);

    });
    */
 }

  public addJSONFile(blob: File, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    console.log('JSON file read.');
    console.warn('JSON not implemented.');
  }

  public addSTLFile(blob: File, files: NgxFileDropEntry[], scene: THREE.Scene): void {
    const url = URL.createObjectURL(blob);
    const loader = new STLLoader();
    const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    loader.load(url, geometry => {
      const mesh = new THREE.Mesh( geometry, material );
      scene.add(mesh);
    });
  }
 }
