import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MaterialType } from '../material-type.enum';

@Component({
  selector: 'app-new-material',
  templateUrl: './new-material.component.html',
  styleUrls: ['./new-material.component.scss']
})
export class NewMaterialComponent implements OnInit {
  // events
  @Output() newMaterial = new EventEmitter<MaterialType>();

  // properties
  materialType = MaterialType.MESH_STANDARD;
  public materialTypes = [
    // { type: MaterialType.LINE_BASIC, name: 'Line Basic' },
    // { type: MaterialType.LINE_DASHED, name: 'Line Dashed' },
    { type: MaterialType.MESH_BASIC, name: 'Mesh Basic' },
    { type: MaterialType.MESH_DEPTH, name: 'Mesh Depth' },
    { type: MaterialType.MESH_LAMBERT, name: 'Mesh Lambert' },
    { type: MaterialType.MESH_MATCAP, name: 'Mesh Matcap' },
    { type: MaterialType.MESH_NORMAL, name: 'Mesh Normal' },
    { type: MaterialType.MESH_PHONG, name: 'Mesh Phong' },
    { type: MaterialType.MESH_PHYSICAL, name: 'Mesh Physical' },
    { type: MaterialType.MESH_STANDARD, name: 'Mesh Standard' },
    { type: MaterialType.MESH_TOON, name: 'Mesh Toon' },
    // { type: MaterialType.POINTS, name: 'Mesh Points' },
    // { type: MaterialType.SHADOW, name: 'Shadow' },
    // { type: MaterialType.SPRITE, name: 'Sprite' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  public onNew(): void {
    this.newMaterial.emit(this.materialType);
  }
}
