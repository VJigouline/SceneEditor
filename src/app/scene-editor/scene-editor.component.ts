import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Material } from '../material';

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
  private threeView: ElementRef;

  constructor() { }

  ngOnInit() {
    this.OnResize();
  }

  ngAfterViewInit(): void {
    // this.OnResize();
  }

  OnResize(): void {
    if (this.threeView === undefined) {
      return;
    }
    this.ViewHeight = this.threeView.nativeElement.clientHeight;
    this.ViewWidth = this.threeView.nativeElement.clientWidth;
    console.log(`ViewHeight: ${this.ViewHeight}, ViewWidth: ${this.ViewWidth}`);
  }

  onMaterialChange(material: Material) {
    console.log(JSON.stringify(material));
  }
}
