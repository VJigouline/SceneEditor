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
  private hemiLight: THREE.HemisphereLight;
  private floorMat: THREE.MeshStandardMaterial;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private mesh: THREE.Mesh;
  private material: THREE.MeshPhongMaterial;
  private ambientLight: THREE.AmbientLight;

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.material = new THREE.MeshPhongMaterial( {
      color: 0xc5cdd1
    });
    this.ambientLight = new THREE.AmbientLight(0xb2afaf);
  }

  ngAfterViewInit() {
    this.InitialiseCamera();
    this.InitialiseScene();

    this.Animate();
  }

  SetMaterial(material: Material) {
    console.log(JSON.stringify(material));
    this.material.color = new THREE.Color(material.diffuse);
    this.material.emissive = new THREE.Color(material.emissive);
    this.material.specular = new THREE.Color(material.specular);
    this.material.shininess = material.shininess;
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
    const loader = new GLTFLoader();
    this.scene = new THREE.Scene();
    loader.load(
      // resource URL
      './assets/scenes/scene.gltf',
      // called when the resource is loaded
      gltf => {
        this.scene.add( gltf.scene );
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
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);
    this.Render();
  }

}
