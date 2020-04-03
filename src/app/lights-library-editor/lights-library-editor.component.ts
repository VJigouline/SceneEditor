import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Light } from '../lights/light';

@Component({
  selector: 'app-lights-library-editor',
  templateUrl: './lights-library-editor.component.html',
  styleUrls: ['./lights-library-editor.component.scss']
})
export class LightsLibraryEditorComponent implements OnInit {

  // events
  @Output() changedLight = new EventEmitter<Light>();

  // properties

  constructor() { }

  ngOnInit() {
  }

  public setLights(lights: Light[]): void {
  }

  public onSave() {
    alert('Save light');
  }
  public onSaveAll() {
    alert('Save library');
  }
  public onNew() {
    alert('New light');
  }
  public onLoad() {
    alert('Load light library');
  }

  public onLightChanged(light: Light): void {
    this.changedLight.emit(light);
  }
}
