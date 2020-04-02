import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LightType } from '../light-type.enum';

@Component({
  selector: 'app-new-light',
  templateUrl: './new-light.component.html',
  styleUrls: ['./new-light.component.scss']
})
export class NewLightComponent implements OnInit {
  // events
  @Output() newLight = new EventEmitter<LightType>();

  // properties
  lightType = LightType.DIRECTIONAL;
  public lightTypes = [
    { type: LightType.AMBIENT, name: 'Ambient' },
    { type: LightType.DIRECTIONAL, name: 'Directional' },
    { type: LightType.SPOT, name: 'Spotlight' },
    { type: LightType.POINT, name: 'Point' },
    { type: LightType.HEMISPHERE, name: 'Hemisphere' },
    { type: LightType.RECT_AREA, name: 'Rectangular area' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  public onNew(): void {
    this.newLight.emit(this.lightType);
  }
}
