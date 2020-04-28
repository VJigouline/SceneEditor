import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { Material } from '../materials/material';
import { MatSliderChange } from '@angular/material/slider';
import { MaterialType } from '../materials/material-type.enum';
import { Materials } from '../materials/materials';
import { ConfirmationDialogComponent } from '../user-controls/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MaterialLibraryService } from '../materials/material-library.service';
import * as THREE from 'three';
import { MatSelectChange } from '@angular/material/select';
import { DragControls } from 'three/examples/jsm/controls/DragControls';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent implements OnInit {

  // events
  @Output() newMaterial = new EventEmitter<Material>();
  @Output() changedMaterial = new EventEmitter<Material>();

  // properties
  materialType: typeof MaterialType = MaterialType;
  private material: Material;
  private dragControl: DragControls;

  public get Material(): Material {
    if (!this.material && this.Materials) {
      if (this.Materials.materials.length > 0) { this.material = this.Materials.materials[0]; }
    }

    return this.material;
  }
  @Input() public set Material(value: Material) {
    this.material = value;
    this.changeSelection(this.material);
  }

  public get Materials(): Materials {
    return this.libraryService.currentMaterials;
  }

  constructor(
     private sceneService: ThreeSceneService,
     private confirmationDialog: MatDialog,
     private libraryService: MaterialLibraryService
   ) {}

  ngOnInit(): void {
    this.material = this.Materials.materials[0];
    this.sceneService.transformControl.addEventListener(
      'objectChange', this.onObjectChange.bind(this));
  }

  public onNewMaterial(type: MaterialType): void {

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }

    switch (type) {
      case MaterialType.LINE_BASIC:
        // this.light = new Light(type);
        // this.light.name = 'Ambient ' + this.Lights.lights.length;
        break;
      case MaterialType.LINE_DASHED:
        break;
      case MaterialType.MESH_BASIC:
        break;
      case MaterialType.MESH_DEPTH:
        break;
      case MaterialType.MESH_DISTANCE:
        break;
      case MaterialType.MESH_LAMBERT:
        break;
      case MaterialType.MESH_MATCAP:
        break;
      case MaterialType.MESH_NORMAL:
        break;
      case MaterialType.MESH_PHONG:
        break;
      case MaterialType.MESH_PHYSICAL:
        break;
      case MaterialType.MESH_STANDARD:
        break;
      case MaterialType.MESH_TOON:
        break;
      case MaterialType.POINTS:
        break;
      case MaterialType.SHADOW:
        break;
      case MaterialType.SPRITE:
        break;
    }
    this.Materials.materials.push(this.material);
    this.newMaterial.emit(this.material);
    this.changeSelection(this.material);
   }

  public onMaterialChanged(material: Material): void {
    this.changedMaterial.emit(material);
  }

  public onSelectionChange(change: MatSelectChange): void {
    this.changeSelection(change.value as Material);
  }

  public updateSelection(): void {
    this.changeSelection(this.Material);
  }

  private changeSelection(material: Material): void {
    this.changedMaterial.emit(material);
  }

  private onObjectChange(): void {
    console.error('Not implemented.');
  }

  public onDelete(): void {
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete material',
        label: 'Do you want to delete: ',
        message: this.Material.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.Materials.materials.indexOf(this.material);
        if (index > -1) {
          delete this.Materials.materials[index];
          this.Materials.materials.splice(index, 1);
          if (index > 0) {
            this.material = this.Materials.materials[index - 1];
          } else {
            if (this.Materials.materials.length > 0) {
              this.material = this.Materials.materials[0];
            } else {
              this.material = null;
            }
          }
          this.updateSelection();
          this.changedMaterial.emit(this.material);
        }
      }
    });
  }

  public onDiffuseColourChanged(colour: string): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.color = new THREE.Color(colour);
    } else if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(colour);
    } else {
      console.warn(`Unsupported material type: ${material.type}`);
    }
    this.material.colour = colour;
    this.changedMaterial.emit(this.material);
  }

  onEmissiveColourChanged(colour: string): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.emissive = new THREE.Color(colour);
    } else if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color(colour);
    } else {
      console.warn(`Unsupported material type: ${material.type}`);
    }
    this.changedMaterial.emit(this.material);
  }

  onSpecularColourChanged(colour: string): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.specular = new THREE.Color(colour);
    } else {
      console.warn(`Specular colour not supported in  ${material.type}`);
    }
    this.changedMaterial.emit(this.material);
  }

  onShininessChange(event: MatSliderChange): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.shininess = event.value;
    } else {
      console.warn(`Shininess not supported in  ${material.type}`);
    }
    this.changedMaterial.emit(this.material);
  }

  onRoughnessChange(event: MatSliderChange): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      mat.roughness = event.value;
    } else {
      console.warn(`Shininess not supported in  ${material.type}`);
    }
    this.changedMaterial.emit(this.material);
  }

  onMetalnessChange(event: MatSliderChange): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      mat.metalness = event.value;
    } else {
      console.warn(`Shininess not supported in  ${material.type}`);
    }
    this.changedMaterial.emit(this.material);
  }
}
