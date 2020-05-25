import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MeshStandardMaterial, MeshPhysicalMaterial, MeshPhysicalMaterialExport } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TextureEditorComponent } from 'src/app/textures/texture-editor/texture-editor.component';
import { Texture } from '../../textures/texture';
import { Point3 } from '../../geometries/point3';
import { Vector2 } from '../../geometries/vector2';
import { TextureUsage } from '../../textures/texture-type.enum';

import * as THREE from 'three';

@Component({
  selector: 'app-mesh-standard-material-editor',
  templateUrl: './mesh-standard-material-editor.component.html',
  styleUrls: ['./mesh-standard-material-editor.component.scss']
})
export class MeshStandardMaterialEditorComponent implements OnInit {

  @ViewChild('TextureEditor')
  private textureEditor: TextureEditorComponent;

  // events
  @Output() materialChange = new EventEmitter<MeshStandardMaterial>();

  // properties
  @Input() Material: MeshStandardMaterial;
  @Input() physical = false;

  get Title(): string {
    return this.physical ? 'Mesh Physical Material' : 'Mesh Standard Material';
  }
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
  public get EnvironmentMapIntensity(): number {
    return this.Material ? this.Material.envMapIntensity : 1;
  }
  public set EnvironmentMapIntensity(value: number) {}
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
  public get MetalnessMap(): Texture {
    return this.Material ? this.Material.metalnessMap : null;
  }
  public set MetalnessMap(value: Texture) {}
  /*
  public get RoughnessMap(): Texture {
    return this.Material ? this.Material.roughnessMap : null;
  }
  public set RoughnessMap(value: Texture) {}
  */

  get clearcoat(): number {
    if (this.physical && this.Material) {
      return (this.Material as unknown as MeshPhysicalMaterial).clearcoat;
    }

    return 0;
  }
  set clearcoat(value: number) {
    if (this.physical && this.Material) {
      (this.Material as unknown as MeshPhysicalMaterial).clearcoat = value;
    }
  }
  /*
  get ClearcoatNormalMap(): Texture {
    if (this.physical && this.Material) {
      return (this.Material as unknown as MeshPhysicalMaterial).clearcoatNormalMap;
    }

    return null;
  }
  set ClearcoatNormalMap(value: Texture) {}
  */
  get clearcoatRoughness(): number {
    if (this.physical && this.Material) {
      return (this.Material as unknown as MeshPhysicalMaterial).clearcoatRoughness;
    }

    return 0;
  }
  set clearcoatRoughness(value: number) {
    if (this.physical && this.Material) {
      (this.Material as unknown as MeshPhysicalMaterial).clearcoatRoughness = value;
    }
  }
  get clearcoatReflectivity(): number {
    if (this.physical && this.Material) {
      return (this.Material as unknown as MeshPhysicalMaterial).reflectivity;
    }

    return 0;
  }
  set clearcoatReflectivity(value: number) {
    if (this.physical && this.Material) {
      (this.Material as unknown as MeshPhysicalMaterial).reflectivity = value;
    }
  }

  get metalnessUsage(): TextureUsage {
    return this.physical ? TextureUsage.CLEARCOAT_MAP : TextureUsage.METALNESS_MAP;
  }

  bumpMapUsage = TextureUsage.BUMP_MAP;
  normalMapUsage = TextureUsage.NORMAL_MAP;
  environmentMapUsage = TextureUsage.ENVIRONMENT_MAP;

  constructor() { }

  ngOnInit(): void {
  }

  private updateMaterial(material: MeshStandardMaterial): void {
    this.materialChange.emit(material);
  }

  public onBaseMaterialChanged(material: MeshStandardMaterial): void {
    this.updateMaterial(material);
  }

  onClearcoatChanged(event: MatSliderChange): void {
    (this.Material as unknown as MeshPhysicalMaterial).clearcoat =
      Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  onClearcoatRoughnessChanged(event: MatSliderChange): void {
    (this.Material as unknown as MeshPhysicalMaterial).clearcoatRoughness =
      Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  onClearcoatReflectivityChanged(event: MatSliderChange): void {
    (this.Material as unknown as MeshPhysicalMaterial).reflectivity =
      Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onColourChanged(colour: string): void {
    this.updateMaterial(this.Material);
  }

  public onEmissiveIntensityChanged(event: MatSliderChange): void {
    this.Material.emissiveIntensity = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onMetalnessChanged(event: MatSliderChange): void {
    this.Material.metalness = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onRoughnessChanged(event: MatSliderChange): void {
    this.Material.roughness = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onTextureChanged(event: Texture): void {
    if (event) {
      if (this.Material.map !== event) {
        this.Material.map = event;
        (this.Material.material as THREE.MeshStandardMaterial).map = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.map = null;
      (this.Material.material as THREE.MeshStandardMaterial).map = null;
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
        (this.Material.material as THREE.MeshStandardMaterial).alphaMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.alphaMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).alphaMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onBumpMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.bumpMap !== event) {
        this.Material.bumpMap = event;
        (this.Material.material as THREE.MeshStandardMaterial).bumpMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.bumpMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).bumpMap = null;
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
        (this.Material.material as THREE.MeshStandardMaterial).displacementMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.displacementMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).displacementMap = null;
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
        (this.Material.material as THREE.MeshStandardMaterial).emissiveMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.emissiveMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).emissiveMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onEnvironmentMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.envMap !== event) {
        this.Material.envMap = event;
        (this.Material.material as THREE.MeshStandardMaterial).envMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.envMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).envMap = null;
    }
    this.updateMaterial(this.Material);
  }

  public onEnvironmentMapIntensityChanged(value: number): void {
    this.Material.envMapIntensity = value;
    this.updateMaterial(this.Material);
  }

  public onNormalMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.normalMap !== event) {
        this.Material.normalMap = event;
        (this.Material.material as THREE.MeshStandardMaterial).normalMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.normalMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).normalMap = null;
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

  onClearcoatMapScaleUChanged(value: number): void {
    if (!this.physical) { return; }
    const m = this.Material as MeshPhysicalMaterial;
    m.clearcoatNormalScale = new Vector2(value, m.clearcoatNormalScale.Y);
    this.updateMaterial(this.Material);
  }

  onClearcoatMapScaleVChanged(value: number): void {
    if (!this.physical) { return; }
    const m = this.Material as MeshPhysicalMaterial;
    m.clearcoatNormalScale = new Vector2(m.clearcoatNormalScale.X, value);
    this.updateMaterial(this.Material);
  }

  public onMetalnessMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.metalnessMap !== event) {
        this.Material.metalnessMap = event;
//        this.Material.roughnessMap = event;
        (this.Material.material as THREE.MeshStandardMaterial).metalnessMap = event.texture;
        (this.Material.material as THREE.MeshStandardMaterial).roughnessMap = event.texture;
        if (this.physical) {
          const m = this.Material as MeshPhysicalMaterial;
//          m.clearcoatNormalMap = event;
          (m.material as THREE.MeshPhysicalMaterial).clearcoatNormalMap = event.texture;
          m.update();
        } else {
          this.Material.update();
        }
      }
    } else {
      this.Material.metalnessMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).metalnessMap = null;
//      this.Material.roughnessMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).roughnessMap = null;
      if (this.physical) {
        const m = this.Material as MeshPhysicalMaterial;
//        m.clearcoatNormalMap = null;
        (m.material as THREE.MeshPhysicalMaterial).clearcoatNormalMap = null;
        m.update();
      } else {
        this.Material.update();
      }
  }
    this.updateMaterial(this.Material);
  }
/*
  public onRoughnessMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.roughnessMap !== event) {
        this.Material.roughnessMap = event;
        (this.Material.material as THREE.MeshStandardMaterial).roughnessMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.roughnessMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).roughnessMap = null;
    }
    this.updateMaterial(this.Material);
  }
*/
  onRefractionRatioChanged(value: number): void {
    this.Material.refractionRatio = value;
    this.updateMaterial(this.Material);
  }
/*
  onClearcoatNormalMapChanged(event: Texture): void {
    if (!this.physical || !this.Material) { return; }

    const m = this.Material as MeshPhysicalMaterial;

    if (event) {
      if (m.clearcoatNormalMap !== event) {
        m.clearcoatNormalMap = event;
        (this.Material.material as THREE.MeshPhysicalMaterial).clearcoatNormalMap = event.texture;
        this.Material.update();
      }
    } else {
      m.clearcoatNormalMap = null;
      (this.Material.material as THREE.MeshPhysicalMaterial).clearcoatNormalMap = null;
    }
    this.updateMaterial(this.Material);
  }
*/
}
