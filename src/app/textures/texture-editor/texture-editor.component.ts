import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ThreeSceneService } from '../../three-scene.service';
import { Material } from '../../materials/material';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-texture-editor',
  templateUrl: './texture-editor.component.html',
  styleUrls: ['./texture-editor.component.scss']
})
export class TextureEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('matContainer', { static: true })
  container: ElementRef;

  // View area size.
  @Input() AreaWidth = 200;
  @Input() AreaHeight = 150;
  @Input() Material: Material;

  private camera: THREE.OrthographicCamera;
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private orbitControls: OrbitControls;
  private objectDefault: THREE.Object3D;
  private object: THREE.Object3D;

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngAfterViewInit(): void {
    this.InitialiseCamera();
    this.InitialiseScene();

    this.Render();
  }

  ngOnInit(): void {
  }

  private InitialiseCamera(): void {
    this.camera = new THREE.OrthographicCamera( -this.AreaWidth * 5,
      this.AreaWidth * 5,
      this.AreaHeight * 5,
      -this.AreaHeight * 5, 1, 100000 );
    this.camera.position.z = 10000;
  }

  private InitialiseScene(): void {
    this.scene = new THREE.Scene();
    this.sceneService.addCurrentLights(this.scene);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.physicallyCorrectLights = true;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;
    this.renderer.shadowMap.enabled = true;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setClearColor(0, 1);
    this.renderer.setSize(this.AreaWidth, this.AreaHeight);
    this.container.nativeElement.appendChild( this.renderer.domElement );

    this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
    // OrbitControl prevents wheel event bubbling. This settings is to redraw after zoom.
    this.orbitControls.addEventListener('end', this.onOrbitControlChange.bind(this));
    this.orbitControls.addEventListener('change', this.onOrbitControlChange.bind(this));
    this.orbitControls.screenSpacePanning = true;

    const geometry = new THREE.BoxBufferGeometry( 200, 200, 200 );

    this.objectDefault = new THREE.Mesh( geometry, this.Material.material );
    this.scene.add( this.objectDefault );
    const box = new THREE.Box3().setFromObject(this.objectDefault);
    this.sceneService.rescaleScene(this.camera, box);
}

  public Render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  private onOrbitControlChange(): void {
    this.Render();
  }

  onResized(event: ResizedEvent): void {
    console.log(`OnResize. New width: ${event.newWidth}, new height: ${event.newHeight}`);
    this.AreaWidth = event.newWidth;
    // this.sceneService.renderer.setSize(this.AreaWidth, this.AreaHeight - 4);
    // this.setCameraSize(this.AreaWidth, this.AreaHeight);
    // this.Render();
  }

}
