import { Component, Output, EventEmitter } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { Material } from '../material';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent {

  // events
  @Output() materialChange = new EventEmitter<Material>();

  // properties
  sceneJSON: string;
  material = new Material();

  constructor(
     private sceneService: ThreeSceneService
  ) {}

  onSubmit() {
    this.getSceneJSON();
  }

  getSceneJSON(): void {
// this.sceneService.getSceneJSON().subscribe(sceneJSON => this.sceneJSON = sceneJSON);
  }

  onDiffuseColourChanged(colour: string): void {
    this.material.diffuse = colour;
    this.materialChange.emit(this.material);
  }

  onEmissiveColourChanged(colour: string): void {
    this.material.emissive = colour;
    this.materialChange.emit(this.material);
  }

  onSpecularColourChanged(colour: string): void {
    this.material.specular = colour;
    this.materialChange.emit(this.material);
  }

  onShininessChange(event: MatSliderChange) {
    this.material.shininess = event.value;
    this.materialChange.emit(this.material);
  }
}
