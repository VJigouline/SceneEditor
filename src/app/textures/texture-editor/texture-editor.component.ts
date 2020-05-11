import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ThreeSceneService } from '../../three-scene.service';
import { Material } from '../../materials/material';
import { Texture } from '../texture';
import * as THREE from 'three';

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
        if (value.image.width > 250) {
          const f = 250 / value.image.width;
          value.image.width = 250;
          value.image.height *= f;
        }
        this.imagePreview.nativeElement.appendChild(value.image);
      }
    }
  }
  public get hasImage(): boolean { return !!this.texture && !!this.texture.image; }

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
    } else {
      const texture = new THREE.TextureLoader().load(fileUrl);
      if (this.Texture) {
        this.Texture.texture = texture;
      } else {
        this.Texture = Texture.CreateTexture(texture);
      }
    }
    event.target.value = '';
    this.Texture.texture.needsUpdate = true;

    this.changedTexture.emit(this.Texture);
  }
}
