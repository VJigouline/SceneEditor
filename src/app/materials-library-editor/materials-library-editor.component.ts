import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Material } from '../materials/material';
import { Materials } from '../materials/materials';
import { MaterialLibraryService } from '../materials/material-library.service';
import { ThreeSceneService } from '../three-scene.service';
import { saveAs } from 'file-saver';
import { MatSelectChange } from '@angular/material/select';
import { MaterialLibrary } from '../materials/material-library';
import { MaterialEditorComponent } from '../material-editor/material-editor.component';
import { ConfirmationDialogComponent } from '../user-controls/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../user-controls/error-dialog/error-dialog.component';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { DragEvent } from '../interfaces';

import * as THREE from 'three';

@Component({
  selector: 'app-materials-library-editor',
  templateUrl: './materials-library-editor.component.html',
  styleUrls: ['./materials-library-editor.component.scss']
})
export class MaterialsLibraryEditorComponent implements OnInit {

  // events
  @Output() changedMaterial = new EventEmitter<Material>();

  // properties
  public get Library(): MaterialLibrary {
    return this.libraryService.Library;
  }
  public Materials: Materials;
  public Material: Material;
  public get deleteDisabled(): boolean {
    return this.libraryService.Library.current < 0 ||
      this.libraryService.Library.current >= this.libraryService.Library.materials.length;
  }
  private dragControl: DragControls;
  private selectedObject: THREE.Object3D;
  private highlightedObject: THREE.Object3D;
  private selectedObjectMaterial: THREE.Material | THREE.Material[];
  private highlightedObjectMaterial: THREE.Material | THREE.Material[];
  private selectedMaterial: THREE.Material;
  private highlightedMaterial: THREE.Material;

  @ViewChild('MaterialEditor')
  private materialEditor: MaterialEditorComponent;

  constructor(
    private libraryService: MaterialLibraryService,
    private confirmationDialog: MatDialog,
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.Materials = this.libraryService.currentMaterials;
    this.highlightedMaterial = new THREE.MeshStandardMaterial( {
      color: '#ff00ff', metalness: 1, roughness: 0.5, name: 'Highlight',
      transparent: true, opacity: 0.5
     } );
    this.selectedMaterial = new THREE.MeshStandardMaterial( {
      color: '#ffff00', metalness: 1, roughness: 0.5, name: 'Highlight',
      transparent: true, opacity: 0.5
     } );
  }

  public onSave(): void {
    const json = JSON.stringify(this.libraryService.Library);
    const blob = new Blob([json], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, this.libraryService.Library.name + '.ltslib');
  }
  public onNew(): void {
    this.Materials = new Materials();
    this.Materials.name = 'Material set ' + this.libraryService.Library.materials.length;
    this.libraryService.Library.current = this.libraryService.Library.materials.length;
    this.libraryService.Library.materials.push(this.Materials);
    this.sceneService.resetLights();
    if (this.materialEditor) {
      this.materialEditor.Material = null;
      this.materialEditor.updateSelection();
    }
    this.changedMaterial.emit(null);
  }

  public onClone(): void {
    this.Materials = this.Materials.clone();
    this.Materials.name += ' Copy';
    this.libraryService.Library.current = this.libraryService.Library.materials.length;
    this.libraryService.Library.materials.push(this.Materials);
    this.sceneService.resetLights();
    this.materialEditor.Material = null;
    this.materialEditor.updateSelection();
    this.changedMaterial.emit(null);
  }

  public onClear(): void {
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Clear materials library',
        label: 'All materials in the library will be deleted and one empty created. ',
        message: 'Do you want to continue?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryService.Library.clear();
        this.Materials = this.libraryService.Library.materials[0];
        this.sceneService.resetLights();
        this.materialEditor.updateSelection();
        this.changedMaterial.emit(null);
      }
    });
  }

  public onMaterialChanged(material: Material): void {
    this.Material = material;
    this.changedMaterial.emit(material);
  }

  public onSelectionChange(change: MatSelectChange): void {
    this.Materials = change.value as Materials;
    this.Material = this.Materials.materials.length === 0 ? null : this.Materials.materials[0];
    this.materialEditor.Material = this.Material;
    this.libraryService.setCurrentMaterials(this.Materials);
    this.sceneService.resetLights();
    this.materialEditor.updateSelection();
    this.changedMaterial.emit(null);
  }

  public onSelectedTabChange(index: number) {
    if (index === 1) {
      this.setDragControl();
    } else {
      this.removeDragControl();
      this.removeHighlighting();
      this.removeSelection();
    }
  }

  public onImport(event: any): void {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    event.target.value = '';
    fileReader.onload = () => {
      try {
        const lib = JSON.parse(fileReader.result as string) as MaterialLibrary;
        const l = new MaterialLibrary();
        lib.clone = l.clone.bind(lib);
        if (lib.current === undefined) { lib.current = 0; }
        this.libraryService.importLibrary(lib.clone());
        this.libraryService.setCurrentMaterials(this.Materials);
        this.sceneService.resetLights();
        this.Materials = this.libraryService.currentMaterials;
        this.Material = this.Materials.materials.length > 0 ? this.Materials.materials[0] : null;
        if (this.materialEditor) {
          this.materialEditor.updateSelection();
          this.materialEditor.Material = this.libraryService.currentMaterials.materials.length > 0 ?
            this.libraryService.currentMaterials.materials[0] : null;
        }
        this.changedMaterial.emit(null);
        const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
          width: '350px',
          data: {
            title: 'Success',
            label: 'Material library imported from: ',
            message: selectedFile.name,
            close: true
          }
        });
      } catch (e) {
        const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
          width: '350px',
          data: {
            title: 'Error',
            label: 'Failure to read materials library: ',
            message: e,
            cancel: true
          }
        });
      }
    };
    fileReader.onerror = (error) => {
      const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
        width: '350px',
        data: {
          title: 'Error',
          label: 'Failure to read file: ',
          message: error,
          cancel: true
        }
      });
    };
  }

  public onDelete(): void {
    if (this.deleteDisabled) { return; }
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Delete material set',
        label: 'Current material set will be deleted. ',
        message: 'Do you want to continue?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let current = this.libraryService.Library.current;
        this.libraryService.Library.materials.splice(current, 1);
        if (current >= this.libraryService.Library.materials.length) {
          current = this.libraryService.Library.materials.length - 1;
        }
        this.libraryService.Library.current = current;
        if (current < 0) {
          this.Materials = null;
        } else {
          this.Materials = this.libraryService.Library.materials[current];
        }
        this.materialEditor.Material = null;
        this.materialEditor.updateSelection();
        this.changedMaterial.emit(null);
      }
    });
  }

  public onGetFromScene(): void {
    const materials = this.sceneService.getSceneMaterials();
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Add materials from scene',
        label: materials.materials.length + ' materials will be added. ',
        message: 'Do you want to continue?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.Materials = materials;
        this.Materials.name = 'From scene';
        this.libraryService.Library.current = this.libraryService.Library.materials.length;
        this.libraryService.Library.materials.push(this.Materials);
        this.sceneService.resetLights();
        if (this.materialEditor) {
          this.materialEditor.Material = null;
          this.materialEditor.updateSelection();
        }
        this.changedMaterial.emit(null);
      }
    });
  }

  private removeDragControl(): void {
    if (this.dragControl) {
      this.dragControl.enabled = false;
      this.dragControl.deactivate();
      delete this.dragControl;
      this.dragControl = null;
    }
  }

  private setDragControl(): void {
    this.dragControl = this.sceneService.getDragControl(
      this.sceneService.getSelectableObjects()
    );
    this.dragControl.enabled = false;
    this.dragControl.addEventListener('hoveron',
      this.onDragHoveron.bind(this));
    this.dragControl.addEventListener('hoveroff',
      this.onDragHoveroff.bind(this));
    this.dragControl.addEventListener('dragstart',
      this.onDragStart.bind(this));
    this.dragControl.addEventListener('drag',
      this.onDragStart.bind(this));
  }

  private onDragHoveron(event: DragEvent): void {
    this.removeHighlighting();
    this.removeSelection();
    if (event.object instanceof THREE.Mesh) {
      const mesh = event.object as THREE.Mesh;
      if (mesh !== this.selectedObject) {
        this.highlightedObject = mesh;
        this.highlightedObjectMaterial = mesh.material;
        mesh.material = this.highlightedMaterial;
      }
    }
    this.changedMaterial.emit(null);
  }

  private onDragHoveroff(event: DragEvent): void {
    this.removeHighlighting();
    this.removeSelection();
    this.changedMaterial.emit(null);
  }

  private removeHighlighting(): void {
    if (this.highlightedObject) {
      if (this.highlightedObject instanceof THREE.Mesh) {
        const mesh = this.highlightedObject as THREE.Mesh;
        mesh.material = this.highlightedObjectMaterial;
        this.highlightedObjectMaterial = null;
        this.highlightedObject = null;
      }
    }
  }

  private removeSelection(): void {
    if (this.selectedObject) {
      if (this.selectedObject instanceof THREE.Mesh) {
        const mesh = this.selectedObject as THREE.Mesh;
        mesh.material = this.selectedObjectMaterial;
        this.selectedObjectMaterial = null;
        this.selectedObject = null;
      }
    }
  }

  private onDragStart(event: DragEvent): void {
    this.removeSelection();
    this.removeHighlighting();
    if (event.object instanceof THREE.Mesh) {
      this.selectMesh(event.object as THREE.Mesh);
    }
    this.changedMaterial.emit(null);
  }

  private selectMesh(mesh: THREE.Mesh): void {
    this.selectedObject = mesh;
    this.selectedObjectMaterial = mesh.material;
    if (Array.isArray(mesh.material)) {
      for (const m of mesh.material as THREE.Material[]) {
        if (this.selectMaterial(m)) {
          break;
        }
      }
    } else {
      if (!this.selectMaterial(mesh.material as THREE.Material)) {
        const mat = mesh.material as THREE.Material;
        const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
          width: '350px',
          data: {
            title: 'Add material',
            label: 'Material not found. ',
            message: 'Do you want to add selected material to the current library?'
          }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.addMaterial(mat);
          }
        });
      }
    }
    mesh.material = this.selectedMaterial;
  }

  private addMaterial(material: THREE.Material): void {

    const scene = this.sceneService.getScene();
    if (scene == null) { return; }
    const mat = Material.CreateMaterial(material);
    this.Materials.materials.push(mat);
    this.Material = mat;
    this.materialEditor.Material = mat;
    this.materialEditor.updateSelection();
    this.changedMaterial.emit(mat);
}

  private hasMaterial(material: THREE.Material): boolean {
    for (const materials of this.libraryService.Library.materials) {
      for (const m of materials.materials) {
        if (m.material === material) { return true; }
      }
    }

    return false;
  }

  private selectMaterial(material: THREE.Material): boolean {
    for (const materials of this.Library.materials) {
      for (const m of materials.materials) {
        if (m.material === material) {
          const imat = this.Library.materials.indexOf(materials);
          if (imat >= 0) {
            this.Library.current = imat;
            this.Materials = materials;
            this.Material = m;
            return true;
          }
        }
      }
    }

    return false;
  }
}
