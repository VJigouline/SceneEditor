import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { LightType } from '../lights/light-type.enum';
import { MatSliderChange } from '@angular/material/slider';
import { ThreeSceneService } from '../three-scene.service';
import { Light, DirectionalLight, PointLight, SpotLight, HemisphereLight } from '../lights/light';
import { Lights } from '../lights/lights';
import { DirectionalLightHelper } from '../objects3d/directional-light-helper';
import { HemisphereLightHelper } from '../objects3d/hemisphere-light-helper';
import { PointLightHelper } from '../objects3d/point-light-helper';
import { SpotLightHelper } from '../objects3d/spot-light-helper';
import { ConfirmationDialogComponent } from '../user-controls/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LightsLibraryService } from '../lights/lights-library.service';

import * as THREE from 'three';
import { MatSelectChange } from '@angular/material/select';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

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
  private hemisphereLightHelper: HemisphereLightHelper;
  private pointLightHelper: PointLightHelper;
  private spotLightHelper: SpotLightHelper;
  private dragControl: DragControls;
  public lightCopy: Light;

  public get Light(): Light {
    if (!this.light && this.Lights) {
      if (this.Lights.lights.length > 0) { this.light = this.Lights.lights[0]; }
    }

    return this.light;
  }
  @Input() public set Light(value: Light) {
    this.light = value;
    if (value) {
      if (this.light.intensity > this.maxIntensity ||
        this.light.intensity < this.maxIntensity / 100.0) {
          this.maxIntensity = this.light.intensity * 2;
          if (this.maxIntensity < 1) { this.maxIntensity = 1; }
      }
    }
    this.changeSelection(this.light);
  }

  public get Lights(): Lights {
    return this.libraryService.currentLights;
  }

  public maxIntensity = 20;

  @ViewChild('LightEditor')
  private lightEditor: LightEditorComponent;

  constructor(
    private sceneService: ThreeSceneService,
    private confirmationDialog: MatDialog,
    private libraryService: LightsLibraryService
  ) { }

  ngOnInit() {
    this.light = this.Lights.lights[0];
    this.sceneService.transformControl.addEventListener(
      'objectChange', this.onObjectChange.bind(this));
  }

  public onNewLight(type: LightType): void {

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    switch (type) {
      case LightType.AMBIENT:
        this.light = new Light(type);
        this.light.name = 'Ambient ' + this.Lights.lights.length;
        break;
      case LightType.DIRECTIONAL:
        this.light = new DirectionalLight();
        this.light.name = 'Directional ' + this.Lights.lights.length;
        scene.add((this.light.light as THREE.DirectionalLight).target);
        break;
      case LightType.HEMISPHERE:
        this.light = new HemisphereLight();
        this.light.name = 'Hemishpere ' + this.Lights.lights.length;
        break;
      case LightType.POINT:
        this.light = new PointLight();
        this.light.name = 'Point ' + this.Lights.lights.length;
        break;
      case LightType.RECT_AREA:
        this.light = new Light(type);
        this.light.name = 'Rect. area ' + this.Lights.lights.length;
        break;
      case LightType.SPOT:
        this.light = new SpotLight();
        this.light.light.position.z = 1;
        this.light.name = 'Spotlight ' + this.Lights.lights.length;
        scene.add((this.light.light as THREE.SpotLight).target);
        break;
    }
    scene.add(this.light.light);
    this.Lights.lights.push(this.light);
    this.newLight.emit(this.light);
    this.changeSelection(this.light);
   }

  public onIntensityChanged(event: MatSliderChange): void {
    this.light.intensity = event.value;
    this.changedLight.emit(this.light);
  }

  public onLightChanged(light: Light): void {
    this.updateHelpers();
    this.changedLight.emit(light);
  }

  public onSelectionChange(change: MatSelectChange): void {
    this.changeSelection(change.value as Light);
  }

  public updateSelection(): void {
    this.changeSelection(this.Light);
  }

  private changeSelection(light: Light): void {

    this.unsetLightHelper();

    if (light) {
      switch (light.type) {
        case LightType.DIRECTIONAL:
          this.addDirectionalLightHelper(light);
          break;
        case LightType.HEMISPHERE:
          this.addHemisphereLightHelper(light);
          break;
        case LightType.POINT:
          this.addPointLightHelper(light);
          break;
        case LightType.SPOT:
          this.addSpotLightHelper(light);
          break;
      }
    }

    this.changedLight.emit(light);
  }

  public unsetLightHelper(): void {
    if (this.sceneService.transformControl) {
      this.sceneService.transformControl.visible = false;
    }

    this.sceneService.removeObjectFromScene(this.directionalLightHelper);
    delete this.directionalLightHelper;
    this.directionalLightHelper = null;
    this.sceneService.removeObjectFromScene(this.hemisphereLightHelper);
    delete this.hemisphereLightHelper;
    this.hemisphereLightHelper = null;
    this.sceneService.removeObjectFromScene(this.spotLightHelper);
    delete this.spotLightHelper;
    this.spotLightHelper = null;
    this.sceneService.removeObjectFromScene(this.pointLightHelper);
    delete this.pointLightHelper;
    this.pointLightHelper = null;
    if (this.dragControl) {
      this.dragControl.enabled = false;
      this.dragControl.deactivate();
      delete this.dragControl;
      this.dragControl = null;
    }
  }

  private addDirectionalLightHelper(light: Light): void {
    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    const l = light.light as THREE.DirectionalLight;

    this.directionalLightHelper = new DirectionalLightHelper(l,
      1, this.sceneService.camera);
    scene.add(this.directionalLightHelper);
    this.setDragControl([
      this.directionalLightHelper.positionSphere,
      this.directionalLightHelper.targetSphere
    ]);
  }

  private addHemisphereLightHelper(light: Light): void {
    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    const l = light.light as THREE.HemisphereLight;

    this.hemisphereLightHelper = new HemisphereLightHelper(l,
      1, this.sceneService.camera);
    scene.add(this.hemisphereLightHelper);
    this.setDragControl([
      this.hemisphereLightHelper.positionSphere
    ]);
  }

  private addPointLightHelper(light: Light): void {
    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    const l = light.light as THREE.PointLight;

    this.pointLightHelper = new PointLightHelper(l,
      1, this.sceneService.camera);
    scene.add(this.pointLightHelper);
    this.setDragControl([
      this.pointLightHelper.positionSphere
    ]);
  }

  private addSpotLightHelper(light: Light): void {
    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    const l = light.light as THREE.SpotLight;

    this.spotLightHelper = new SpotLightHelper(l,
      1, this.sceneService.camera);
    scene.add(this.spotLightHelper);
    this.setDragControl([
      this.spotLightHelper.positionSphere,
      this.spotLightHelper.targetSphere
    ]);
  }

  private setDragControl(objects: THREE.Object3D[]) {
    this.dragControl = this.sceneService.getDragControl(objects);
    this.dragControl.addEventListener('hoveron',
      this.sceneService.onDragHoveron.bind(this.sceneService));
    this.dragControl.addEventListener('hoveroff',
      this.sceneService.delayHideTransform.bind(this.sceneService));
  }

  private updateHelpers(): void {
    const scene = this.sceneService.getScene();

    if (this.directionalLightHelper != null && this.light.type === LightType.DIRECTIONAL) {
      this.directionalLightHelper.update(this.light.light as THREE.DirectionalLight);
    }

    if (this.hemisphereLightHelper != null && this.light.type === LightType.HEMISPHERE) {
      this.hemisphereLightHelper.update(this.light.light as THREE.HemisphereLight);
    }

    if (this.spotLightHelper != null && this.light.type === LightType.SPOT) {
      this.spotLightHelper.update(this.light.light as THREE.SpotLight);
    }

    if (this.pointLightHelper != null && this.light.type === LightType.POINT) {
      this.pointLightHelper.update(this.light.light as THREE.PointLight);
    }
  }

  private onObjectChange(): void {
    if (!this.sceneService.transformControl.enabled || !this.light) { return; }

    switch (this.light.type) {
      case LightType.DIRECTIONAL:
        this.updateDirectionalLight();
        break;
      case LightType.HEMISPHERE:
        this.updateHemisphereLight();
        break;
      case LightType.POINT:
        this.updatePointLight();
        break;
      case LightType.SPOT:
        this.updateSpotLight();
        break;
    }
  }

  private updateDirectionalLight() {
    const light = this.light.light as THREE.DirectionalLight;
    let pos = this.directionalLightHelper.positionSphere.position;
    light.position.set(pos.x, pos.y, pos.z);
    pos = this.directionalLightHelper.targetSphere.position;
    light.target.position.set(pos.x, pos.y, pos.z);
    this.directionalLightHelper.update(light);
  }

  private updateHemisphereLight() {
    const light = this.light.light as THREE.HemisphereLight;
    const pos = this.hemisphereLightHelper.positionSphere.position;
    light.position.set(pos.x, pos.y, pos.z);
    this.hemisphereLightHelper.update(light);
  }

  private updatePointLight() {
    const light = this.light.light as THREE.PointLight;
    const pos = this.pointLightHelper.positionSphere.position;
    light.position.set(pos.x, pos.y, pos.z);
    this.pointLightHelper.update(light);
  }

  private updateSpotLight() {
    const light = this.light.light as THREE.SpotLight;
    let pos = this.spotLightHelper.positionSphere.position;
    light.position.set(pos.x, pos.y, pos.z);
    pos = this.spotLightHelper.targetSphere.position;
    light.target.position.set(pos.x, pos.y, pos.z);
    this.spotLightHelper.update(light);
  }

  public onDelete(): void {
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete light',
        label: 'Do you want to delete: ',
        message: this.Light.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sceneService.removeObjectFromScene(this.light.light);
        const index = this.Lights.lights.indexOf(this.light);
        if (index > -1) {
          delete this.Lights.lights[index];
          this.Lights.lights.splice(index, 1);
          if (index > 0) {
            this.light = this.Lights.lights[index - 1];
          } else {
            if (this.Lights.lights.length > 0) {
              this.light = this.Lights.lights[0];
            } else {
              this.light = null;
            }
          }
          this.updateSelection();
          this.changedLight.emit(this.light);
        }
      }
    });
  }

  public onCopy(): void {
    if (!this.Light) { return; }
    this.lightCopy = this.Light.clone();
  }

  public onPaste(): void {
    if (!this.lightCopy || !this.Lights ) { return; }

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    this.light = this.lightCopy.clone();
    this.light.name += ' Copy';
    scene.add(this.light.light);
    this.Lights.lights.push(this.light);
    this.newLight.emit(this.light);
    this.changeSelection(this.light);
  }
}

