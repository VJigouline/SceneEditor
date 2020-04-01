import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LightType } from '../lights/light-type.enum';

import * as THREE from 'three';
import { DirectionalLight, HemisphereLight } from 'three';

@Component({
  selector: 'app-light-editor',
  templateUrl: './light-editor.component.html',
  styleUrls: ['./light-editor.component.scss']
})
export class LightEditorComponent implements OnInit {

  // events
  @Output() newLight = new EventEmitter<THREE.Light>();

  // properties
  public lights: [THREE.Light];

  constructor() { }

  ngOnInit() {
  }

  public onNewLight(type: LightType): void {

    let light: THREE.Light = new THREE.AmbientLight(0xffffff);

    switch (type) {
      case LightType.AMBIENT:
        light = new THREE.AmbientLight(0xffffff);
        break;
      case LightType.DIRECTIONAL:
        light = new DirectionalLight(0xffffff, 0.5);
        break;
      case LightType.HEMISPHERE:
        light = new HemisphereLight(0xbbbbff, 0x080820, 1);
        break;
      case LightType.POINT:
        light = new THREE.PointLight(0xffffff, 1, 0, 2);
        break;
      case LightType.RECT_AREA:
        light = new THREE.RectAreaLight();
        break;
      case LightType.SPOT:
        light = new THREE.SpotLight();
        break;
      default:
        console.error('Invalid light type.');
        break;
    }

    this.lights.push(light);
    this.newLight.emit(light);
  }
}
