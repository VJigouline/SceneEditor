import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Light } from '../light';
import { Point3 } from '../../geometries/point3';

@Component({
  selector: 'app-directional-light-editor',
  templateUrl: './directional-light-editor.component.html',
  styleUrls: ['./directional-light-editor.component.scss']
})
export class DirectionalLightEditorComponent implements OnInit {
  // events
  @Output() lightChange = new EventEmitter<Light>();

  // properties
  @Input() Light: Light;

  constructor() { }

  ngOnInit(): void {
  }

  public onColourChanged(colour: string): void {
    this.lightChange.emit(this.Light);
  }
  public onPositionChange(position: Point3): void {
    this.Light.position = position;
    this.lightChange.emit(this.Light);
  }
  public onTargetChange(position: Point3): void {
    this.Light.target = position;
    this.lightChange.emit(this.Light);
  }
}
