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

  @ViewChild('MaterialEditor')
  private materialEditor: MaterialEditorComponent;

  constructor(
    private libraryService: MaterialLibraryService,
    private confirmationDialog: MatDialog,
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.Materials = this.libraryService.currentMaterials;
  }

  public onSave(): void {
    const json = JSON.stringify(this.libraryService.Library);
    const blob = new Blob([json], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, this.libraryService.Library.name + '.ltslib');
  }
  public onNew(): void {
    this.Materials = new Materials();
    this.Materials.name = 'Light set ' + this.libraryService.Library.materials.length;
    this.libraryService.Library.current = this.libraryService.Library.materials.length;
    this.libraryService.Library.materials.push(this.Materials);
    this.sceneService.resetLights();
    this.materialEditor.Material = null;
    this.materialEditor.updateSelection();
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
        this.sceneService.resetLights();
        this.materialEditor.Material = null;
        this.materialEditor.updateSelection();
        this.changedMaterial.emit(null);
      }
    });
  }
}
