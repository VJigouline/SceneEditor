import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, Input} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ThreeSceneService } from '../three-scene.service';
import { Material } from '../materials/material';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';

@Component({
  selector: 'app-scene-view',
  templateUrl: './scene-view.component.html',
  styleUrls: ['./scene-view.component.scss']
})
export class SceneViewComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: true })
  container: ElementRef;

  // View area size.
  @Input() AreaWidth: number;
  @Input() AreaHeight: number;

  sceneJSON: string;

  private mesh: THREE.Mesh;
  private materials: THREE.Material[] = [];
  private currentMaterial: THREE.Material;

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.AreaHeight = 100;
    this.AreaWidth = 200;
  }

  ngAfterViewInit() {
    this.InitialiseCamera();
    this.InitialiseScene();
    this.IntialiseControls();

    this.Animate();
  }

  private IntialiseControls(): void {
    const scene = this.sceneService.getScene();

    this.sceneService.transformControl = new TransformControls(this.sceneService.camera, this.sceneService.renderer.domElement);
    const transformControl = this.sceneService.transformControl;
    transformControl.enabled = false;
    transformControl.addEventListener('change', this.Render.bind(this));
    transformControl.addEventListener('dragging-changed', this.sceneService.onTransformDraggingChanged.bind(this.sceneService));
    transformControl.addEventListener('change', this.sceneService.cancelHideTransform.bind(this.sceneService));
    transformControl.addEventListener('mouseDown', this.sceneService.cancelHideTransform.bind(this.sceneService));
    transformControl.addEventListener('mouseUp', this.sceneService.delayHideTransform.bind(this.sceneService));
    scene.add(transformControl);
  }

  SetMaterial(material: Material) {
    // console.log(JSON.stringify(material));
    if (!material) {
      console.error('Material is not specified.');
      return;
    }
    if (!this.currentMaterial) {
      this.currentMaterial = this.sceneService.getMaterial();
    }
    if (!this.currentMaterial) {
      console.error('Current material is not specified.');
      return;
    }
    if (this.currentMaterial.type === 'MeshStandardMaterial') {
      const mat = this.currentMaterial as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(material.colour);
      // mat.emissive = new THREE.Color(material.emissive);
    }
    this.Render();
  }

  public onResized(event: ResizedEvent): void {
    console.log(`OnResize. New width: ${event.newWidth}, new height: ${event.newHeight}`);
    this.AreaWidth = event.newWidth;
    this.sceneService.renderer.setSize(this.AreaWidth, this.AreaHeight - 4);
    this.setCameraSize(this.AreaWidth, this.AreaHeight);
    this.Render();
  }

  public onMouseOver(event: MouseEvent): void {
    // console.log(`Mouse event`);
    // this.Render();
  }

  public onOrbitControlChange(): void {
    this.Render();
  }

  private InitialiseScene(): void {
    // this.LoadScene();

    this.newScene();

    this.sceneService.renderer = new THREE.WebGLRenderer();
    const renderer = this.sceneService.renderer;
    renderer.physicallyCorrectLights = true;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(0xbbeeff, 1);
    renderer.setSize(this.AreaWidth, this.AreaHeight);
    this.container.nativeElement.appendChild( renderer.domElement );

    this.sceneService.orbitControls = new OrbitControls( this.sceneService.camera, renderer.domElement );
    // OrbitControl prevents wheel event bubbling. This settings is to redraw after zoom.
    this.sceneService.orbitControls.addEventListener('end', this.onOrbitControlChange.bind(this));
    this.sceneService.orbitControls.addEventListener('change', this.onOrbitControlChange.bind(this));
    this.sceneService.orbitControls.addEventListener('start', this.sceneService.cancelHideTransform.bind(this.sceneService));
    this.sceneService.orbitControls.addEventListener('end', this.sceneService.delayHideTransform.bind(this.sceneService));
    this.sceneService.orbitControls.screenSpacePanning = true;
  }

  private InitialiseCamera(): void {
    this.sceneService.camera = new THREE.OrthographicCamera( -this.container.nativeElement.offsetWidth * 5,
      this.container.nativeElement.offsetWidth * 5,
      this.container.nativeElement.offsetHeight * 5,
      -this.container.nativeElement.offsetHeight * 5, 1, 100000 );
    this.sceneService.camera.position.y = 10000;
    // this.sceneService.camera.position.z = 1;
  }

  private Animate(): void {
    // console.log('Animate called.');
    // requestAnimationFrame(this.Animate.bind(this));
    this.Render();
  }

  public Render(): void {
    if (this.currentMaterial === undefined && this.materials.length > 0) {
      this.currentMaterial = this.materials[0];
    }
    this.sceneService.renderer.render(this.sceneService.getScene(), this.sceneService.camera);
  }

  public setCameraSize(width: number, height: number): void {
    const camera = this.sceneService.camera;
    camera.left = -width;
    camera.right = width;
    camera.bottom = -height;
    camera.top = height;
    camera.updateProjectionMatrix();
   }

  private LoadGeometry(geometry: THREE.BufferGeometry) {
    this.mesh = new THREE.Mesh(geometry, this.currentMaterial);
    this.sceneService.getScene().add(this.mesh);
    this.Render();
  }

  private LoadScene(): void {
    this.sceneService.getNewScene();
    this.AddScene();
  }

  private AddScene() {
    this.LoadGLTFScene();
  }

  private LoadGLTFScene(): void {
    const loader = new GLTFLoader();
    loader.load(
      // resource URL
      './assets/scenes/scene.gltf',
      // called when the resource is loaded
      gltf => {
        const scene = this.sceneService.getScene();
        scene.add( gltf.scene );
        this.materials = this.ExtractMaterials(scene);
        this.Render();
      },
      // called while loading is progressing
      xhr => {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
      },
      // called when loading has errors
      error => {
        console.log( 'An error happened' );
      }
    );
  }

  private ExtractMaterials(scene: THREE.Scene): THREE.Material[] {
    const ret: THREE.Material[] = [];

    for (const sc of scene.children) {
      for (const child of sc.children) {
        if (child.type === 'Mesh') {
          const mesh = child as THREE.Mesh;
          if (Array.isArray(mesh.material)) {
            for (const mat of mesh.material) {
              ret.push(mat);
            }
          } else {
            ret.push(mesh.material as THREE.Material);
          }
        }
      }
    }
    return ret;
  }

  public newScene(): void {
    this.sceneService.getNewScene();
  }

  public UpdateScene(): void {
    this.sceneService.rescaleScene();

    this.Render();
  }
}
