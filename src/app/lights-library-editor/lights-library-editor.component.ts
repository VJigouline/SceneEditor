import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Light } from '../lights/light';
import { Lights } from '../lights/lights';
import { LightsLibraryService } from '../lights/lights-library.service';
import { ThreeSceneService } from '../three-scene.service';
import { saveAs } from 'file-saver';
import { MatSelectChange } from '@angular/material/select';
import { LightsLibrary } from '../lights/lights-library';

@Component({
  selector: 'app-lights-library-editor',
  templateUrl: './lights-library-editor.component.html',
  styleUrls: ['./lights-library-editor.component.scss']
})
export class LightsLibraryEditorComponent implements OnInit {

  // events
  @Output() changedLight = new EventEmitter<Light>();

  // properties
  public get Lights(): Lights {
    return this.libraryService.currentLights;
  }
  public set Lights(value: Lights) {
    if (this.libraryService.currentLights == null) { return; }
    this.libraryService.currentLights.name = value.name;
  }
  public get Library(): LightsLibrary {
    return this.libraryService.Library;
  }

  constructor(
    private libraryService: LightsLibraryService,
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit() {
  }

  public onSave(): void {
    const json = JSON.stringify(this.libraryService.Library);
    const blob = new Blob([json], {type: 'text/plain;charset=utf-8'});
    saveAs.saveAs(blob, this.libraryService.Library.name + '.ltslib');
  }
  public onNew(): void {
    alert('New light');
  }
  public onLoad(): void {
    alert('Load light library');
  }

  public onLightChanged(light: Light): void {
    this.changedLight.emit(light);
  }

  public onSelectionChange(change: MatSelectChange): void {
    // this.changeSelection(change.value as Light);
  }
}
