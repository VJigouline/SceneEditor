import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Light } from '../light';

@Component({
  selector: 'app-ambient-light-editor',
  templateUrl: './ambient-light-editor.component.html',
  styleUrls: ['./ambient-light-editor.component.scss']
})
export class AmbientLightEditorComponent implements OnInit {
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
