import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry, FileSystemEntry } from 'ngx-file-drop';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { reject } from 'q';
import { Light } from './lights/light';
import { Lights } from './lights/lights';
import { LightsLibraryService } from './lights/lights-library.service';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LightType } from './lights/light-type.enum';

interface ViewerFile extends File {
  relativePath: string;
  reader: CompoundReader;
  contentSetter: ContentSetter;
  service: ThreeSceneService;
}

interface DragEvent {
  object: THREE.Object3D;
  target: DragControls;
  type: string;
}

interface DraggingChangedEvent {
  target: TransformControls;
  type: string;
  value: boolean;
}

type CallbackFinished = () => void;
type ReaderDelegate = (blob: ViewerFile, file: NgxFileDropEntry,
                       files: NgxFileDropEntry[], scene: THREE.Scene, finished: CallbackFinished) => void;
type CompoundReader = (blob: ViewerFile, fileMap: Map<string, File>, scene: THREE.Scene, finished: CallbackFinished) => void;
type ContentSetter = (scene: THREE.Scene, sceneGLTF: THREE.Scene, clips: THREE.AnimationClip[]) => void;

@Injectable({
  providedIn: 'root'
})

export class ThreeSceneService {
  private scene: THREE.Scene;
  public camera: THREE.OrthographicCamera;
  public renderer: THREE.WebGLRenderer;
  private material: THREE.Material = new THREE.MeshPhongMaterial( { color: 0xff5533, specular: 0x111111, shininess: 200 } );
  public transformControl: TransformControls;
  private hidingTransform: number;
  public orbitControls: OrbitControls;

  constructor(
    private lightsLibraryService: LightsLibraryService
  ) { }

  public getScene(): THREE.Scene {

    if (this.scene === undefined) {
      this.scene = new THREE.Scene();
      this.transformControl = null;
    }

    return this.scene;
  }

  public getNewScene(): THREE.Scene {

    this.scene = new THREE.Scene();
    this.transformControl = null;
    this.addCurrentLights();

    return this.scene;
  }

  private addCurrentLights(): void {
    const lts = this.lightsLibraryService.currentLights;
    if (!lts) { return; }

    for (const l of lts.lights) {
      this.scene.add(l.light);
      switch (l.type) {
        case LightType.DIRECTIONAL:
          const dl = l.light as THREE.DirectionalLight;
          this.scene.add(dl.target);
          break;
        case LightType.SPOT:
          const sl = l.light as THREE.SpotLight;
          this.scene.add(sl.target);
          break;
      }
    }
  }

  public getSceneJSON(): string {
    if (this.scene === undefined) {
      return '';
    }

    return JSON.stringify(this.scene);
  }

  public addFiles(files: NgxFileDropEntry[], finished: CallbackFinished): void {
    for (const file of files) {

      // Is it a file?
      if (file.fileEntry.isFile) {
        this.addFile(file, files, finished);
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        console.log(`Unprocessed folder ${file.relativePath}`);
      }
    }
  }

  public addFile(file: NgxFileDropEntry, files: NgxFileDropEntry[], finished: CallbackFinished): void {

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
      vf.service = this;
      readerDelegate(vf, file, files, this.scene, finished);
     });
  }

  public addGLTFFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                     scene: THREE.Scene, finished: CallbackFinished): void {
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
          finished();
          ret(vf);
        });
      });
      readers.push(reader);
    }

    Promise.all(readers).then(fs => {
      for (const f of fs) {
        fileMap[f.relativePath] = f;
      }
      blob.reader(blob, fileMap, scene, finished);
    });
  }

  private readGLTFFile(blob: ViewerFile, fileMap: Map<string, File>, scene: THREE.Scene, finished: CallbackFinished): void {

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
      finished();
    }, undefined, reject);
  }

  // This is to avoid lint error.
  contentSetter(scene: THREE.Scene, sceneGLTF: THREE.Scene, clips: THREE.AnimationClip[]) {
    throw new Error('Method not implemented.');
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

  public addSTLFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                    scene: THREE.Scene, finished: CallbackFinished): void {
    const url = URL.createObjectURL(blob);
    const loader = new STLLoader();
    const material = blob.service.material;
    loader.load(url, geometry => {
      const mesh = new THREE.Mesh( geometry, material );
      scene.add(mesh);
      finished();
    });
  }

  public setMaterial(material: THREE.Material): void {
    this.material = material;
  }

  public getMaterial(): THREE.Material {
    return this.material;
  }

  public getLights(): Lights {
    const ret: Lights = new Lights();
    ret.name = 'Default';

    const scene = this.scene == null ? this.getNewScene() : this.scene;

    for (const child of scene.children) {
      if (!(child instanceof THREE.Light)) { continue; }

      const light = Light.CreateLight(child);

      if (!light) { continue; }

      ret.lights.push(light);
    }

    return ret;
  }

  public getDragControl(objects: THREE.Object3D[]): DragControls {
    return new DragControls(objects, this.camera, this.renderer.domElement);
  }

  public cancelHideTransform(): void {
    if (this.hidingTransform !== undefined) {
      window.clearTimeout(this.hidingTransform);
    }
  }

  public delayHideTransform(): void {
    this.cancelHideTransform();
    this.hideTransform();
  }

  private hideTransform(): void {
    this.hidingTransform = window.setTimeout(this.detatchTransformObject.bind(this), 2500);
  }

  private detatchTransformObject(): void {
    this.transformControl.detach();
  }

  public onTransformDraggingChanged(event: DraggingChangedEvent): void {
    this.orbitControls.enabled = !event.value;
  }

  public onDragHoveron(event: DragEvent): void {
    if (!this.transformControl) { return; }
    this.transformControl.enabled = true;
    this.transformControl.attach( event.object );
    this.cancelHideTransform();
  }

  private Render(): void {
    this.renderer.render(this.getScene(), this.camera);
  }

  public removeObjectFromScene(object: THREE.Object3D): void {
    if (object == null) { return; }

    if (this.scene == null) { return; }

    const index = this.scene.children.indexOf(object);
    if (index > -1) {
      this.scene.children.splice(index, 1);
    }
  }

  public resetLights(): void {
    if (this.scene == null) { return; }
    this.removeLights();
    this.addCurrentLights();
  }

  private removeLights(): void {
    if (this.scene == null) { return; }

    const lights = new Array<THREE.Object3D>();

    for (const child of this.scene.children) {
      if (!(child instanceof THREE.Light)) { continue; }
      lights.push(child);
    }

    for (const obj of lights) {
      this.removeObjectFromScene(obj);
    }
  }

  public getSceneBox(): THREE.Box3 {

    let box = this.sceneBox(this.scene, true)
    if (!box) {
      box = new THREE.Box3(new THREE.Vector3(-2000, -2000, -2000),
        new THREE.Vector3(2000, 2000, 2000));
    }
    return box;
  }

  private sceneBox(scene: THREE.Object3D, start: boolean): THREE.Box3 {
    if (!scene) { return; }

    let box: THREE.Box3;
    for (const object of scene.children) {
      if (object instanceof THREE.Light) {
        continue;
      } else if (object instanceof THREE.Mesh) {
        if (box) {
          box = box.union(new THREE.Box3().setFromObject(object));
        } else {
          box = new THREE.Box3().setFromObject(object);
        }
      } else if ((!start && object.children.length > 0) ||
        (object instanceof THREE.Scene)) {
        if (box) {
          const b = this.sceneBox(object, false);
          if (b) { box = box.union(b); }
        } else {
          box = this.sceneBox(object, false);
        }
      }
    }

    return box;
  }

  public rescaleScene(): void {
    if (!this.scene) { return; }

    const box = this.getSceneBox();
    if (!box) { return; }
    const direction = new THREE.Vector3();
    this.camera.getWorldDirection(direction);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    const center = sphere.center;
    const radius = sphere.radius;
    const pos = center.clone().sub(direction.multiplyScalar(1.5 * radius));
    this.camera.position.set(pos.x, pos.y, pos.z);
    const aspect = (this.camera.top - this.camera.bottom) / (this.camera.right - this.camera.left);
    const f = 1.5;
    this.camera.far = 2 * f * radius;
    this.camera.near = 0.1 * radius;
    this.camera.top = f * aspect * radius;
    this.camera.bottom = -f * aspect * radius;
    this.camera.left = -f * radius;
    this.camera.right = f * radius;
    this.camera.zoom = 1;

    this.camera.updateProjectionMatrix();
    this.orbitControls.target.set(center.x, center.y, center.z);
    this.orbitControls.update();
  }
}
