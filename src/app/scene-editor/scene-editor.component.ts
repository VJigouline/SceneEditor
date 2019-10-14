import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Material } from '../material';
import { SceneViewComponent } from '../scene-view/scene-view.component';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ThreeSceneService } from '../three-scene.service';
import { ResizedEvent } from 'angular-resize-event';

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

  constructor(
    private sceneService: ThreeSceneService,
    private elRef: ElementRef
    ) { }

  ngOnInit() {
    this.Width = this.elRef.nativeElement.width;
    this.Height = this.elRef.nativeElement.height;
  }

 private onResized(event: ResizedEvent): void {
  //  console.log(`OnResize. New width: ${event.newWidth}, new height: ${event.newHeight}`);
    this.Width = event.newWidth;
    this.Height = event.newHeight;
  }

  ngAfterViewInit(): void {
    this.Width = this.elRef.nativeElement.width;
    this.Height = this.elRef.nativeElement.height;
  }

  onMaterialChange(material: Material) {
    this.threeView.SetMaterial(material);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.sceneService.addFiles(files);
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
