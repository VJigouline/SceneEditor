import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LightType } from '../lights/light-type.enum';

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
  public lights: [THREE.Light] = [new THREE.AmbientLight()];
  public light: THREE.Light;

  constructor() { }

  ngOnInit() {
    this.light = this.lights[0];
    this.light.name = 'Ambient 1';
  }

  public onNewLight(type: LightType): void {

    switch (type) {
      case LightType.AMBIENT:
        this.light = new THREE.AmbientLight(0xffffff);
        this.light.name = `Ambient ${this.lights.length + 1}`;
        break;
      case LightType.DIRECTIONAL:
        this.light = new THREE.DirectionalLight(0xffffff, 0.5);
        this.light.name = `Directional ${this.lights.length + 1}`;
        break;
      case LightType.HEMISPHERE:
        this.light = new THREE.HemisphereLight(0xbbbbff, 0x080820, 1);
        this.light.name = `Hemisphere ${this.lights.length + 1}`;
        break;
      case LightType.POINT:
        this.light = new THREE.PointLight(0xffffff, 1, 0, 2);
        this.light.name = `Point ${this.lights.length + 1}`;
        break;
      case LightType.RECT_AREA:
        this.light = new THREE.RectAreaLight();
        this.light.name = `Rectangular ${this.lights.length + 1}`;
        break;
      case LightType.SPOT:
        this.light = new THREE.SpotLight();
        this.light.name = `Spotlight ${this.lights.length + 1}`;
        break;
      default:
        console.error('Invalid light type.');
        break;
    }

    this.lights.push(this.light);
    this.newLight.emit(this.light);
  }
}
