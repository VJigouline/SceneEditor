import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Point3 } from '../../geometries/point3';

@Component({
  selector: 'app-point3-d',
  templateUrl: './point3-d.component.html',
  styleUrls: ['./point3-d.component.scss']
})
export class Point3DComponent implements OnInit {

  // events
  @Output() changePoint = new EventEmitter<Point3>();

  // properties

  @Input() Label = 'Point';
  @Input() Point = new Point3(0, 0, 0);

  @Input() enableX = true;
  @Input() enableY = true;
  @Input() enableZ = true;

  @Input() enableCheckboxes = false;

  get X(): number { return this.Point.X; }
  set X(value: number) {
    if (!this.enableX) { return; }
    this.Point.X = value;
  }
  get Y(): number { return this.Point.Y; }
  set Y(value: number) {
    if (!this.enableY) { return; }
    this.Point.Y = value;
  }
  get Z(): number { return this.Point.Z; }
  set Z(value: number) {
    if (!this.enableZ) { return; }
    this.Point.Z = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  public onChange(): void {
    this.changePoint.emit(this.Point);
  }
}
