import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ThreeSceneService } from '../../three-scene.service';
import { Material } from '../../materials/material';
import { Texture } from '../texture';
import * as THREE from 'three';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-texture-editor',
  templateUrl: './texture-editor.component.html',
  styleUrls: ['./texture-editor.component.scss']
})
export class TextureEditorComponent implements OnInit {
  @ViewChild('imagePreview', { static: true })
  imagePreview: ElementRef<HTMLDivElement>;

  // events
  @Output() changedTexture = new EventEmitter<Texture>();

  // View area size.
  @Input() Material: Material;
  public get Texture(): Texture { return this.texture; }
  @Input() public set Texture(value: Texture) {
    this.texture = value;
    if (this.imagePreview) {
      this.imagePreview.nativeElement.innerHTML = '';
      if (value && value.image) {
        // if (value.image.width > 250) {
        //   const f = 250 / value.image.width;
        //   value.image.width = 250;
        //   value.image.height *= f;
        // }
        this.imagePreview.nativeElement.appendChild(value.image);
      }
    }
  }
  public get hasImage(): boolean { return !!this.texture && !!this.texture.image; }
  public get Name(): string { return this.texture.name; }
  public set Name(value: string) { this.texture.name = value; }

  public wrappingTypes = [
    { type: THREE.RepeatWrapping, name: 'Repeat' },
    { type: THREE.ClampToEdgeWrapping, name: 'Clamp to edges' },
    { type: THREE.MirroredRepeatWrapping, name: 'Mirrored repeat' }
  ];

  private texture: Texture;

  constructor(
    private sceneService: ThreeSceneService
  ) { }

  ngOnInit(): void {
  }

  onResized(event: ResizedEvent): void {
    console.log(`OnResize. New width: ${event.newWidth}, new height: ${event.newHeight}`);
    // this.AreaWidth = event.newWidth;
    // this.sceneService.renderer.setSize(this.AreaWidth, this.AreaHeight - 4);
    // this.setCameraSize(this.AreaWidth, this.AreaHeight);
    // this.Render();
  }

  public onImageImport(event: any): void {
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    if (this.hasImage) {
      this.Texture.texture.image.src = fileUrl;
      this.Texture.texture.needsUpdate = true;
      this.changedTexture.emit(this.Texture);
    } else {
      new THREE.TextureLoader().load(fileUrl,
        (texture) => {
          if (this.Texture) {
            this.Texture.texture = texture;
          } else {
            this.Texture = Texture.CreateTexture(texture);
          }
          this.Texture.texture.needsUpdate = true;
          this.changedTexture.emit(this.Texture);
        });
    }
    event.target.value = '';
  }

  public onWrapUChange(change: MatSelectChange): void {
    this.Texture.wrapS = change.value;
    this.changedTexture.emit(this.Texture);
  }

  public onWrapVChange(change: MatSelectChange): void {
    this.Texture.wrapT = change.value;
    this.changedTexture.emit(this.Texture);
  }
}
