import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Material } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';

import * as THREE from 'three';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-base-material-editor',
  templateUrl: './base-material-editor.component.html',
  styleUrls: ['./base-material-editor.component.scss']
})
export class BaseMaterialEditorComponent implements OnInit {
  // events
  @Output() materialChange = new EventEmitter<Material>();

  // properties
  @Input() Material: Material;

  public sideTypes = [
    { type: THREE.FrontSide, name: 'Front' },
    { type: THREE.BackSide, name: 'Back' },
    { type: THREE.DoubleSide, name: 'Both' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  public onTransparentChange(event: MatCheckboxChange): void {
    this.Material.transparent = event.checked;
    this.materialChange.emit(this.Material);
  }

  public onOpacityChanged(event: MatSliderChange): void {
    this.Material.opacity = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.materialChange.emit(this.Material);
  }

  public onVisibleChange(event: MatCheckboxChange): void {
    this.Material.visible = event.checked;
    this.materialChange.emit(this.Material);
  }

  onSideChange(change: MatSelectChange): void {
    this.Material.side = change.value;
    this.materialChange.emit(this.Material);
  }

}
