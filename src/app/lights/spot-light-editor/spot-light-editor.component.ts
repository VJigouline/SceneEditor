import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Light, SpotLight } from '../light';
import { Point3 } from '../../geometries/point3';

@Component({
  standalone: false,
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

  public onAngleChanged(value: number): void {
    this.Light.angle = Math.round((value + Number.EPSILON) * 100) / 100;
    this.lightChange.emit(this.Light);
  }

  public onDecayChanged(value: number): void {
    this.Light.decay = Math.round((value + Number.EPSILON) * 100) / 100;
    this.lightChange.emit(this.Light);
  }

  public onPenumbraChanged(value: number): void {
    this.Light.penumbra = Math.round((value + Number.EPSILON) * 100) / 100;
    this.lightChange.emit(this.Light);
  }
}
