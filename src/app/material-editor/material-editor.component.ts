import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThreeSceneService } from '../three-scene.service';
import { ColorPickerService, Cmyk } from 'ngx-color-picker';
import { Material } from '../material';
import { MatSliderChange } from '@angular/material/slider';
import { MaterialType } from '../material-type.enum';
import * as THREE from 'three';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent implements OnInit {

  // events
  @Output() materialChange = new EventEmitter<Material>();

  // properties
  sceneJSON: string;
  material = new Material(MaterialType.MESH_STANDARD);

  constructor(
     private sceneService: ThreeSceneService
  ) {}

  ngOnInit(): void {
    this.sceneService.setMaterial(this.material.material);
  }

  onSubmit() {
    this.getSceneJSON();
  }

  getSceneJSON(): void {
// this.sceneService.getSceneJSON().subscribe(sceneJSON => this.sceneJSON = sceneJSON);
  }

  onDiffuseColourChanged(colour: string): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.color = new THREE.Color(colour);
    } else if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color(colour);
    } else {
      console.warn(`Unsupported material type: ${material.type}`);
    }
    this.material.colour = colour;
    this.materialChange.emit(this.material);
  }

  onEmissiveColourChanged(colour: string): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.emissive = new THREE.Color(colour);
    } else if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      mat.emissive = new THREE.Color(colour);
    } else {
      console.warn(`Unsupported material type: ${material.type}`);
    }
    this.materialChange.emit(this.material);
  }

  onSpecularColourChanged(colour: string): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.specular = new THREE.Color(colour);
    } else if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      console.error('Specular colour not supported in THREE.MeshStandardMaterial');
    } else {
      console.warn(`Unsupported material type: ${material.type}`);
    }
    this.materialChange.emit(this.material);
  }

  onShininessChange(event: MatSliderChange): void {
    const material = this.sceneService.getMaterial();
    if (material instanceof THREE.MeshPhongMaterial) {
      const mat = material as THREE.MeshPhongMaterial;
      mat.shininess = event.value;
    } else if (material instanceof THREE.MeshStandardMaterial) {
      const mat = material as THREE.MeshStandardMaterial;
      console.error('Shininess not supported in THREE.MeshStandardMaterial');
    } else {
      console.warn(`Unsupported material type: ${material.type}`);
    }
    this.materialChange.emit(this.material);
  }
}
