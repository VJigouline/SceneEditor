import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Material } from '../material';
import { SceneViewComponent } from '../scene-view/scene-view.component';

@Component({
  selector: 'app-scene-editor',
  templateUrl: './scene-editor.component.html',
  styleUrls: ['./scene-editor.component.scss']
})
export class SceneEditorComponent implements OnInit, AfterViewInit {

  @Input() Width: number;
  @Input() Height: number;

  ViewHeight = 100;
  ViewWidth = 100;

  @ViewChild('ThreeJSView', { static: false })
  private threeView: SceneViewComponent;

  constructor() { }

  ngOnInit() {
 }

  ngAfterViewInit(): void {
    // this.OnResize();
  }

  onMaterialChange(material: Material) {
    this.threeView.SetMaterial(material);
  }
}
