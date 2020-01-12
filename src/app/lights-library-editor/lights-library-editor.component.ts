import { Component, OnInit } from '@angular/core';
import { Light } from '../light';

@Component({
  selector: 'app-lights-library-editor',
  templateUrl: './lights-library-editor.component.html',
  styleUrls: ['./lights-library-editor.component.scss']
})
export class LightsLibraryEditorComponent implements OnInit {

  private lights: Light[];

  constructor() { }

  ngOnInit() {
  }

  public setLights(lights: Light[]): void {
    this.lights = lights;
  }

  private onSave() {
    alert('Save light');
  }
  private onSaveAll() {
    alert('Save library');
  }
  private onNew() {
    alert('New light');
  }
  private onLoad() {
    alert('Load light library');
  }

}
