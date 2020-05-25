import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MeshBasicMaterial } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Texture } from '../../textures/texture';
import { TextureUsage } from '../../textures/texture-type.enum';

import * as THREE from 'three';

@Component({
  selector: 'app-mesh-basic-material-editor',
  templateUrl: './mesh-basic-material-editor.component.html',
  styleUrls: ['./mesh-basic-material-editor.component.scss']
})
export class MeshBasicMaterialEditorComponent implements OnInit {

  // events
  @Output() materialChange = new EventEmitter<MeshBasicMaterial>();

  // properties
  @Input() Material: MeshBasicMaterial;

  public get ColourTexture(): Texture {
    return this.Material ? this.Material.map : null;
  }
  public set ColourTexture(value: Texture) {}
  public get AlphaMap(): Texture {
    return this.Material ? this.Material.alphaMap : null;
  }
  public set AlphaMap(value: Texture) {}
  public get EnvironmentMap(): Texture {
    return this.Material ? this.Material.envMap : null;
  }
  public set EnvironmentMap(value: Texture) {}
  get SpecularMap(): Texture {
    return this.Material ? this.Material.specularMap : null;
  }
  set SpecularMap(value: Texture) {}

  bumpMapUsage = TextureUsage.BUMP_MAP;
  normalMapUsage = TextureUsage.NORMAL_MAP;
  environmentMapUsage = TextureUsage.ENVIRONMENT_MAP;

  constructor() { }

  ngOnInit(): void {
  }

  private updateMaterial(material: MeshBasicMaterial): void {
    this.materialChange.emit(material);
  }

  public onBaseMaterialChanged(material: MeshBasicMaterial): void {
    this.updateMaterial(material);
  }

  public onColourChanged(colour: string): void {
    this.updateMaterial(this.Material);
  }

  public onTextureChanged(event: Texture): void {
    if (event) {
      if (this.Material.map !== event) {
        this.Material.map = event;
        (this.Material.material as THREE.MeshBasicMaterial).map = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.map = null;
      (this.Material.material as THREE.MeshBasicMaterial).map = null;
    }
    this.updateMaterial(this.Material);
  }

  public onWireframeChange(event: MatCheckboxChange): void {
    this.Material.wireframe = event.checked;
    this.updateMaterial(this.Material);
  }

  public onWireframeLinewidthChanged(event: MatSliderChange): void {
    this.Material.wireframeLinewidth = Math.round(event.value + Number.EPSILON);
    this.updateMaterial(this.Material);
  }

  public onAlphaMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.alphaMap !== event) {
        this.Material.alphaMap = event;
        (this.Material.material as THREE.MeshBasicMaterial).alphaMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.alphaMap = null;
      (this.Material.material as THREE.MeshBasicMaterial).alphaMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onEnvironmentMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.envMap !== event) {
        this.Material.envMap = event;
        (this.Material.material as THREE.MeshBasicMaterial).envMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.envMap = null;
      (this.Material.material as THREE.MeshBasicMaterial).envMap = null;
    }
    this.updateMaterial(this.Material);
  }

  onReflectivityChanged(value: number): void {
    this.Material.reflectivity = value;
    this.updateMaterial(this.Material);
  }

  onRefractionRatioChanged(value: number): void {
    this.Material.refractionRatio = value;
    this.updateMaterial(this.Material);
  }

  onSpecularMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.specularMap !== event) {
        this.Material.specularMap = event;
        (this.Material.material as THREE.MeshBasicMaterial).specularMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.specularMap = null;
      (this.Material.material as THREE.MeshBasicMaterial).specularMap = null;
    }
    this.updateMaterial(this.Material);
  }
}
