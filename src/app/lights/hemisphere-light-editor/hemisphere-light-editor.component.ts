import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Light, HemisphereLight } from '../light';
import { Point3 } from '../../geometries/point3';

@Component({
  selector: 'app-hemisphere-light-editor',
  templateUrl: './hemisphere-light-editor.component.html',
  styleUrls: ['./hemisphere-light-editor.component.scss']
})
export class HemisphereLightEditorComponent implements OnInit {
  // events
  @Output() lightChange = new EventEmitter<Light>();

  // properties
  @Input() Light: HemisphereLight;

  constructor() { }

  ngOnInit(): void {
  }

  public onColourChanged(colour: string): void {
    this.lightChange.emit(this.Light);
  }
  public onGroundColourChanged(colour: string): void {
    this.lightChange.emit(this.Light);
  }
  public onPositionChange(position: Point3): void {
    this.Light.position = position;
    this.lightChange.emit(this.Light);
  }
  public onShadowChange(event: MatCheckboxChange): void {
    this.Light.castShadow = event.checked;
    this.lightChange.emit(this.Light);
  }
}
