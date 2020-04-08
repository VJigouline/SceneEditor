import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-point3-d',
  templateUrl: './point3-d.component.html',
  styleUrls: ['./point3-d.component.scss']
})
export class Point3DComponent implements OnInit {

  // events

  // properties

  @Input() Label = 'Point';

  @Input() enableX = true;
  @Input() enableY = true;
  @Input() enableZ = true;

  get X(): number { return this.x; }
  @Input() set X(value: number) {
    if (!this.enableX) { return; }
    this.x = value;
  }
  get Y(): number { return this.y; }
  @Input() set Y(value: number) {
    if (!this.enableY) { return; }
    this.y = value;
  }
  get Z(): number { return this.z; }
  @Input() set Z(value: number) {
    if (!this.enableZ) { return; }
    this.z = value;
  }

  private x = 0;
  private y = 0;
  private z = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
