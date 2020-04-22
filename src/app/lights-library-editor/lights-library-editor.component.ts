import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Light } from '../lights/light';
import { Lights } from '../lights/lights';
import { LightsLibraryService } from '../lights/lights-library.service';
import { ThreeSceneService } from '../three-scene.service';
import { saveAs } from 'file-saver';
import { MatSelectChange } from '@angular/material/select';
import { LightsLibrary } from '../lights/lights-library';
import { LightEditorComponent } from '../light-editor/light-editor.component';
import { ConfirmationDialogComponent } from '../user-controls/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../user-controls/error-dialog/error-dialog.component';

@Component({
  selector: 'app-lights-library-editor',
  templateUrl: './lights-library-editor.component.html',
  styleUrls: ['./lights-library-editor.component.scss']
})
export class LightsLibraryEditorComponent implements OnInit {

  // events
  @Output() changedLight = new EventEmitter<Light>();

  // properties
  public get Library(): LightsLibrary {
    return this.libraryService.Library;
  }
  public Lights: Lights;
  public Light: Light;

  @ViewChild('LightEditor')
  private lightEditor: LightEditorComponent;

  constructor(
    private libraryService: LightsLibraryService,
    private confirmationDialog: MatDialog,
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
    this.Lights = this.libraryService.currentLights;
  }

  public onSave(): void {
    const json = JSON.stringify(this.libraryService.Library);
    const blob = new Blob([json], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, this.libraryService.Library.name + '.ltslib');
  }
  public onNew(): void {
    this.Lights = new Lights();
    this.Lights.name = 'Light set ' + this.libraryService.Library.lights.length;
    this.libraryService.Library.current = this.libraryService.Library.lights.length;
    this.libraryService.Library.lights.push(this.Lights);
    this.sceneService.resetLights();
    this.lightEditor.Light = null;
    this.lightEditor.updateSelection();
    this.changedLight.emit(null);
  }

  public onClear(): void {
    const dialogRef = this.confirmationDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'Clear lights library',
        label: 'All light sets in the library will be deleted and one empty created. ',
        message: 'Do you want to continue?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryService.Library.clear();
        this.Lights = this.libraryService.Library.lights[0];
        this.sceneService.resetLights();
        this.lightEditor.updateSelection();
        this.changedLight.emit(null);
      }
    });
  }

  public onLightChanged(light: Light): void {
    this.Light = light;
    this.changedLight.emit(light);
  }

  public onSelectionChange(change: MatSelectChange): void {
    this.Lights = change.value as Lights;
    this.Light = this.Lights.lights.length === 0 ? null : this.Lights.lights[0];
    this.lightEditor.Light = this.Light;
    this.libraryService.setCurrentLights(this.Lights);
    this.sceneService.resetLights();
    this.lightEditor.updateSelection();
    this.changedLight.emit(null);
  }

  public onSelectedTabChange(index: number) {
    if (index === 0) {
      this.lightEditor.updateSelection();
    } else {
      this.lightEditor.unsetLightHelper();
    }
    this.changedLight.emit(null);
  }

  public onImport(event: any): void {
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, 'UTF-8');
    fileReader.onload = () => {
      try {
        const lib = JSON.parse(fileReader.result as string) as LightsLibrary;
        const l = new LightsLibrary();
        lib.clone = l.clone.bind(lib);
        if (lib.current === undefined) { lib.current = 0; }
        this.libraryService.importLibrary(lib.clone());
        this.libraryService.setCurrentLights(this.Lights);
        this.sceneService.resetLights();
        this.changedLight.emit(null);
        this.lightEditor.updateSelection();
        const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
          width: '350px',
          data: {
            title: 'Success',
            label: 'Light library imported from: ',
            message: selectedFile.name
          }
        });
      } catch (e) {
        const dialogRef = this.confirmationDialog.open(ErrorDialogComponent, {
          width: '350px',
          data: {
            title: 'Error',
            label: 'Failure to read lights library: ',
            message: e
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
          message: error
        }
      });
    };
  }
}
