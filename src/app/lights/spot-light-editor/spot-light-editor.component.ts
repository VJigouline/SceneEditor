import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSliderChange } from '@angular/material/slider';

import { Light, SpotLight } from '../light';
import { Point3 } from '../../geometries/point3';

@Component({
  selector: 'app-spot-light-editor',
  templateUrl: './spot-light-editor.component.html',
  styleUrls: ['./spot-light-editor.component.scss']
})
export class SpotLightEditorComponent implements OnInit {
  // events
  @Output() lightChange = new EventEmitter<Light>();

  // properties
  @Input() Light: SpotLight;

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
  public onShadowChange(event: MatCheckboxChange): void {
    this.Light.castShadow = event.checked;
    this.lightChange.emit(this.Light);
  }

  public onAngleChanged(event: MatSliderChange): void {
    this.Light.angle = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.lightChange.emit(this.Light);
  }

  public onDecayChanged(event: MatSliderChange): void {
    this.Light.decay = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.lightChange.emit(this.Light);
  }

  public onPenumbraChanged(event: MatSliderChange): void {
    this.Light.penumbra = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.lightChange.emit(this.Light);
  }
}
