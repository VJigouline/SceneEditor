import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Light } from '../light';

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

}
