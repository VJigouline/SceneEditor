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

}
