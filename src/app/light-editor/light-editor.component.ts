import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LightType } from '../lights/light-type.enum';
import { MatSliderChange } from '@angular/material/slider';
import { ThreeSceneService } from '../three-scene.service';
import { Light } from '../lights/light';
import { DirectionalLightHelper } from '../objects3d/directional-light-helper';

import * as THREE from 'three';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-light-editor',
  templateUrl: './light-editor.component.html',
  styleUrls: ['./light-editor.component.scss']
})
export class LightEditorComponent implements OnInit {

  // events
  @Output() newLight = new EventEmitter<Light>();
  @Output() changedLight = new EventEmitter<Light>();

  // properties
  lightType: typeof LightType = LightType;
  private light: Light;
  private directionalLightHelper: DirectionalLightHelper;

  public get Light(): Light {
    if (this.light == null) {
      this.Lights = this.getLights();
      this.light = this.Lights[0];
    }

    return this.light;
  }
  public set Light(value: Light) { this.light = value; }
  public maxIntensity = 20;

  public Lights: Light[] = [];

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.Lights = this.getLights();
    this.light = this.Lights[0];
  }

  public onNewLight(type: LightType): void {

    this.light = new Light(type);

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    scene.add(this.Light.light);
    this.Lights.push(this.light);
    switch (type) {
      case LightType.AMBIENT:
        this.light.name = 'Ambient ' + this.Lights.length;
        break;
      case LightType.DIRECTIONAL:
        this.light.name = 'Directional ' + this.Lights.length;
        scene.add((this.light.light as THREE.DirectionalLight).target);
        break;
      case LightType.HEMISPHERE:
        this.light.name = 'Hemishpere ' + this.Lights.length;
        break;
      case LightType.POINT:
        this.light.name = 'Point ' + this.Lights.length;
        break;
      case LightType.RECT_AREA:
        this.light.name = 'Rect. area ' + this.Lights.length;
        break;
      case LightType.SPOT:
        this.light.name = 'Spotlight ' + this.Lights.length;
        break;
    }
    this.newLight.emit(this.light);
    this.changedLight.emit(this.light);
   }

  public onIntensityChanged(event: MatSliderChange): void {
    this.changedLight.emit(this.light);
  }

  public onLightChanged(light: Light): void {
    this.updateHelpers();
    this.changedLight.emit(light);
  }

  private getLights(): Light[] {
    return this.sceneService.getLights();
  }

  public onSelectionChange(change: MatSelectChange): void {
    const light = change.value as Light;

    this.unsetLightHelper();

    switch (light.type) {
      case LightType.DIRECTIONAL:
        this.addDirectionalLightHelper(light);
        break;
    }

    this.changedLight.emit(light);
  }

  private unsetLightHelper(): void {
    this.removeObjectFromScene(this.directionalLightHelper);
    this.directionalLightHelper = null;
  }

  private removeObjectFromScene(object: THREE.Object3D): void {
    if (object == null) { return; }

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    const index = scene.children.indexOf(object);
    if (index > -1) {
      scene.children.splice(index, 1);
    }
  }

  private addDirectionalLightHelper(light: Light): void {
    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    const l = light.light as THREE.DirectionalLight;

    this.directionalLightHelper = new DirectionalLightHelper(l);
    scene.add(this.directionalLightHelper);
  }

  private updateHelpers(): void {
    const scene = this.sceneService.getScene();

    if (this.directionalLightHelper != null && this.light.type === LightType.DIRECTIONAL) {
      this.directionalLightHelper.update(this.light.light as THREE.DirectionalLight);
    }
  }
}
