import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSliderChange } from '@angular/material/slider';

import { Light, PointLight } from '../light';
import { Point3 } from '../../geometries/point3';

@Component({
  selector: 'app-point-light-editor',
  templateUrl: './point-light-editor.component.html',
  styleUrls: ['./point-light-editor.component.scss']
})
export class PointLightEditorComponent implements OnInit {
  // events
  @Output() lightChange = new EventEmitter<Light>();

  // properties
  @Input() Light: PointLight;

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
  public onShadowChange(event: MatCheckboxChange): void {
    this.Light.castShadow = event.checked;
    this.lightChange.emit(this.Light);
  }

  public onDecayChanged(event: MatSliderChange): void {
    this.Light.decay = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.lightChange.emit(this.Light);
  }
}
