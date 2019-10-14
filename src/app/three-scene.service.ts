import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type ReaderDelegate = (fileReader: FileReader, scene: THREE.Scene) => void;

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
        this.addFile(file);
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = file.fileEntry as FileSystemDirectoryEntry;
        console.log(file.relativePath, fileEntry);
      }
    }
  }

  public addFile(file: NgxFileDropEntry): void {

    const fileExtension = file.relativePath.split('.').pop().toLocaleLowerCase();

    let readerDelegate: ReaderDelegate;

    switch (fileExtension) {
      case 'gltf':
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
    fileEntry.file((fileDescriptor: File) => {

      // Here you can access the real file
      console.log(file.relativePath, file);

      const fileReader = new FileReader();
      fileReader.onload = (e) => readerDelegate(fileReader, this.scene);
      fileReader.readAsBinaryString(fileDescriptor);
    });
  }

  public addGLTFFile(fileReader: FileReader, scene: THREE.Scene): void {
    const loader = new GLTFLoader();
    loader.parse.bind(this);
    loader.parse(fileReader.result, '.',
      gltf => {
      scene.add( gltf.scene );
      // this.materials = this.ExtractMaterials(this.scene);
      // this.Render();
    }
    );
 }

  public addJSONFile(fileReader: FileReader, scene: THREE.Scene): void {
    console.log(fileReader.result);
    console.log('JSON file read.');
  }

  public addSTLFile(fileReader: FileReader, scene: THREE.Scene): void {
    const loader = new STLLoader();
    const geometry = loader.parse(fileReader.result);
    const material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
    const mesh = new THREE.Mesh( geometry, material );
    scene.add(mesh);
  }
 }
