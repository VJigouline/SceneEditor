import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';

import * as THREE from 'three';
import { Light } from 'three';

@Component({
  selector: 'app-ambient-light-editor',
  templateUrl: './ambient-light-editor.component.html',
  styleUrls: ['./ambient-light-editor.component.scss']
})
export class AmbientLightEditorComponent implements OnInit {
  // events
  @Output() lightChange = new EventEmitter<THREE.AmbientLight>();

  // properties
  @Input() Light: THREE.AmbientLight;

  get Colour(): string { return '#' + this.Light.color.getHexString(); }
  set Colour(value: string) { this.Light.color = new THREE.Color(value); }

  constructor() { }

  ngOnInit(): void {
  }

  public onColourChanged(colour: string): void {
    this.lightChange.emit(this.Light);
  }

}
