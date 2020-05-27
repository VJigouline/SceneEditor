import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeshNormalMaterial } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Texture } from '../../textures/texture';
import { Point3 } from '../../geometries/point3';
import { Vector2 } from '../../geometries/vector2';
import { TextureUsage } from '../../textures/texture-type.enum';

import * as THREE from 'three';

@Component({
  selector: 'app-mesh-normal-material-editor',
  templateUrl: './mesh-normal-material-editor.component.html',
  styleUrls: ['./mesh-normal-material-editor.component.scss']
})
export class MeshNormalMaterialEditorComponent implements OnInit {

  // events
  @Output() materialChange = new EventEmitter<MeshNormalMaterial>();

  // properties
  @Input() Material: MeshNormalMaterial;
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
    return this.Material ? new Point3 (this.Material.normalScale.X,
      this.Material.normalScale.Y, 0) : new Point3(1, 1, 0);
  }
  public set NormalMapScale(value: Point3) {}
  public get NormalMapType(): THREE.NormalMapTypes {
    return this.Material ? this.Material.normalMapType : THREE.TangentSpaceNormalMap;
  }
  public set NormalMapType(value: THREE.NormalMapTypes) {}

  bumpMapUsage = TextureUsage.BUMP_MAP;
  normalMapUsage = TextureUsage.NORMAL_MAP;
  environmentMapUsage = TextureUsage.ENVIRONMENT_MAP;

  constructor() { }

  ngOnInit(): void {
  }

  private updateMaterial(material: MeshNormalMaterial): void {
    this.materialChange.emit(material);
  }

  public onBaseMaterialChanged(material: MeshNormalMaterial): void {
    this.updateMaterial(material);
  }

  public onWireframeChange(event: MatCheckboxChange): void {
    this.Material.wireframe = event.checked;
    this.updateMaterial(this.Material);
  }

  public onWireframeLinewidthChanged(event: MatSliderChange): void {
    this.Material.wireframeLinewidth = Math.round(event.value + Number.EPSILON);
    this.updateMaterial(this.Material);
  }

  public onBumpMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.bumpMap !== event) {
        this.Material.bumpMap = event;
        (this.Material.material as THREE.MeshNormalMaterial).bumpMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.bumpMap = null;
      (this.Material.material as THREE.MeshNormalMaterial).bumpMap = null;
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
        (this.Material.material as THREE.MeshNormalMaterial).displacementMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.displacementMap = null;
      (this.Material.material as THREE.MeshNormalMaterial).displacementMap = null;
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
        (this.Material.material as THREE.MeshNormalMaterial).normalMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.normalMap = null;
      (this.Material.material as THREE.MeshNormalMaterial).normalMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onNormalMapScaleUChanged(value: number): void {
    this.Material.normalScale = new Vector2(value, this.Material.normalScale.Y);
    this.updateMaterial(this.Material);
  }

  public onNormalMapScaleVChanged(value: number): void {
    this.Material.normalScale = new Vector2(this.Material.normalScale.X, value);
    this.updateMaterial(this.Material);
  }
}
