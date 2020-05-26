import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeshMatcapMaterial } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { Texture } from '../../textures/texture';
import { Point3 } from '../../geometries/point3';
import { TextureUsage } from '../../textures/texture-type.enum';

import * as THREE from 'three';

@Component({
  selector: 'app-mesh-matcap-material-editor',
  templateUrl: './mesh-matcap-material-editor.component.html',
  styleUrls: ['./mesh-matcap-material-editor.component.scss']
})
export class MeshMatcapMaterialEditorComponent implements OnInit {

  // events
  @Output() materialChange = new EventEmitter<MeshMatcapMaterial>();

  // properties
  @Input() Material: MeshMatcapMaterial;

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
  get MatcapMap(): Texture {
    return this.Material ? this.Material.matcapMap : null;
  }
  set SpecularMap(value: Texture) {}

  bumpMapUsage = TextureUsage.BUMP_MAP;
  normalMapUsage = TextureUsage.NORMAL_MAP;
  environmentMapUsage = TextureUsage.ENVIRONMENT_MAP;

  constructor() { }

  ngOnInit(): void {
  }

  private updateMaterial(material: MeshMatcapMaterial): void {
    this.materialChange.emit(material);
  }

  public onBaseMaterialChanged(material: MeshMatcapMaterial): void {
    this.updateMaterial(material);
  }

  public onColourChanged(colour: string): void {
    this.updateMaterial(this.Material);
  }

  public onTextureChanged(event: Texture): void {
    if (event) {
      if (this.Material.map !== event) {
        this.Material.map = event;
        (this.Material.material as THREE.MeshMatcapMaterial).map = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.map = null;
      (this.Material.material as THREE.MeshMatcapMaterial).map = null;
    }
    this.updateMaterial(this.Material);
  }

  public onAlphaMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.alphaMap !== event) {
        this.Material.alphaMap = event;
        (this.Material.material as THREE.MeshMatcapMaterial).alphaMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.alphaMap = null;
      (this.Material.material as THREE.MeshMatcapMaterial).alphaMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onBumpMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.bumpMap !== event) {
        this.Material.bumpMap = event;
        (this.Material.material as THREE.MeshMatcapMaterial).bumpMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.bumpMap = null;
      (this.Material.material as THREE.MeshMatcapMaterial).bumpMap = null;
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
        (this.Material.material as THREE.MeshMatcapMaterial).displacementMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.displacementMap = null;
      (this.Material.material as THREE.MeshMatcapMaterial).displacementMap = null;
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

  public onNormalMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.normalMap !== event) {
        this.Material.normalMap = event;
        (this.Material.material as THREE.MeshMatcapMaterial).normalMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.normalMap = null;
      (this.Material.material as THREE.MeshMatcapMaterial).normalMap = null;
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

  onMatcapMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.matcapMap !== event) {
        this.Material.matcapMap = event;
        (this.Material.material as THREE.MeshMatcapMaterial).matcap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.matcapMap = null;
      (this.Material.material as THREE.MeshMatcapMaterial).matcap = null;
    }
    this.updateMaterial(this.Material);
  }
}
