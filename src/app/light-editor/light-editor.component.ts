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
  @Output() newLight = new EventEmitter<Light>();
  @Output() changedLight = new EventEmitter<Light>();

  // properties
  lightType: typeof LightType = LightType;
  private light: Light;

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

    this.light = new Light(LightType.AMBIENT);

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    scene.add(this.Light.light);
    switch(this.Light.type) {
      case LightType.DIRECTIONAL:
        scene.add((this.Light.light as THREE.DirectionalLight).target);
    }
    this.newLight.emit(this.light);
    this.changedLight.emit(this.light);
  }

  public onIntensityChanged(event: MatSliderChange): void {
    this.changedLight.emit(this.light);
  }

  public onLightChanged(light: Light): void {
    this.changedLight.emit(light);
  }

  private getLights(): Light[] {
    return this.sceneService.getLights();
  }
}
