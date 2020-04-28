import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Material } from '../materials/material';
import { SceneViewComponent } from '../scene-view/scene-view.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ThreeSceneService } from '../three-scene.service';
import { ResizedEvent } from 'angular-resize-event';
import { LightsLibraryEditorComponent } from '../lights-library-editor/lights-library-editor.component';
import { MaterialEditorComponent } from '../material-editor/material-editor.component';
import { Light } from '../lights/light';
import { MatTabChangeEvent } from '@angular/material/tabs';

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

  @ViewChild('ThreeJSView')
  private threeView: SceneViewComponent;
  @ViewChild('LightsLibraryEditor')
  private lightsLirbaryEditor: LightsLibraryEditorComponent;
  @ViewChild('MaterialEditor')
  private materialEditor: MaterialEditorComponent;

  constructor(
    private sceneService: ThreeSceneService,
    private elRef: ElementRef
    ) { }

  ngOnInit() {
    this.Width = this.elRef.nativeElement.width;
    this.Height = this.elRef.nativeElement.height;
  }

  public onResized(event: ResizedEvent): void {
    // console.log(`editor OnResize. New width: ${event.newWidth}, new height: ${event.newHeight}`);
    this.Width = event.newWidth;
    this.Height = event.newHeight;
    this.threeView.AreaHeight = event.newHeight;
    this.threeView.setCameraSize(this.threeView.AreaWidth, this.threeView.AreaHeight);
    this.sceneService.renderer.setSize(this.threeView.AreaWidth, this.threeView.AreaHeight - 4);
  }

  ngAfterViewInit(): void {
    this.Width = this.elRef.nativeElement.width;
    this.Height = this.elRef.nativeElement.height;
  }

  onMaterialChange(material: Material) {
    if (!material) { return; }
    this.threeView.SetMaterial(material);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.sceneService.addFiles(files, this.ResetScene.bind(this));
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

  public onSceneChange(op: string) {
    switch (op) {
      case 'new':
          this.threeView.newScene();
          this.threeView.Render();
          break;
      case 'update':
        this.threeView.UpdateScene();
        break;
    }
  }

  public ResetScene(): void {
    this.sceneService.rescaleScene();
    this.threeView.Render();
  }

  public onLightChanged(light: Light): void {
    if (!this.threeView) { return; }
    this.threeView.Render();
  }

  public onSelectedTabChange(event: MatTabChangeEvent): void {
    this.lightsLirbaryEditor.onSelectedTabChange(event.index);
  }
}
