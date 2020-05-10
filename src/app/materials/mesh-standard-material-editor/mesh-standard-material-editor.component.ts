import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MeshStandardMaterial } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { TextureEditorComponent } from 'src/app/textures/texture-editor/texture-editor.component';

@Component({
  selector: 'app-mesh-standard-material-editor',
  templateUrl: './mesh-standard-material-editor.component.html',
  styleUrls: ['./mesh-standard-material-editor.component.scss']
})
export class MeshStandardMaterialEditorComponent implements OnInit {

  @ViewChild('TextureEditor')
  private textureEditor: TextureEditorComponent;

  // events
  @Output() materialChange = new EventEmitter<MeshStandardMaterial>();

  // properties
  @Input() Material: MeshStandardMaterial;

  constructor() { }

  ngOnInit(): void {
  }

  private updateMaterial(material: MeshStandardMaterial): void {
    this.materialChange.emit(material);
    this.textureEditor.Render();
  }

  public onBaseMaterialChanged(material: MeshStandardMaterial): void {
    this.updateMaterial(material);
  }

  public onColourChanged(colour: string): void {
    this.updateMaterial(this.Material);
  }

  public onEmissiveIntensityChanged(event: MatSliderChange): void {
    this.Material.emissiveIntensity = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onMetalnessChanged(event: MatSliderChange): void {
    this.Material.metalness = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onRoughnessChanged(event: MatSliderChange): void {
    this.Material.roughness = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.updateMaterial(this.Material);
  }

  public onWireframeChange(event: MatCheckboxChange): void {
    this.Material.wireframe = event.checked;
    this.updateMaterial(this.Material);
  }

  public onWireframeLinewidthChanged(event: MatSliderChange): void {
    this.Material.wireframeLinewidth = Math.round(event.value + Number.EPSILON);
    this.updateMaterial(this.Material);
  }
}
