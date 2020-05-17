import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MeshStandardMaterial } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TextureEditorComponent } from 'src/app/textures/texture-editor/texture-editor.component';
import { Texture } from '../../textures/texture';

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
  public get MetalnessMap(): Texture {
    return this.Material ? this.Material.metalnessMap : null;
  }
  public set MetalnessMap(value: Texture) {}
  public get RoughnessMap(): Texture {
    return this.Material ? this.Material.roughnessMap : null;
  }
  public set RoughnessMap(value: Texture) {}

  constructor() { }

  ngOnInit(): void {
  }

  private updateMaterial(material: MeshStandardMaterial): void {
    this.materialChange.emit(material);
  }

  public onBaseMaterialChanged(material: MeshStandardMaterial): void {
    this.updateMaterial(material);
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

  public onBumpMapScaleChanged(event: MatSliderChange): void {
    this.Material.bumpScale = Math.round((event.value + Number.EPSILON) * 100) / 100;
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

  public onMetalnessMapChanged(event: Texture): void {
    if (event) {
      if (this.Material.metalnessMap !== event) {
        this.Material.metalnessMap = event;
        this.Material.roughnessMap = event;
        (this.Material.material as THREE.MeshStandardMaterial).metalnessMap = event.texture;
        (this.Material.material as THREE.MeshStandardMaterial).roughnessMap = event.texture;
        this.Material.update();
      }
    } else {
      this.Material.metalnessMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).metalnessMap = null;
      this.Material.roughnessMap = null;
      (this.Material.material as THREE.MeshStandardMaterial).roughnessMap = null;
    }
    this.updateMaterial(this.Material);
  }

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
}
