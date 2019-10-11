import { Component, OnInit } from '@angular/core';
import { LightType } from '../light-type.enum';

@Component({
  selector: 'app-light-editor',
  templateUrl: './light-editor.component.html',
  styleUrls: ['./light-editor.component.scss']
})
export class LightEditorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  private onSave() {
    alert("Save light");
  }
  private onSaveAll() {
    alert("Save all lights");
  }
  private onNew() {
    alert("New light");
  }
}
