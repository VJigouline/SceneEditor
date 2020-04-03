import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LightType } from '../lights/light-type.enum';
import { MatSliderChange } from '@angular/material/slider';
import { ThreeSceneService } from '../three-scene.service';
import { Light } from '../lights/light';

import * as THREE from 'three';

@Component({
  selector: 'app-light-editor',
  templateUrl: './light-editor.component.html',
  styleUrls: ['./light-editor.component.scss']
})
export class LightEditorComponent implements OnInit {

  // events
  @Output() newLight = new EventEmitter<THREE.Light>();

  // properties
  private light: THREE.Light;

  public get Light(): THREE.Light {
    if (this.light == null) {
      this.Lights = this.getLights();
      this.light = this.Lights[0].light;
    }

    return this.light;
  }
  public set Light(value: THREE.Light) { this.light = value; }

  public Lights: Light[] = [];

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.Lights = this.getLights();
    this.light = this.Lights[0].light;
  }

  public onNewLight(type: LightType): void {

    switch (type) {
      case LightType.AMBIENT:
        this.light = new THREE.AmbientLight(0xffffff);
        this.light.name = `Ambient ${this.Lights.length + 1}`;
        break;
      case LightType.DIRECTIONAL:
        this.light = new THREE.DirectionalLight(0xffffff, 0.5);
        this.light.name = `Directional ${this.Lights.length + 1}`;
        break;
      case LightType.HEMISPHERE:
        this.light = new THREE.HemisphereLight(0xbbbbff, 0x080820, 1);
        this.light.name = `Hemisphere ${this.Lights.length + 1}`;
        break;
      case LightType.POINT:
        this.light = new THREE.PointLight(0xffffff, 1, 0, 2);
        this.light.name = `Point ${this.Lights.length + 1}`;
        break;
      case LightType.RECT_AREA:
        this.light = new THREE.RectAreaLight();
        this.light.name = `Rectangular ${this.Lights.length + 1}`;
        break;
      case LightType.SPOT:
        this.light = new THREE.SpotLight();
        this.light.name = `Spotlight ${this.Lights.length + 1}`;
        break;
      default:
        console.error('Invalid light type.');
        break;
    }

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    scene.add(this.Light);
    this.newLight.emit(this.Light);
  }

  public onIntensityChanged(event: MatSliderChange): void {
  }

  public onAmbientLightChanged(event: THREE.AmbientLight): void {
  }

  private getLights(): Light[] {
    return this.sceneService.getLights();
  }
}
