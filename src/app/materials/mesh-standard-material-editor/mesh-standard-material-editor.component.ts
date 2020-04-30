import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MeshStandardMaterial } from '../material';

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
}
