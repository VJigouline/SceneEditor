import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeshDepthMaterial } from '../material';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-mesh-depth-material-editor',
  templateUrl: './mesh-depth-material-editor.component.html',
  styleUrls: ['./mesh-depth-material-editor.component.scss']
})
export class MeshDepthMaterialEditorComponent implements OnInit {
  // events
  @Output() materialChange = new EventEmitter<MeshDepthMaterial>();

  // properties
  @Input() Material: MeshDepthMaterial;

  constructor() { }

  ngOnInit(): void {
  }

  public onBaseMaterialChanged(material: MeshDepthMaterial): void {
    this.materialChange.emit(material);
  }

  public onWireframeChange(event: MatCheckboxChange): void {
    this.Material.wireframe = event.checked;
    this.materialChange.emit(this.Material);
  }

}
