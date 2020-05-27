import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ThreeSceneService } from '../../three-scene.service';
import { Material, MeshStandardMaterial, MeshPhongMaterial, MeshLambertMaterial,
  MeshBasicMaterial, MeshPhysicalMaterial } from '../../materials/material';
import { Texture, CubeTexture } from '../texture';
import * as THREE from 'three';
import { MatSelectChange } from '@angular/material/select';
import { Point3 } from '../../geometries/point3';
import { MatSliderChange } from '@angular/material/slider';
import { Vector2 } from '../../geometries/vector2';
import { TextureUsage, TextureType } from '../texture-type.enum';
import { MaterialType } from 'src/app/materials/material-type.enum';
import { Renderer2 } from '@angular/core';
import { CubeMapDialogComponent, CubeMapDialogData } from '../cube-map-dialog/cube-map-dialog.component';
import { MatDialog } from '@angular/material/dialog';

enum EnvironmentMappingType {
  REFLECTION = 0,
  REFRACTRION = 1
}

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
  @Output() changedReflectivity = new EventEmitter<number>();
  @Output() changedRefractionRatio = new EventEmitter<number>();

  // View area size.
  @Input() Material: Material;
  public get Texture(): Texture { return this.texture; }
  @Input() public set Texture(value: Texture) {
    this.texture = value;
    if (this.imagePreview) {
      this.imagePreview.nativeElement.innerHTML = '';
      if (value && value.image) {
        const img = Array.isArray(value.image) ? value.image[0] : value.image;
        this.renderer.setStyle(img, 'max-width', '100%');
        this.imagePreview.nativeElement.appendChild(img as HTMLImageElement);
      }
    }
  }
  @Input() Usage = TextureUsage.TEXTURE;
  public get hasImage(): boolean { return !!this.texture && !!this.texture.image; }
  public get Name(): string { return this.texture.name; }
  public set Name(value: string) { this.texture.name = value; }
  public get hasScale(): boolean { return this.hasImage &&
    (this.Usage === TextureUsage.BUMP_MAP || this.Usage === TextureUsage.NORMAL_MAP ||
      this.Usage === TextureUsage.CLEARCOAT_MAP ||
      (this.Usage === TextureUsage.ENVIRONMENT_MAP && this.Material.type !== MaterialType.MESH_PHONG)); }
  public get hasScale2(): boolean { return this.hasImage && (this.Usage === TextureUsage.NORMAL_MAP ||
    this.Usage === TextureUsage.CLEARCOAT_MAP); }
  public get scaleName(): string {
    if (this.Usage === TextureUsage.ENVIRONMENT_MAP) { return 'Environment map intencity'; }
    return this.hasScale2 ? (this.Usage === TextureUsage.CLEARCOAT_MAP ?
      'Clearcoat map scale U' : 'Normal map scale U') : 'Bump map scale';
  }
  get scale2Name(): string {
    return this.Usage === TextureUsage.CLEARCOAT_MAP ?
      'Clearcoat map scale V' : 'Normal map scale V';
  }
  get scaleMin(): number { return this.Usage === TextureUsage.ENVIRONMENT_MAP ? 0 : -1; }
  get scaleMax(): number { return this.Usage === TextureUsage.ENVIRONMENT_MAP ? 20 : 1; }
  get scaleStep(): number { return this.Usage === TextureUsage.ENVIRONMENT_MAP ? 0.1 : 0.01; }
  public get scaleValue(): number {
    if (this.hasScale) {
      if (this.Usage === TextureUsage.BUMP_MAP) {
        if (this.Material.type === MaterialType.MESH_STANDARD) {
          return (this.Material as undefined as MeshStandardMaterial).bumpScale;
        }
      } else if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
        if (this.Material.type === MaterialType.MESH_STANDARD) {
          return (this.Material as undefined as MeshStandardMaterial).envMapIntensity;
        }
      } else if (this.Usage === TextureUsage.CLEARCOAT_MAP) {
        if (this.Material.type === MaterialType.MESH_PHYSICAL) {
          return (this.Material as undefined as MeshPhysicalMaterial).clearcoatNormalScale.X;
        }
      } else {
        if (this.Material.type === MaterialType.MESH_STANDARD) {
          return (this.Material as undefined as MeshStandardMaterial).normalScale.X;
        }
      }
    }
    return 1;
  }
  public set scaleValue(value: number) {}
  public get scale2Value(): number {
    if (this.hasScale2) {
      if (this.Material.type === MaterialType.MESH_STANDARD) {
        return (this.Material as undefined as MeshStandardMaterial).normalScale.Y;
      } else if (this.Material.type === MaterialType.MESH_PHYSICAL) {
        return (this.Material as undefined as MeshPhysicalMaterial).clearcoatNormalScale.Y;
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
  public get environmentMappingType(): EnvironmentMappingType {
    if (this.Texture && this.Texture.texture) {
      switch (this.Texture.mapping) {
        case THREE.CubeRefractionMapping:
        case THREE.EquirectangularRefractionMapping:
        case THREE.CubeUVRefractionMapping:
          return EnvironmentMappingType.REFRACTRION;
      }
    }
    return EnvironmentMappingType.REFLECTION;
  }
  public set environmentMappingType(value: EnvironmentMappingType) {
    if (value === this.environmentMappingType) { return; }
    if (!this.Texture || !this.Texture.texture) { return; }
    if (this.Texture.type === TextureType.CUBE_TEXTURE) {
      switch (value) {
        case EnvironmentMappingType.REFRACTRION:
          this.Texture.mapping = THREE.CubeRefractionMapping;
          break;
        default:
          this.Texture.mapping = THREE.CubeReflectionMapping;
          break;
      }
    } else {
      switch (value) {
        case EnvironmentMappingType.REFRACTRION:
          this.Texture.mapping = THREE.EquirectangularRefractionMapping;
          break;
        default:
          this.Texture.mapping = THREE.EquirectangularReflectionMapping;
          break;
      }
    }
    this.Texture.texture.needsUpdate = true;
  }

  get hasCombine(): boolean {
    return this.hasImage && this.Usage === TextureUsage.ENVIRONMENT_MAP &&
      (this.Material.type === MaterialType.MESH_PHONG ||
      this.Material.type === MaterialType.MESH_BASIC ||
      this.Material.type === MaterialType.MESH_LAMBERT);
  }
  get combineType(): THREE.Combine {
    if (this.hasCombine) {
      switch (this.Material.type) {
        case MaterialType.MESH_BASIC:
          return (this.Material as unknown as MeshBasicMaterial).combine;
        case MaterialType.MESH_LAMBERT:
          return (this.Material as unknown as MeshLambertMaterial).combine;
        case MaterialType.MESH_PHONG:
          return (this.Material as unknown as MeshPhongMaterial).combine;
      }
    }

    return THREE.MultiplyOperation;
  }
  set combineType(value: THREE.Combine) {
    if (!this.hasImage) { return; }

    switch (this.Material.type) {
      case MaterialType.MESH_BASIC:
        (this.Material as unknown as MeshBasicMaterial).combine = value;
        break;
      case MaterialType.MESH_LAMBERT:
        (this.Material as unknown as MeshLambertMaterial).combine = value;
        break;
      case MaterialType.MESH_PHONG:
        (this.Material as unknown as MeshPhongMaterial).combine = value;
        break;
    }
  }

  get hasReflectivity(): boolean {
    if (!this.hasImage) { return false; }

    if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
      switch (this.Material.type) {
        case MaterialType.MESH_BASIC:
        case MaterialType.MESH_PHONG:
        case MaterialType.MESH_LAMBERT:
          return this.environmentMappingType === EnvironmentMappingType.REFLECTION;
      }
    }

    return false;
  }
  get reflectivity(): number {
    if (!this.hasImage) { return 1; }

    if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
      switch (this.Material.type) {
        case MaterialType.MESH_BASIC:
          return (this.Material as unknown as MeshBasicMaterial).reflectivity;
        case MaterialType.MESH_LAMBERT:
          return (this.Material as unknown as MeshLambertMaterial).reflectivity;
        case MaterialType.MESH_PHONG:
          return (this.Material as unknown as MeshPhongMaterial).reflectivity;
      }
    }

    return 1;
  }
  set reflectivity(value: number) {
    if (!this.hasImage) { return; }

    if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
      switch (this.Material.type) {
        case MaterialType.MESH_BASIC:
          (this.Material as unknown as MeshBasicMaterial).reflectivity = value;
          break;
        case MaterialType.MESH_LAMBERT:
          (this.Material as unknown as MeshLambertMaterial).reflectivity = value;
          break;
        case MaterialType.MESH_PHONG:
          (this.Material as unknown as MeshPhongMaterial).reflectivity = value;
          break;
      }
    }
  }

  get hasRefractionRatio(): boolean {
    if (!this.hasImage) { return false; }

    if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
      switch (this.Material.type) {
        case MaterialType.MESH_BASIC:
        case MaterialType.MESH_LAMBERT:
        case MaterialType.MESH_PHONG:
        case MaterialType.MESH_STANDARD:
          return this.environmentMappingType === EnvironmentMappingType.REFRACTRION;
      }
    }

    return false;
  }
  get refractionRatio(): number {
    if (!this.hasImage) { return 1; }

    if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
      switch (this.Material.type) {
        case MaterialType.MESH_BASIC:
          return (this.Material as unknown as MeshBasicMaterial).refractionRatio;
        case MaterialType.MESH_LAMBERT:
          return (this.Material as unknown as MeshLambertMaterial).refractionRatio;
        case MaterialType.MESH_PHONG:
          return (this.Material as unknown as MeshPhongMaterial).refractionRatio;
        case MaterialType.MESH_STANDARD:
          return (this.Material as unknown as MeshStandardMaterial).refractionRatio;
      }
    }

    return 1;
  }
  set refractionRatio(value: number) {
    if (!this.hasImage) { return; }

    if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
      switch (this.Material.type) {
        case MaterialType.MESH_BASIC:
          (this.Material as unknown as MeshBasicMaterial).refractionRatio = value;
          break;
        case MaterialType.MESH_LAMBERT:
          (this.Material as unknown as MeshLambertMaterial).refractionRatio = value;
          break;
        case MaterialType.MESH_PHONG:
          (this.Material as unknown as MeshPhongMaterial).refractionRatio = value;
          break;
        case MaterialType.MESH_STANDARD:
          (this.Material as unknown as MeshStandardMaterial).refractionRatio = value;
          break;
      }
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

  environmentMappingTypes = [
    { type: EnvironmentMappingType.REFLECTION, name: 'Reflection' },
    { type: EnvironmentMappingType.REFRACTRION, name: 'Refraction' },
  ];

  public combineTypes = [
    { type: THREE.MultiplyOperation, name: 'Multiply' },
    { type: THREE.MixOperation, name: 'Mix' },
    { type: THREE.AddOperation, name: 'Add' }
  ];

  public get Offset(): Point3 { return new Point3(this.Texture.offset.X, this.texture.offset.Y, 0); }
  public set Offset(value: Point3) {
    this.Texture.offset = new Vector2(value.X, value.Y);
  }
  public get Repeat(): Point3 { return new Point3(this.Texture.repeat.X, this.texture.repeat.Y, 0); }
  public set Repeat(value: Point3) {
    this.Texture.repeat = new Vector2(value.X, value.Y);
  }

  get isEnvironmentMap(): boolean { return this.Usage === TextureUsage.ENVIRONMENT_MAP; }

  private texture: Texture;
  private data: CubeMapDialogData = {
    imgNegX: null, imgPosX: null,
    imgNegY: null, imgPosY: null,
    imgNegZ: null, imgPosZ: null
  };

  private images: HTMLImageElement[] = [];

  constructor(
    private sceneService: ThreeSceneService,
    private renderer: Renderer2,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  public onDelete(): void {
    this.changedTexture.emit(null);
  }

  private assignCubeData(): void {
    if (!this.Texture || !this.Texture.texture ||
     this.Texture.type !== TextureType.CUBE_TEXTURE) { return; }

    const ct = this.Texture as CubeTexture;
    const imgs = ct.image as HTMLImageElement[];
    if (!this.data.imgPosX) { this.data.imgPosX = imgs[0]; }
    if (!this.data.imgNegX) { this.data.imgNegX = imgs[1]; }
    if (!this.data.imgPosY) { this.data.imgPosY = imgs[2]; }
    if (!this.data.imgNegY) { this.data.imgNegY = imgs[3]; }
    if (!this.data.imgPosZ) { this.data.imgPosZ = imgs[4]; }
    if (!this.data.imgNegZ) { this.data.imgNegZ = imgs[5]; }
  }

  public onImageImport(event: any): void {
    if (!event) {
      if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
        this.assignCubeData();
        const dialogRef = this.dialog.open(CubeMapDialogComponent, {
          disableClose: true,
          width: '840px',
          data: this.data
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.verifyCubeMapImages(this.data);
            const a = new THREE.CubeTextureLoader().load([
              this.data.imgPosX.src, this.data.imgNegX.src,
              this.data.imgPosY.src, this.data.imgNegY.src,
              this.data.imgPosZ.src, this.data.imgNegZ.src],
              (texture) => {
                texture.minFilter = THREE.LinearFilter;
                texture.magFilter = THREE.LinearFilter;
                this.Texture = Texture.CreateTexture(texture);
                this.changedTexture.emit(this.Texture);
              }
            );
          }
        });
      } else {
        console.error('Invalid event.');
      }
      return;
    }
    const selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);
    if (this.hasImage) {
      if (Array.isArray(this.Texture.texture.image)) {
        for (const img of this.Texture.texture.image) {
          img.src = fileUrl;
        }
      } else {
        this.Texture.texture.image.src = fileUrl;
      }
    } else {
      new THREE.TextureLoader().load(fileUrl,
        (texture) => {
          this.assignTextureDefaults(texture);
          this.Texture = Texture.CreateTexture(texture);
          if (this.Usage === TextureUsage.ENVIRONMENT_MAP) {
            this.Texture.texture.encoding = THREE.sRGBEncoding;
            this.Texture.texture.mapping = THREE.EquirectangularReflectionMapping;
            this.Texture.texture.minFilter = THREE.LinearFilter;
            this.Texture.texture.magFilter = THREE.LinearFilter;
            this.images.push(this.Texture.image as HTMLImageElement);
            (this.Texture.image as HTMLImageElement).onload = () => {
              this.changedTexture.emit(this.Texture);
            };
          }
          this.changedTexture.emit(this.Texture);
        });
    }
    event.target.value = '';
  }

  private assignTextureDefaults(texture: THREE.Texture) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    let t = null;
    if (this.hasImage) {
      t = this.Texture;
    } else if (this.Material) {
      if (this.Material.type === MaterialType.MESH_STANDARD) {
        const ms = this.Material as MeshStandardMaterial;
        t = ms.map;
        if (!t) { t = ms.metalnessMap; }
        if (!t) { t = ms.emissiveMap; }
        if (!t) { t = ms.bumpMap; }
        if (!t) { t = ms.normalMap; }
        if (!t) { t = ms.alphaMap; }
      } else if (this.Material.type === MaterialType.MESH_PHONG) {
        const mph = this.Material as undefined as MeshPhongMaterial;
        t = mph.map;
        if (!t) { t = mph.specularMap; }
        if (!t) { t = mph.emissiveMap; }
        if (!t) { t = mph.bumpMap; }
        if (!t) { t = mph.normalMap; }
        if (!t) { t = mph.alphaMap; }
      } else if (this.Material.type === MaterialType.MESH_BASIC) {
        const mph = this.Material as undefined as MeshBasicMaterial;
        t = mph.map;
        if (!t) { t = mph.specularMap; }
        if (!t) { t = mph.alphaMap; }
      }
    }

    if (t) {
      texture.wrapS = t.wrapS;
      texture.wrapT = t.wrapT;
      texture.offset.set(t.texture.offset.x, t.texture.offset.y);
      texture.repeat.set(t.texture.repeat.x, t.texture.repeat.y);
      texture.rotation = t.rotation;
    }
  }

  private verifyCubeMapImages(data: CubeMapDialogData): void {
    const size = Math.min(
      data.imgNegX.width, data.imgNegX.height,
      data.imgNegY.width, data.imgNegY.height,
      data.imgNegZ.width, data.imgNegZ.height,
      data.imgPosX.width, data.imgPosX.height,
      data.imgPosY.width, data.imgPosY.height,
      data.imgPosZ.width, data.imgPosZ.height
    );

    data.imgNegX = Texture.resizeImage(data.imgNegX, size, size);
    data.imgNegY = Texture.resizeImage(data.imgNegY, size, size);
    data.imgNegZ = Texture.resizeImage(data.imgNegZ, size, size);
    data.imgPosX = Texture.resizeImage(data.imgPosX, size, size);
    data.imgPosY = Texture.resizeImage(data.imgPosY, size, size);
    data.imgPosZ = Texture.resizeImage(data.imgPosZ, size, size);
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
    this.changedTexture.emit(this.Texture);
  }

  onReflectivityChanged(event: MatSliderChange): void {
    this.changedReflectivity.emit(Math.round((event.value + Number.EPSILON) * 100) / 100);
  }

  onRefractionRatioChanged(event: MatSliderChange): void {
    this.changedRefractionRatio.emit(Math.round((event.value + Number.EPSILON) * 100) / 100);
  }

  public onRepeatChange(position: Point3): void {
    this.Texture.repeat = new Vector2(position.X, position.Y);
    this.changedTexture.emit(this.Texture);
  }

  public onRotationChanged(event: MatSliderChange): void {
    this.Texture.rotation = Math.round((event.value + Number.EPSILON) * 100) / 100;
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

  public onEnvironmentMappingChange(change: MatSelectChange): void {
    this.changedTexture.emit(this.Texture);
  }

  public onCombineTypeChange(change: MatSelectChange): void {
    this.changedTexture.emit(this.Texture);
  }
}
