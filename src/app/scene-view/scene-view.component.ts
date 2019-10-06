import { Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { ThreeSceneService } from '../three-scene.service';

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
  private material: THREE.MeshStandardMaterial;
  private ambientLight: THREE.AmbientLight;

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.material = new THREE.MeshStandardMaterial( {
      roughness: 0.8,
      color: 0xc5cdd1,
      metalness: 0.5
    });
    this.ambientLight = new THREE.AmbientLight(0xb2afaf);
  }

  ngAfterViewInit() {
    this.InitialiseCamera();
    this.InitialiseScene();

    this.Animate();
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
    this.scene = this.sceneService.getScene();

    this.scene.add(this.ambientLight);

    this.hemiLight = new THREE.HemisphereLight( 0xddeeff, 0x0f0e0d);
    this.scene.add( this.hemiLight );

    let light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 1, 0, 1 ).normalize();
    this.scene.add( light );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( -1, 0, 1 ).normalize();
    this.scene.add( light );

    light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( -1, -1, 0 ).normalize();
    this.scene.add( light );

    this.floorMat = new THREE.MeshStandardMaterial( {
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.2,
      bumpScale: 0.5
    });
    const textureLoader = new THREE.TextureLoader();
    let texture = textureLoader.load( 'assets/textures/hardwood2_diffuse.jpg', map => {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set( 4, 9.6 );
    } );
    this.floorMat.map = texture;
    this.floorMat.needsUpdate = true;
    texture = textureLoader.load( 'assets/textures/hardwood2_bump.jpg', map => {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set( 4, 9.6 );
    } );
    this.floorMat.bumpMap = texture;
    this.floorMat.needsUpdate = true;
    texture = textureLoader.load( 'assets/textures/hardwood2_roughness.jpg', map => {
      map.wrapS = THREE.RepeatWrapping;
      map.wrapT = THREE.RepeatWrapping;
      map.anisotropy = 4;
      map.repeat.set( 4, 9.6 );
    } );
    this.floorMat.roughnessMap = texture;
    this.floorMat.needsUpdate = true;

    const floorGeometry = new THREE.PlaneBufferGeometry( 11000, 10000 );
    const floorMesh = new THREE.Mesh( floorGeometry, this.floorMat );
    floorMesh.receiveShadow = true;
    floorMesh.position.set(0, 0, -500);
    this.scene.add( floorMesh );

    this.LoadRobot();

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

    // window.addEventListener( 'resize', onWindowResize, false );

    this.camera.lookAt(this.scene.position);

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

   private LoadRobot(): void {
    const loader = new STLLoader();

    loader.load('../assets/robots/kuka300/Base.stl', geometry => this.LoadGeometry(geometry));
  }

  private LoadGeometry(geometry: THREE.BufferGeometry) {
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);
    this.Render();
  }

}
