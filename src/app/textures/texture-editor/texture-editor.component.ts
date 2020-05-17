import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { ThreeSceneService } from '../../three-scene.service';
import { Material } from '../../materials/material';
import { Texture } from '../texture';
import * as THREE from 'three';
import { MatSelectChange } from '@angular/material/select';
import { Point3 } from '../../geometries/point3';
import { MatSliderChange } from '@angular/material/slider';
import { Vector2 } from '../../geometries/vector2';
import { TextureUsage } from '../texture-type.enum';
import { MeshStandardMaterial } from 'three';
import { MaterialType } from 'src/app/materials/material-type.enum';

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
  @Output() changedScale = new EventEmitter<number>();
  @Output() changedScale2 = new EventEmitter<number>();
  @Output() changedNormalMapType = new EventEmitter<THREE.NormalMapTypes>();

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
        this.imagePreview.nativeElement.appendChild(value.texture.image);
      }
    }
  }
  @Input() Usage = TextureUsage.TEXTURE;
  public get hasImage(): boolean { return !!this.texture && !!this.texture.image; }
  public get Name(): string { return this.texture.name; }
  public set Name(value: string) { this.texture.name = value; }
  public get hasScale(): boolean { return this.hasImage &&
    (this.Usage === TextureUsage.BUMP_MAP || this.Usage === TextureUsage.NORMAL_MAP); }
  public get hasScale2(): boolean { return this.hasImage && this.Usage === TextureUsage.NORMAL_MAP; }
  public get scaleName(): string { return this.hasScale2 ? 'Normal map scale U' : 'Bump map scale'; }
  public get scaleValue(): number {
    if (this.hasScale) {
      if (this.Usage === TextureUsage.BUMP_MAP) {
        if (this.Material.type === MaterialType.MESH_STANDARD) {
          return (this.Material as undefined as MeshStandardMaterial).bumpScale;
        }
      } else {
        if (this.Material.type === MaterialType.MESH_STANDARD) {
          return (this.Material as undefined as MeshStandardMaterial).normalScale.x;
        }
      }
    }
    return 1;
  }
  public set scaleValue(value: number) {}
  public get scale2Value(): number {
    if (this.hasScale2) {
      if (this.Material.type === MaterialType.MESH_STANDARD) {
        return (this.Material as undefined as MeshStandardMaterial).normalScale.y;
      }
    }
    return 1;
  }
  public set scale2Value(value: number) {}
  public get normalMapMapping(): THREE.NormalMapTypes {
    if (this.hasScale2) {
      return (this.Material as undefined as MeshStandardMaterial).normalMapType;
    }

    return THREE.TangentSpaceNormalMap;
  }
  public set normalMapMapping(value: THREE.NormalMapTypes) {
    if (this.hasScale2) {
      (this.Material as undefined as MeshStandardMaterial).normalMapType = value;
      this.changedTexture.emit(this.Texture);
    }
  }

  public wrappingTypes = [
    { type: THREE.RepeatWrapping, name: 'Repeat' },
    { type: THREE.ClampToEdgeWrapping, name: 'Clamp to edges' },
    { type: THREE.MirroredRepeatWrapping, name: 'Mirrored repeat' }
  ];

  public normalMapMappings = [
    { type: THREE.TangentSpaceNormalMap, name: 'Tangent space' },
    { type: THREE.ObjectSpaceNormalMap, name: 'Object space' },
  ];

  public get Offset(): Point3 { return new Point3(this.Texture.offset.X, this.texture.offset.Y, 0); }
  public set Offset(value: Point3) {
    this.Texture.offset = new Vector2(value.X, value.Y);
  }
  public get Repeat(): Point3 { return new Point3(this.Texture.repeat.X, this.texture.repeat.Y, 0); }
  public set Repeat(value: Point3) {
    this.Texture.repeat = new Vector2(value.X, value.Y);
  }

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

  public onDelete(): void {
    this.changedTexture.emit(null);
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
          this.Texture = Texture.CreateTexture(texture);
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

  public onOffsetChange(position: Point3): void {
    this.Texture.offset = new Vector2(position.X, position.Y);
    this.Texture.texture.needsUpdate = true;
    this.changedTexture.emit(this.Texture);
  }

  public onRepeatChange(position: Point3): void {
    this.Texture.repeat = new Vector2(position.X, position.Y);
    this.Texture.texture.needsUpdate = true;
    this.changedTexture.emit(this.Texture);
  }

  public onRotationChanged(event: MatSliderChange): void {
    this.Texture.rotation = Math.round((event.value + Number.EPSILON) * 100) / 100;
    this.Texture.texture.needsUpdate = true;
    this.changedTexture.emit(this.Texture);
  }

  public onScaleChanged(event: MatSliderChange): void {
    this.changedScale.emit(Math.round((event.value + Number.EPSILON) * 100) / 100);
  }

  public onScale2Changed(event: MatSliderChange): void {
    this.changedScale2.emit(Math.round((event.value + Number.EPSILON) * 100) / 100);
  }

  public onNormalMapMappingChange(change: MatSelectChange): void {
    this.changedNormalMapType.emit(change.value);
    this.changedTexture.emit(this.Texture);
  }
}
