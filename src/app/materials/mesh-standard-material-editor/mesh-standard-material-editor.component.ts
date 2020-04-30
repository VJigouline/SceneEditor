import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeshStandardMaterial } from '../material';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-mesh-standard-material-editor',
  templateUrl: './mesh-standard-material-editor.component.html',
  styleUrls: ['./mesh-standard-material-editor.component.scss']
})
export class MeshStandardMaterialEditorComponent implements OnInit {
  // events
  @Output() materialChange = new EventEmitter<MeshStandardMaterial>();

  // properties
  @Input() Material: MeshStandardMaterial;

  constructor() { }

  ngOnInit(): void {
  }

  public onColourChanged(colour: string): void {
    this.materialChange.emit(this.Material);
  }

  public onEmissiveIntensityChanged(event: MatSliderChange): void {
    this.Material.emissiveIntensity = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.materialChange.emit(this.Material);
  }

  public onMetalnessChanged(event: MatSliderChange): void {
    this.Material.metalness = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.materialChange.emit(this.Material);
  }

  public onRoughnessChanged(event: MatSliderChange): void {
    this.Material.roughness = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.materialChange.emit(this.Material);
  }
}
