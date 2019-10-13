import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { ThreeSceneService } from '../three-scene.service';
import { Material } from '../material';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-scene-view',
  templateUrl: './scene-view.component.html',
  styleUrls: ['./scene-view.component.scss']
})
export class SceneViewComponent implements OnInit, AfterViewInit {
  @ViewChild('container', { static: true })
  container: ElementRef;
  sceneJSON: string;

  private scene: THREE.Scene;
  private camera: THREE.OrthographicCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private mesh: THREE.Mesh;
  private materials: THREE.Material[] = [];
  private currentMaterial: THREE.Material;
  private ambientLight: THREE.AmbientLight;
  private materialColour: THREE.Color;

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.ambientLight = new THREE.AmbientLight(0xb2afaf);
  }

  ngAfterViewInit() {
    this.InitialiseCamera();
    this.InitialiseScene();

    this.Animate();
  }

  SetMaterial(material: Material) {
    console.log(JSON.stringify(material));
    if (this.currentMaterial.type === 'MeshStandardMaterial') {
      const mat = this.currentMaterial as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(material.diffuse);
      mat.emissive = new THREE.Color(material.emissive);
    }
    /*
    this.materials[0].color = new THREE.Color(material.diffuse);
    this.materials[0].emissive = new THREE.Color(material.emissive);
    this.materials[0].specular = new THREE.Color(material.specular);
    this.materials[0].shininess = material.shininess;
    */
    this.Render();
  }

  private onResized(event: ResizedEvent): void {
  //  console.log(`OnResize. New width: ${event.newWidth}, new height: ${event.newHeight}`);
    this.renderer.setSize(event.newWidth, event.newHeight);
    this.setCameraSize(event.newWidth, event.newHeight);
    this.Render();
  }

  private onMouseOver(event: MouseEvent): void {
    // console.log(`Mouse event`);
    this.Render();
  }

  private onOrbitControlEnd(): void {
    this.Render();
  }

  private InitialiseScene(): void {
    this.LoadScene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor(0xbbeeff, 1);
    this.container.nativeElement.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    // OrbitControl prevents wheel event bubbling. This settings is to redraw after zoom.
    this.controls.addEventListener('end', this.onOrbitControlEnd.bind(this));
    this.controls.screenSpacePanning = true;
  }

  private InitialiseCamera(): void {
    this.camera = new THREE.OrthographicCamera( -this.container.nativeElement.offsetWidth * 5,
      this.container.nativeElement.offsetWidth * 5,
      this.container.nativeElement.offsetHeight * 5,
      -this.container.nativeElement.offsetHeight * 5, 1, 100000 );
    this.camera.position.y = -10000;
    this.camera.position.z = 1;
  }

  private Animate(): void {
    // console.log('Animate called.');
    // requestAnimationFrame(this.Animate.bind(this));
    this.Render();
  }

  private Render(): void {
    if (this.currentMaterial === undefined && this.materials.length > 0) {
      this.currentMaterial = this.materials[0];
    }
    this.renderer.render(this.scene, this.camera);
  }

  private setCameraSize(width: number, height: number): void {
    const aspect = width / height;
    const w = this.camera.right - this.camera.left;
    const h = this.camera.top - this.camera.bottom;
    this.camera.left = -width * 5;
    this.camera.right = width * 5;
    this.camera.bottom = -height * 5;
    this.camera.top = height * 5;
    this.camera.updateProjectionMatrix();
   }

  private LoadGeometry(geometry: THREE.BufferGeometry) {
    this.mesh = new THREE.Mesh(geometry, this.currentMaterial);
    this.scene.add(this.mesh);
    this.Render();
  }

  private LoadScene(): void {
    this.AddScene();
  }

  private AddScene() {
    this.scene = new THREE.Scene();
    this.LoadGLTFScene();
  }

  private LoadGLTFScene(): void {
    const loader = new GLTFLoader();
    loader.load(
      // resource URL
      './assets/scenes/scene.gltf',
      // called when the resource is loaded
      gltf => {
        this.scene.add( gltf.scene );
        this.materials = this.ExtractMaterials(this.scene);
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

    for (const sc of this.scene.children) {
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
}
