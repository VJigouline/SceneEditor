import { Injectable } from '@angular/core';
import { DragEvent } from './interfaces';
import * as THREE from 'three';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry, FileSystemEntry } from 'ngx-file-drop';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
import { Light } from './lights/light';
import { Lights } from './lights/lights';
import { LightsLibraryService } from './lights/lights-library.service';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LightType } from './lights/light-type.enum';
import { Material } from './materials/material';
import { Materials } from './materials/materials';
import { Polygon3 } from './geometries/polygon3';
import { HoverControl } from './threejs-extensions/hover-control';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './user-controls/error-dialog/error-dialog.component';
import { RaytraceService } from './raytracer/raytrace.service';
import { loadIfc } from 'mc-ifc-import';
import { loadStepAsync } from 'mc-step-import';
import { loadOgre, readZip } from 'mc-ogre-import';
import { loadBlend } from 'mc-blender-import';
import { loadDxf } from 'mc-dxf-import';
import { loadObj } from 'mc-obj-import';
import { loadFbx } from 'mc-fbx-import';
import { load3mf } from 'mc-3mf-import';
import { loadPly } from 'mc-ply-import';
import { load3ds } from 'mc-3ds-import';
import { loadSvg } from 'mc-svg-import';
import { loadUsd } from 'mc-usd-import';
import { loadUsdz } from 'mc-usdz-import';
import { load3dm } from 'mc-3dm-import';
import { loadCityJson } from 'mc-cityjson-import';
import { loadIges } from 'mc-iges-import';
import { loadGcode } from 'mc-gcode-import';
import { loadVrml } from 'mc-vrml-import';
import { loadX3d } from 'mc-x3d-import';
import { loadHdr, applyEnvironment } from 'mc-hdr-import';
import { loadExr } from 'mc-exr-import';
import { loadLas } from 'mc-las-import';
import { loadE57 } from 'mc-e57-import';
import { loadXyz } from 'mc-xyz-import';
import { loadPcd } from 'mc-pcd-import';
import { loadAmf } from 'mc-amf-import';
import { loadOff } from 'mc-off-import';
import { loadKmz } from 'mc-kmz-import';
import { type UrlFile } from './url-loader';
import { loadDraco, createDracoDecoder, type DracoModule } from 'mc-draco-import';

/** A file given to an importer: its path in the drop, and its contents. */
interface NamedBlob { name: string; data: Blob; }

/** One of the formats read by an mc-*-import package with a single call. */
interface Importer {
  /** The format's name, for messages. */
  label: string;
  /** Other dropped files the model may use, such as material libraries, layers and textures. */
  resources?: RegExp;
  /** Reads the file, with its resources; a zip holds them itself. */
  load: (file: NamedBlob, resources: NamedBlob[], zip: boolean) =>
    Promise<{ group: THREE.Group; warnings: string[]; missing?: string[] }>;
}

const images = 'png|jpe?g|tga|bmp|gif|webp|avif|dds|tiff?|exr|hdr';
// Gives an importer the file with its resources, or the zip alone, which it opens itself.
const withResources = (file: NamedBlob, resources: NamedBlob[], zip: boolean) =>
  ({ files: [file, ...resources], options: zip ? {} : { main: file.name } });
// rhino3dm.wasm is copied to the assets by angular.json.
const rhinoOptions = { locateFile: (name: string) => `assets/rhino3dm/${name}` };
// laz-perf.wasm is copied to the assets by angular.json.
const lazPerfOptions = { locateFile: (name: string) => `assets/laz-perf/${name}` };
// three.js's Draco decoder, copied to the assets by angular.json, loaded once.
let dracoDecoder: Promise<DracoModule> | undefined;
const draco = () => dracoDecoder ??= Promise.all([
  fetch('assets/draco3d/draco_wasm_wrapper.js').then(r => r.text()),
  fetch('assets/draco3d/draco_decoder.wasm').then(r => r.arrayBuffer())
]).then(([wrapper, wasm]) => createDracoDecoder(wrapper, wasm));

const importers: Record<string, Importer> = {
  obj: {
    label: 'OBJ', resources: new RegExp(`\\.(mtl|${images})$`, 'i'),
    load: (f, r, zip) => { const { files, options } = withResources(f, r, zip); return loadObj(files, options); }
  },
  fbx: {
    label: 'FBX', resources: new RegExp(`\\.(${images})$`, 'i'),
    load: (f, r, zip) => { const { files, options } = withResources(f, r, zip); return loadFbx(files, options); }
  },
  '3ds': {
    label: '3DS', resources: new RegExp(`\\.(${images})$`, 'i'),
    load: (f, r, zip) => { const { files, options } = withResources(f, r, zip); return load3ds(files, options); }
  },
  usd: {
    label: 'USD', resources: new RegExp(`\\.(usd[ac]?|${images})$`, 'i'),
    load: (f, r, zip) => { const { files, options } = withResources(f, r, zip); return loadUsd(files, options); }
  },
  '3mf': { label: '3MF', load: f => load3mf(f) },
  ply: { label: 'PLY', load: f => loadPly(f) },
  svg: { label: 'SVG', load: f => loadSvg(f) },
  usdz: { label: 'USDZ', load: f => loadUsdz(f) },
  '3dm': { label: 'Rhino 3DM', load: async f => load3dm(await f.data.arrayBuffer(), { rhinoOptions }) },
  cityjson: { label: 'CityJSON', load: async f => loadCityJson(await f.data.text()) },
  iges: { label: 'IGES', load: async f => loadIges(await f.data.arrayBuffer()) },
  gcode: { label: 'G-code', load: f => loadGcode(f) },
  vrml: {
    label: 'VRML', resources: new RegExp(`\\.(${images})$`, 'i'),
    load: (f, r, zip) => { const { files, options } = withResources(f, r, zip); return loadVrml(files, options); }
  },
  x3d: {
    label: 'X3D', resources: new RegExp(`\\.(${images})$`, 'i'),
    load: (f, r, zip) => { const { files, options } = withResources(f, r, zip); return loadX3d(files, options); }
  },
  las: { label: 'LAS', load: async f => loadLas(await f.data.arrayBuffer(), { lazPerfOptions }) },
  e57: { label: 'E57', load: f => loadE57(f) },
  xyz: { label: 'XYZ', load: f => loadXyz(f) },
  pcd: { label: 'PCD', load: f => loadPcd(f) },
  amf: { label: 'AMF', load: f => loadAmf(f) },
  off: { label: 'OFF', load: f => loadOff(f) },
  kmz: { label: 'KMZ', load: f => loadKmz(f) },
  draco: { label: 'Draco', load: async f => loadDraco(f, { draco: await draco() }) },
};

/** Environment maps, which light the scene and show behind it. */
const environmentExtensions = ['hdr', 'exr'];

/** The importer for each file extension. */
const importerExtensions: Record<string, string> = {
  obj: 'obj', fbx: 'fbx', '3ds': '3ds', usd: 'usd', usda: 'usd', usdc: 'usd', '3mf': '3mf', ply: 'ply',
  svg: 'svg', usdz: 'usdz', '3dm': '3dm', 'city.json': 'cityjson', jsonl: 'cityjson',
  igs: 'iges', iges: 'iges', gcode: 'gcode', gco: 'gcode', nc: 'gcode', ngc: 'gcode', tap: 'gcode', cnc: 'gcode',
  wrl: 'vrml', wrz: 'vrml', x3d: 'x3d', x3dv: 'x3d', x3dz: 'x3d', x3dvz: 'x3d', las: 'las', laz: 'las', e57: 'e57',
  xyz: 'xyz', pts: 'xyz', pcd: 'pcd', amf: 'amf', off: 'off', kmz: 'kmz', drc: 'draco'
};

interface ViewerFile extends File {
  relativePath: string;
  reader: CompoundReader;
  contentSetter: ContentSetter;
  service: ThreeSceneService;
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
  private static readonly modelExtensions = ['glb', 'gltf', 'dae', 'stl', 'ifc', 'stp', 'step', 'p21', 'stpz', 'polygons', 'scene', 'mesh', 'mesh.xml', 'zip', 'blend', 'dxf', ...Object.keys(importerExtensions), ...environmentExtensions];

  private scene: THREE.Scene;
  public camera: THREE.OrthographicCamera;
  public renderer: THREE.WebGLRenderer;
  private material: THREE.Material = new THREE.MeshStandardMaterial( {
    color: '#fd421d', metalness: 1, roughness: 0.5, name: 'Default', side: THREE.DoubleSide } );
  public transformControl: TransformControls;
  private hidingTransform: number;
  /** Set when the view was asked to fit the scene before it had a size. */
  private fitPending = false;
  public orbitControls: OrbitControls;
  public lastMouseEvent: MouseEvent;

  constructor(
    private lightsLibraryService: LightsLibraryService,
    private spinner : NgxSpinnerService,
    private errorDialog: MatDialog,
    private raytrace: RaytraceService,
  ) { }

  public getScene(): THREE.Scene {

    if (this.scene === undefined) {
      this.scene = this.getNewScene();
    }

    return this.scene;
  }

  public getNewScene(): THREE.Scene {

    this.scene = new THREE.Scene();
    this.addCurrentLights(this.scene);
    if (this.transformControl) { this.scene.add(this.transformControl.getHelper()); }

    return this.scene;
  }

  public addCurrentLights(scene: THREE.Scene): void {
    if (!scene) { return; }
    const lts = this.lightsLibraryService.currentLights;
    if (!lts) { return; }
    const clone = scene !== this.scene;

    for (const l of lts.lights) {
      if (clone) {
        const light = l.clone();
        scene.add(light.light);
      } else {
        scene.add(l.light);
      }
      if (!clone) {
        switch (l.type) {
          case LightType.DIRECTIONAL:
            const dl = l.light as THREE.DirectionalLight;
            scene.add(dl.target);
            break;
          case LightType.SPOT:
            const sl = l.light as THREE.SpotLight;
            scene.add(sl.target);
            break;
        }
      }
    }
  }

  public getSceneJSON(): string {
    if (this.scene === undefined) {
      return '';
    }

    return JSON.stringify(this.scene);
  }

  // Wraps files from an open file dialog so they load the same way as dropped files.
  public toFileEntries(files: File[]): NgxFileDropEntry[] {
    return files.map(file => {
      const entry: FileSystemFileEntry = {
        name: file.name,
        isFile: true,
        isDirectory: false,
        file: <T>(callback: (f: File) => T) => callback(file)
      };
      return new NgxFileDropEntry(file.name, entry);
    });
  }

  // Wraps files read from a URL, keeping the paths a model uses to find its buffers and textures.
  public toUrlEntries(files: UrlFile[]): NgxFileDropEntry[] {
    return files.map(({ path, data }) => {
      const name = path.split('/').pop();
      const file = new File([data], name, { type: data.type });
      const entry: FileSystemFileEntry = {
        name,
        isFile: true,
        isDirectory: false,
        file: <T>(callback: (f: File) => T) => callback(file)
      };
      return new NgxFileDropEntry(path, entry);
    });
  }

  public addFiles(files: NgxFileDropEntry[], finished: CallbackFinished): void {
    // Library files are taken out of a drop before it gets here, so nothing may be left.
    if (files.length === 0) { return; }

    // The spinner is only hidden by a finished load or a load error, so it must only be shown
    // when a load will start. Other files in a dropped folder may be a model's textures and buffers.
    let models = files.filter(file => this.isModelFile(file));
    // The meshes beside an Ogre .scene file are its resources, not models of their own.
    if (models.some(file => this.fileExtension(file) === 'scene')) {
      models = models.filter(file => !['mesh', 'mesh.xml'].includes(this.fileExtension(file)));
    }
    // USD layers below the shallowest ones are the layers they reference, not models of their own.
    const depth = (file: NgxFileDropEntry) => file.relativePath.split(/[\\/]/).length;
    const usd = models.filter(file => importerExtensions[this.fileExtension(file)] === 'usd');
    if (usd.length > 1) {
      const top = Math.min(...usd.map(depth));
      models = models.filter(file => !usd.includes(file) || depth(file) === top);
    }
    // A mesh given as both .mesh and .mesh.xml is loaded once, from the binary file.
    const paths = new Set(models.map(file => file.relativePath.toLocaleLowerCase()));
    models = models.filter(file =>
      this.fileExtension(file) !== 'mesh.xml' || !paths.has(file.relativePath.toLocaleLowerCase().slice(0, -4)));
    if (models.length === 0) {
      this.reportNoModels(files);
      return;
    }

    this.spinner.show();
    for (const file of models) {
      this.addFile(file, files, finished);
    }
  }

  private isModelFile(file: NgxFileDropEntry): boolean {
    return file.fileEntry.isFile && ThreeSceneService.modelExtensions.includes(this.fileExtension(file));
  }

  private fileExtension(file: NgxFileDropEntry): string {
    const name = file.relativePath.toLocaleLowerCase();
    // Ogre XML meshes are .mesh.xml; other .xml files are not models.
    if (name.endsWith('.mesh.xml')) { return 'mesh.xml'; }
    if (name.endsWith('.city.json')) { return 'city.json'; }
    return name.split('.').pop();
  }

  private reportNoModels(files: NgxFileDropEntry[]): void {
    const shown = 5;
    const names = files.slice(0, shown).map(file => file.relativePath).join(', ');
    const more = files.length > shown ? ` and ${files.length - shown} more` : '';
    const types = ThreeSceneService.modelExtensions.map(extension => '.' + extension).join(', ');
    this.errorDialog.open(ErrorDialogComponent, {
      width: '350px',
      data: {
        title: 'Nothing to load',
        label: `SceneEditor can load ${types}. It can't load: `,
        message: names + more,
        close: true
      }
    });
  }

  public addFile(file: NgxFileDropEntry, files: NgxFileDropEntry[], finished: CallbackFinished): void {

    const fileExtension = this.fileExtension(file);

    let readerDelegate: ReaderDelegate;
    let reader: CompoundReader;
    let contentSetter: ContentSetter;

    switch (fileExtension) {
      case 'dae':
        readerDelegate = this.addColladaFile;
        reader = this.readColladaFile;
        contentSetter = this.setContent;
        break;
      case 'gltf':
      case 'glb':
        readerDelegate = this.addGLTFFile;
        reader = this.readGLTFFile;
        contentSetter = this.setContent;
        break;
      case 'polygons':
        readerDelegate = this.addPolygonsFile;
        break;
      case 'stl':
        readerDelegate = this.addSTLFile;
        break;
      case 'ifc':
        readerDelegate = this.addIfcFile;
        break;
      case 'stp':
      case 'step':
      case 'p21':
      case 'stpz':
        readerDelegate = this.addStepFile;
        break;
      case 'scene':
      case 'mesh':
      case 'mesh.xml':
        readerDelegate = this.addOgreFile;
        break;
      case 'zip':
        readerDelegate = this.addZipFile;
        break;
      case 'blend':
        readerDelegate = this.addBlendFile;
        break;
      case 'dxf':
        readerDelegate = this.addDxfFile;
        break;
      case 'hdr':
      case 'exr':
        readerDelegate = this.addEnvironmentFile;
        break;
      default:
        if (!importerExtensions[fileExtension]) {
          console.warn(`'${fileExtension}' is unsupported file type.`);
          return;
        }
        readerDelegate = this.addImportedFile;
    }

    if (this.scene === undefined) {
      this.scene = new THREE.Scene();
    }

    const fileEntry = file.fileEntry as FileSystemFileEntry;
    fileEntry.file.bind(this);
    const filereader = (blob: File) => {
      const vf = blob as ViewerFile;
      vf.relativePath = file.relativePath;
      vf.reader = reader;
      vf.contentSetter = contentSetter;
      vf.service = this;
      readerDelegate.bind(this);
      readerDelegate(vf, file, files, this.scene, finished);
    };
    filereader.bind(this);
    fileEntry.file(filereader);
  }

  public addColladaFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
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

  private readColladaFile(blob: ViewerFile, fileMap: Map<string, File>, scene: THREE.Scene, finished: CallbackFinished): void {

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

    const loader = new ColladaLoader(manager);
    loader.setCrossOrigin('anonymous');

    loader.load(fileUrl, (file) => {
      const sceneCollada = file.scene;
      const clips = /*file.animations ||*/ [];
      this.contentSetter(scene, sceneCollada, clips);

      // blobURLs.forEach(URL.revokeObjectURL);
      finished();
    }, undefined, (event) => {
      blob.service.onFileLoadError({ message: event instanceof Error ? event.message : (event as ErrorEvent)?.message ?? String(event) }, blob.service);
    }
    );
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
    // three.js's own Draco decoder, copied to the assets by angular.json.
    dracoLoader.setDecoderPath( 'assets/draco3d/' );
    loader.setDRACOLoader( dracoLoader );

    loader.load(fileUrl, (gltf) => {
      const sceneGLTF = gltf.scene;
      const clips = gltf.animations || [];
      this.contentSetter(scene, sceneGLTF, clips);

      blobURLs.forEach(URL.revokeObjectURL);
      finished();
    }, undefined, (event) => {
      blob.service.onFileLoadError({ message: event instanceof Error ? event.message : (event as ErrorEvent)?.message ?? String(event) }, blob.service);
    }
    );
  }

  // This is to avoid lint error.
  contentSetter(scene: THREE.Scene, sceneGLTF: THREE.Group | THREE.Scene, clips: THREE.AnimationClip[]) {
    throw new Error('Method not implemented.');
  }

  private setContent(scene: THREE.Scene, sceneGLTF: THREE.Scene,
                     clips: THREE.AnimationClip[]): void {

      const box = new THREE.Box3().setFromObject(sceneGLTF);
      const size = box.getSize(new THREE.Vector3()).length();
      const center = box.getCenter(new THREE.Vector3());

      scene.add(sceneGLTF);
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
    }, undefined, (event) => {
      blob.service.onFileLoadError({ message: event instanceof Error ? event.message : (event as ErrorEvent)?.message ?? String(event) }, blob.service);
    }
    );
  }

  /** Reads an IFC file (IFC2X3 or any schema of the IFC4 line) with mc-ifc-import. */
  public addIfcFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                    scene: THREE.Scene, finished: CallbackFinished): void {
    const service = blob.service;
    const fail = (error: unknown) =>
      service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service);
    blob.arrayBuffer().then(data => {
      // Give the spinner a frame to appear: the import runs in the page.
      setTimeout(() => {
        try {
          const result = loadIfc(data);
          for (const warning of result.warnings) { console.warn(`IFC import (${result.schema.id}): ${warning}`); }
          result.group.name = file.relativePath;
          scene.add(result.group);
          finished();
        } catch (error) {
          fail(error);
        }
      }, 0);
    }, fail);
  }

  /** Reads a STEP file (AP203, AP214, AP242 and others; .stpz gzip-compressed) with mc-step-import. */
  public addStepFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                     scene: THREE.Scene, finished: CallbackFinished): void {
    const service = blob.service;
    const fail = (error: unknown) =>
      service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service);
    blob.arrayBuffer().then(data => {
      // Give the spinner a frame to appear: the import runs in the page.
      setTimeout(() => {
        // Large files are tessellated in workers, several at once; small ones are quicker here
        // than the workers take to start.
        const workers = data.byteLength >= 2_000_000 && typeof Worker !== 'undefined'
          ? { create: () => new Worker(new URL('./step.worker', import.meta.url), { type: 'module' }) }
          : undefined;
        loadStepAsync(data, { workers }).then(result => {
          for (const warning of result.warnings) { console.warn(`STEP import (${result.schema.protocol}): ${warning}`); }
          result.group.name = file.relativePath;
          scene.add(result.group);
          finished();
        }, fail);
      }, 0);
    }, fail);
  }

  /**
   * Reads a .blend file with mc-blender-import. Images it doesn't pack are taken from the other
   * dropped files, by file name.
   */
  public addBlendFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                      scene: THREE.Scene, finished: CallbackFinished): void {
    const service = blob.service;
    const fail = (error: unknown) =>
      service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service);
    const zip = file.relativePath.toLocaleLowerCase().endsWith('.zip');
    // Images beside the file; a zip holds them itself. Other .blend files are models of their own.
    const images = zip ? [] : files.filter(f => f.fileEntry.isFile && f !== file &&
      !/\.(blend\d*|zip)$/i.test(f.relativePath));
    Promise.all(images.map(f => new Promise<{ name: string; data: Blob }>(resolve =>
      (f.fileEntry as FileSystemFileEntry).file(data => resolve({ name: f.relativePath, data })))))
      .then(others => loadBlend([{ name: file.relativePath, data: blob }, ...others], zip ? {} : { main: file.relativePath }))
      .then(result => {
        for (const warning of result.warnings) { console.warn(`Blender import (${result.version}): ${warning}`); }
        if (result.missing.length) { console.warn(`Blender import: images not found: ${result.missing.join(', ')}`); }
        if (result.stats.meshes === 0) { throw new Error('It has no meshes that SceneEditor can show.'); }
        result.group.name = file.relativePath;
        scene.add(result.group);
        finished();
      })
      .catch(fail);
  }

  /** Reads a DXF drawing, ASCII or binary, with mc-dxf-import. */
  public addDxfFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                    scene: THREE.Scene, finished: CallbackFinished): void {
    const service = blob.service;
    const fail = (error: unknown) =>
      service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service);
    blob.arrayBuffer().then(data => {
      // Give the spinner a frame to appear: the import runs in the page.
      setTimeout(() => {
        try {
          const result = loadDxf(data);
          for (const warning of result.warnings) { console.warn(`DXF import (${result.version || 'no version'}): ${warning}`); }
          const s = result.stats;
          if (s.segments + s.triangles + s.points === 0) { throw new Error('It has nothing that SceneEditor can draw.'); }
          result.group.name = file.relativePath;
          scene.add(result.group);
          finished();
        } catch (error) {
          fail(error);
        }
      }, 0);
    }, fail);
  }

  /**
   * Reads a file with the mc-*-import package for its format: OBJ, FBX, 3DS, USD, 3MF, PLY, SVG,
   * USDZ, Rhino 3DM, CityJSON or IGES. OBJ, FBX, 3DS and USD models take their material
   * libraries, layers and textures from the other dropped files, or from their zip.
   */
  public addImportedFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                         scene: THREE.Scene, finished: CallbackFinished, format?: string): void {
    const service = blob.service;
    const fail = (error: unknown) =>
      service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service);
    const zip = file.relativePath.toLocaleLowerCase().endsWith('.zip');
    const importer = importers[format ?? importerExtensions[service.fileExtension(file)]];
    const resources = zip || !importer.resources ? [] : files.filter(f => f.fileEntry.isFile && f !== file &&
      importer.resources.test(f.relativePath));
    Promise.all(resources.map(f => new Promise<NamedBlob>(resolve =>
      (f.fileEntry as FileSystemFileEntry).file(data => resolve({ name: f.relativePath, data })))))
      // Give the spinner a frame to appear: some imports run in the page.
      .then(others => new Promise<NamedBlob[]>(resolve => setTimeout(() => resolve(others), 0)))
      .then(others => importer.load({ name: file.relativePath, data: blob }, others, zip))
      .then(result => {
        for (const warning of result.warnings) { console.warn(`${importer.label} import: ${warning}`); }
        if (result.missing?.length) { console.warn(`${importer.label} import: not found: ${result.missing.join(', ')}`); }
        let drawn = false;
        result.group.traverse(o => { drawn ||= (o as THREE.Mesh).isMesh || (o as THREE.Line).isLine || (o as THREE.Points).isPoints; });
        if (!drawn) { throw new Error('It has nothing that SceneEditor can draw.'); }
        result.group.name = file.relativePath;
        scene.add(result.group);
        finished();
      })
      .catch(fail);
  }

  /**
   * Reads a Radiance .hdr or OpenEXR .exr environment map with mc-hdr-import or mc-exr-import,
   * and lights the scene with it, showing it behind the scene.
   */
  public addEnvironmentFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                            scene: THREE.Scene, finished: CallbackFinished): void {
    const service = blob.service;
    const exr = service.fileExtension(file) === 'exr';
    const input = { name: file.relativePath, data: blob };
    (exr ? loadExr(input) : loadHdr(input))
      .then(result => {
        for (const warning of result.warnings) { console.warn(`${exr ? 'EXR' : 'HDR'} import: ${warning}`); }
        const previous = scene.environment;
        applyEnvironment(scene, result.texture);
        if (previous && previous !== result.texture) { previous.dispose(); }
        finished();
      })
      .catch(error => service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service));
  }

  /**
   * Opens a zip with the importer for what it holds: a .blend file, an OBJ, FBX, 3DS, USD, VRML
   * or X3D model, or else Ogre resources.
   */
  public addZipFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                    scene: THREE.Scene, finished: CallbackFinished): void {
    const service = blob.service;
    blob.arrayBuffer().then(data => {
      let names: string[] = [];
      try {
        names = readZip(new Uint8Array(data)).map(entry => entry.name);
      } catch (error) {
        service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service);
        return;
      }
      const has = (pattern: RegExp) => names.some(name => pattern.test(name));
      if (has(/\.blend$/i)) {
        service.addBlendFile(blob, file, files, scene, finished);
        return;
      }
      const format = has(/\.(scene|mesh)$/i) ? undefined : has(/\.usd[ac]?$/i) ? 'usd' :
        has(/\.x3dv?$/i) ? 'x3d' : has(/\.wrl$/i) ? 'vrml' :
        ['obj', 'fbx', '3ds'].find(extension => has(new RegExp(`\\.${extension}$`, 'i')));
      if (format) {
        service.addImportedFile(blob, file, files, scene, finished, format);
        return;
      }
      service.addOgreFile(blob, file, files, scene, finished);
    }, error => service.onFileLoadError({ message: String(error) }, service));
  }

  /**
   * Reads an Ogre .scene, .mesh or .mesh.xml file, or a zip of Ogre resources, with
   * mc-ogre-import. The other dropped files are its resources: meshes, material scripts and
   * textures, which Ogre finds by file name wherever they are.
   */
  public addOgreFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                     scene: THREE.Scene, finished: CallbackFinished): void {
    const service = blob.service;
    const fail = (error: unknown) =>
      service.onFileLoadError({ message: error instanceof Error ? error.message : String(error) }, service);
    const zip = file.relativePath.toLocaleLowerCase().endsWith('.zip');
    // A zip holds everything itself; a scene or mesh takes its resources from beside it.
    const resources = zip ? [] : files.filter(f => f.fileEntry.isFile && f !== file &&
      !f.relativePath.toLocaleLowerCase().endsWith('.zip'));
    Promise.all(resources.map(f => new Promise<{ name: string; data: Blob }>(resolve =>
      (f.fileEntry as FileSystemFileEntry).file(data => resolve({ name: f.relativePath, data })))))
      .then(others => loadOgre([{ name: file.relativePath, data: blob }, ...others], zip ? {} : { main: file.relativePath }))
      .then(result => {
        for (const warning of result.warnings) { console.warn(`Ogre import: ${warning}`); }
        if (result.missing.length) { console.warn(`Ogre import: not found: ${result.missing.join(', ')}`); }
        if (result.stats.entities === 0) {
          throw new Error(result.missing.length
            ? `The meshes it uses were not found: ${result.missing.filter(m => /\.mesh(\.xml)?$/i.test(m)).join(', ')}`
            : 'It has no meshes.');
        }
        result.group.name = file.relativePath;
        scene.add(result.group);
        finished();
      })
      .catch(fail);
  }

  private onFileLoadError(event : { message: string }, service : ThreeSceneService) : void {
      service.spinner.hide();
      service.errorDialog.open(ErrorDialogComponent, {
        width: '350px',
        data: {
          title: 'Failure',
          label: 'File cannot be loaded: ',
          message: event.message,
          close: true
        }
      });
  }

  public addPolygonsFile(blob: ViewerFile, file: NgxFileDropEntry, files: NgxFileDropEntry[],
                         scene: THREE.Scene, finished: CallbackFinished): void {
    const fileReader = new FileReader();

    const onload = () => {
      try {
        const polygons = JSON.parse(fileReader.result as string) as Polygon3[];
        const addToScene = (p: Polygon3) => {
          const tra = p.Transform;
          const p2 = p.Project(tra);

          const contour = new Array<THREE.Vector2>();

          for (const pt of p2.Vertices) {
            contour.push(new THREE.Vector2(pt.X, pt.Y));
          }
          contour.push(contour[0]);

          const shape = new THREE.Shape(contour);

          if (p2.Holes) {
            for (const h of p2.Holes) {
              const hole = new Array<THREE.Vector2>();
              for (const pt of h.Vertices) {
                hole.push(new THREE.Vector2(pt.X, pt.Y));
              }
              hole.push(hole[0]);
              shape.holes.push(new THREE.Path(hole));
            }
          }

          const geometry = new THREE.ShapeGeometry(shape);

          const o = tra.Origin;
          const x = tra.XVec;
          const y = tra.YVec;
          const z = tra.ZVec;

          const transform = new THREE.Matrix4();
          transform.makeBasis(new THREE.Vector3(x.X, x.Y, x.Z),
          new THREE.Vector3(y.X, y.Y, y.Z), new THREE.Vector3(z.X, z.Y, z.Z))
            .premultiply(new THREE.Matrix4().makeTranslation(o.X, o.Y, o.Z));
          geometry.applyMatrix4(transform);

          const mesh = new THREE.Mesh(geometry, blob.service.material);
          scene.add(mesh);
        };
        for (const p of polygons) {
          addToScene(new Polygon3().copy(p as Polygon3));
        }
        finished();
      } catch (e) {
        blob.service.onFileLoadError({ message: String(e) }, blob.service);
      }
    };
    onload.bind(this);

    fileReader.onload = onload;

    fileReader.onerror = () => {
      blob.service.onFileLoadError({ message: String(fileReader.error) }, blob.service);
    };

    fileReader.readAsText(blob, 'UTF-8');
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

  public getHoverControl(objects: THREE.Object3D[]): HoverControl {
    return new HoverControl(objects, this.camera, this.renderer.domElement);
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
    if (this.transformControl) {
      this.transformControl.detach();
    }
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
    this.renderView();
  }

  /** Draws the view with WebGL, and ray traces it in the main view or a separate window when that is on. */
  public renderView(): void {
    if (!this.renderer) { return; }
    if (this.raytrace.mode === 'view') {
      // The WebGL canvas stays, cleared, under the ray traced canvas: its CSS background shows
      // through, and it still takes the mouse for the orbit and selection controls.
      this.renderer.clear();
    } else {
      this.renderer.render(this.getScene(), this.camera);
    }
    // Ray traces in the main view or the separate window; does nothing when ray tracing is off.
    this.raytrace.render(this.getScene(), this.camera);
  }

  public removeObjectFromScene(object: THREE.Object3D, scene: THREE.Scene = null): void {
    if (object == null) { return; }

    if (scene == null) { scene = this.scene; }
    if (scene == null) { return; }

    const index = scene.children.indexOf(object);
    if (index > -1) {
      scene.children.splice(index, 1);
    }
  }

  public resetLights(scene: THREE.Scene = null): void {
    if (scene == null) { scene = this.scene; }
    if (scene == null) { return; }
    this.removeLights(scene);
    this.addCurrentLights(scene);
  }

  private removeLights(scene: THREE.Scene): void {
    if (scene == null) { return; }

    const lights = new Array<THREE.Object3D>();

    for (const child of scene.children) {
      if (!(child instanceof THREE.Light)) { continue; }
      lights.push(child);
    }

    for (const obj of lights) {
      this.removeObjectFromScene(obj, scene);
    }
  }

  public getSceneBox(): THREE.Box3 {
    // Bring world matrices up to date first: a model just added under a scaled or moved group
    // hasn't been rendered yet, so its meshes' world matrices would still be stale.
    this.scene?.updateMatrixWorld(true);

    let box = this.sceneBox(this.scene, true);
    if (!box) {
      box = new THREE.Box3(new THREE.Vector3(-2000, -2000, -2000),
        new THREE.Vector3(2000, 2000, 2000));
    }
    return box;
  }

  private sceneBox(scene: THREE.Object3D, start: boolean): THREE.Box3 {
    if (!scene) { return; }

    let box: THREE.Box3;
    // three.js type flags rather than instanceof, so objects made by another copy of three.js count.
    const kind = (o: THREE.Object3D) => o as THREE.Object3D & { isLight?: boolean; isMesh?: boolean; isLine?: boolean; isPoints?: boolean; isScene?: boolean; isGroup?: boolean };
    for (const object of scene.children) {
      if (kind(object).isLight) {
        continue;
      } else if (kind(object).isMesh || kind(object).isLine || kind(object).isPoints) {
        // Meshes, lines such as toolpaths, and point clouds all have extent.
        if (box) {
          box = box.union(new THREE.Box3().setFromObject(object));
        } else {
          box = new THREE.Box3().setFromObject(object);
        }
      } else if ((!start && object.children.length > 0) ||
        kind(object).isScene || kind(object).isGroup) {
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

  /** Fits the view to the scene if a fit was asked for before the view had a size. Returns true if it fitted. */
  public refitIfPending(): boolean {
    if (!this.fitPending) { return false; }
    this.rescaleScene();
    return !this.fitPending;
  }

  public rescaleScene(camera: THREE.OrthographicCamera = null,
                      box: THREE.Box3 = null, orbitControls: OrbitControls = null): void {
    if (!box && this.scene) { box = this.getSceneBox(); }
    if (!box) { return; }
    if (!camera) { camera = this.camera; }
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    const center = sphere.center;
    const radius = sphere.radius;
    const pos = center.clone().sub(direction.multiplyScalar(1.5 * radius));
    camera.position.set(pos.x, pos.y, pos.z);
    const width = camera.right - camera.left;
    const height = camera.top - camera.bottom;
    const f = 1.5;
    camera.far = 2 * f * radius;
    camera.near = 0.1 * radius;
    // camera.top = f * aspect * radius;
    // camera.bottom = -f * aspect * radius;
    // camera.left = -f * radius;
    // camera.right = f * radius;
    // Until the page is laid out, the view can have no size, which would give a zoom of 0 and
    // hide the model for good. Fit it again once setCameraSize gives the view its size.
    const sized = width > 0 && height > 0;
    if (camera === this.camera) { this.fitPending = !sized; }
    if (sized) { camera.zoom = 0.5 * height / radius; }

    camera.updateProjectionMatrix();
    if (!orbitControls) { orbitControls = this.orbitControls; }
    orbitControls.target.set(center.x, center.y, center.z);
    orbitControls.update();
  }

  public getSceneMaterials(): Materials {
    const ret: Materials = new Materials();
    ret.name = 'Scene materials';

    if (!this.scene) { return ret; }
    const mapMaterials = new Map<THREE.Material, Material>();
    this.childrenMaterials(this.scene.children, true, mapMaterials);
    for (const mat of mapMaterials.values()) {
      ret.materials.push(mat);
    }

    return ret;
  }

  private childrenMaterials(children: THREE.Object3D[], start: boolean,
                            mapMaterials: Map<THREE.Material, Material>): void {
    for (const child of children) {
      if (child instanceof THREE.Mesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          for (const mat of mesh.material as THREE.Material[]) {
            if (mapMaterials.has(mat)) { continue; }
            const meshMat = Material.CreateMaterial(mat);
            if (meshMat) { mapMaterials.set(mat, meshMat); }
          }
        } else {
          if (mapMaterials.has(mesh.material)) { continue; }
          const meshMat = Material.CreateMaterial(mesh.material);
          if (meshMat) { mapMaterials.set(mesh.material, meshMat); }
        }
      }
      if ((!start && child.children.length > 0) ||
        (child instanceof THREE.Scene) || (child instanceof THREE.Group)) {
        this.childrenMaterials(child.children, false, mapMaterials);
      }
    }
  }

  public getSelectableObjects(): THREE.Object3D[] {
    const ret: THREE.Object3D[] = new Array<THREE.Object3D>();

    if (!this.scene) { return ret; }
    this.childrenSelectableObjects(this.scene.children, true, ret);

    return ret;
  }

  private childrenSelectableObjects(children: THREE.Object3D[], start: boolean,
                                    objects: THREE.Object3D[]): void {
    for (const child of children) {
      if (child instanceof THREE.Mesh) {
        objects.push(child);
      }
      if ((!start && child.children.length > 0) ||
        (child instanceof THREE.Scene) || (child instanceof THREE.Group)) {
        this.childrenSelectableObjects(child.children, false, objects);
      }
    }
  }
}
