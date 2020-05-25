import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeshPhongMaterial } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Texture } from '../../textures/texture';
import { Point3 } from '../../geometries/point3';
import { TextureUsage } from '../../textures/texture-type.enum';

import * as THREE from 'three';

@Component({
  selector: 'app-mesh-phong-material-editor',
  templateUrl: './mesh-phong-material-editor.component.html',
  styleUrls: ['./mesh-phong-material-editor.component.scss']
})
export class MeshPhongMaterialEditorComponent implements OnInit {

  // events
  @Output() materialChange = new EventEmitter<MeshPhongMaterial>();

  // properties
  @Input() Material: MeshPhongMaterial;

  public get ColourTexture(): Texture {
    return this.Material ? this.Material.map : null;
  }
  public set ColourTexture(value: Texture) {}
  public get AlphaMap(): Texture {
    return this.Material ? this.Material.alphaMap : null;
  }
  public set AlphaMap(value: Texture) {}
  public get BumpMap(): Texture {
    return this.Material ? this.Material.bumpMap : null;
  }
  public set BumpMap(value: Texture) {}
  public get BumpMapScale(): number {
    return this.Material ? this.Material.bumpScale : 1;
  }
  public set BumpMapScale(value: number) {}
  public get DisplacementMap(): Texture {
    return this.Material ? this.Material.displacementMap : null;
  }
  public set DisplacementMap(value: Texture) {}
  public get DisplacementMapScale(): number {
    return this.Material ? this.Material.displacementScale : 1;
  }
  public set DisplacementMapScale(value: number) {}
  public get DisplacementMapBias(): number {
    return this.Material ? this.Material.displacementBias : 1;
  }
  public set DisplacementMapBias(value: number) {}
  public get EmissiveMap(): Texture {
    return this.Material ? this.Material.emissiveMap : null;
  }
  public set EmissiveMap(value: Texture) {}
  public get EnvironmentMap(): Texture {
    return this.Material ? this.Material.envMap : null;
  }
  public set EnvironmentMap(value: Texture) {}
  public get NormalMap(): Texture {
    return this.Material ? this.Material.normalMap : null;
  }
  public set NormalMap(value: Texture) {}
  public get NormalMapScale(): Point3 {
    return this.Material ? new Point3 (this.Material.normalScale.x,
      this.Material.normalScale.y, 0) : new Point3(1, 1, 0);
  }
  public set NormalMapScale(value: Point3) {}
  public get NormalMapType(): THREE.NormalMapTypes {
    return this.Material ? this.Material.normalMapType : THREE.TangentSpaceNormalMap;
  }
  public set NormalMapType(value: THREE.NormalMapTypes) {}
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

  private updateMaterial(material: MeshPhongMaterial): void {
    this.materialChange.emit(material);
  }

  public onBaseMaterialChanged(material: MeshPhongMaterial): void {
    this.updateMaterial(material);
  }

  public onColourChanged(colour: string): void {
    this.updateMaterial(this.Material);
  }

  public onEmissiveIntensityChanged(event: MatSliderChange): void {
    this.Material.emissiveIntensity = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  onShininessChanged(event: MatSliderChange): void {
    this.Material.shininess = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onTextureChanged(event: Texture): void {
    if (event) {
      if (this.Material.map !== event) {
        this.Material.map = event;
        (this.Material.material as THREE.MeshPhongMaterial).map = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.map = null;
      (this.Material.material as THREE.MeshPhongMaterial).map = null;
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
        (this.Material.material as THREE.MeshPhongMaterial).alphaMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.alphaMap = null;
      (this.Material.material as THREE.MeshPhongMaterial).alphaMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onBumpMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.bumpMap !== event) {
        this.Material.bumpMap = event;
        (this.Material.material as THREE.MeshPhongMaterial).bumpMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.bumpMap = null;
      (this.Material.material as THREE.MeshPhongMaterial).bumpMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onBumpMapScaleChanged(event: number): void {
    this.Material.bumpScale = event;
    this.updateMaterial(this.Material);
  }

  public onDisplacementMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.displacementMap !== event) {
        this.Material.displacementMap = event;
        (this.Material.material as THREE.MeshPhongMaterial).displacementMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.displacementMap = null;
      (this.Material.material as THREE.MeshPhongMaterial).displacementMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onDisplacementMapScaleChanged(event: MatSliderChange): void {
    this.Material.displacementScale = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.Material.update();
    this.updateMaterial(this.Material);
  }

  public onDisplacementMapBiasChanged(event: MatSliderChange): void {
    this.Material.displacementBias = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.Material.update();
    this.updateMaterial(this.Material);
  }

  public onEmissiveMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.emissiveMap !== event) {
        this.Material.emissiveMap = event;
        (this.Material.material as THREE.MeshPhongMaterial).emissiveMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.emissiveMap = null;
      (this.Material.material as THREE.MeshPhongMaterial).emissiveMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onEnvironmentMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.envMap !== event) {
        this.Material.envMap = event;
        (this.Material.material as THREE.MeshPhongMaterial).envMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.envMap = null;
      (this.Material.material as THREE.MeshPhongMaterial).envMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onNormalMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.normalMap !== event) {
        this.Material.normalMap = event;
        (this.Material.material as THREE.MeshPhongMaterial).normalMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.normalMap = null;
      (this.Material.material as THREE.MeshPhongMaterial).normalMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onNormalMapScaleUChanged(value: number): void {
    this.Material.normalScale = new THREE.Vector2(value, this.Material.normalScale.y);
    this.updateMaterial(this.Material);
  }

  public onNormalMapScaleVChanged(value: number): void {
    this.Material.normalScale = new THREE.Vector2(this.Material.normalScale.x, value);
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
        (this.Material.material as THREE.MeshPhongMaterial).specularMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.specularMap = null;
      (this.Material.material as THREE.MeshPhongMaterial).specularMap = null;
    }
    this.updateMaterial(this.Material);
  }
}
