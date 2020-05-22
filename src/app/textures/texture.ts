import { TextureType } from './texture-type.enum';
import { Vector2 } from '../geometries/vector2';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';

export class TextureExport {
    private type: TextureType;

    private anisotropy: number;
    private center: Vector2;
    private datatype: THREE.TextureDataType;
    private format: THREE.PixelFormat;
    private image: string;
    private magFilter: THREE.TextureFilter;
    private minFilter: THREE.TextureFilter;
    private mapping: THREE.Mapping;
    private name: string;
    private offset: Vector2;
    private repeat: Vector2;
    private rotation: number;
    private wrapS: THREE.Wrapping;
    private wrapT: THREE.Wrapping;

    constructor(texture: Texture) {
        this.type = texture.type;
        this.anisotropy = texture.anisotropy;
        this.center = texture.center;
        this.datatype = texture.datatype;
        this.format = texture.format;
        this.image = Texture.img2base64(texture.image as HTMLImageElement);
        this.magFilter = texture.magFilter;
        this.minFilter = texture.minFilter;
        this.mapping = texture.mapping;
        this.name = texture.name;
        this.offset = texture.offset;
        this.repeat = texture.repeat;
        this.rotation = texture.rotation;
        this.wrapS = texture.wrapS;
        this.wrapT = texture.wrapT;
    }
}

export class Texture {
    public type: TextureType;

    public get anisotropy(): number { return this.texture.anisotropy; }
    public set anisotropy(value: number) { this.texture.anisotropy = value; }
    public get center(): Vector2 { return new Vector2(this.texture.center.x, this.texture.center.y); }
    public set center(value: Vector2) { this.texture.center.set(value.X, value.Y); }
    public get datatype(): THREE.TextureDataType { return this.texture.type; }
    public set datatype(value: THREE.TextureDataType) { this.texture.type = value; }
    public get format(): THREE.PixelFormat { return this.texture.format; }
    public set format(value: THREE.PixelFormat) { this.texture.format = value; }
    public get image(): HTMLImageElement | string { return this.texture.image; }
    public set image(value: HTMLImageElement | string) { this.texture.image = Texture.string2Image(value); }
    public get magFilter(): THREE.TextureFilter { return this.texture.magFilter; }
    public set magFilter(value: THREE.TextureFilter) { this.texture.magFilter = value; }
    public get minFilter(): THREE.TextureFilter { return this.texture.minFilter; }
    public set minFilter(value: THREE.TextureFilter) { this.texture.minFilter = value; }
    public get mapping(): THREE.Mapping { return this.texture.mapping; }
    public set mapping(value: THREE.Mapping) { this.texture.mapping = value; }
    public get name(): string { return this.texture.name; }
    public set name(value: string) { this.texture.name = value; }
    public get offset(): Vector2 { return new Vector2(this.texture.offset.x, this.texture.offset.y); }
    public set offset(value: Vector2) { this.texture.offset.set(value.X, value.Y); }
    public get repeat(): Vector2 { return  new Vector2(this.texture.repeat.x, this.texture.repeat.y); }
    public set repeat(value: Vector2) { this.texture.repeat.set(value.X, value.Y); }
    public get rotation(): number { return this.texture.rotation; }
    public set rotation(value: number) { this.texture.rotation = value; }
    public get wrapS(): THREE.Wrapping { return this.texture.wrapS; }
    public set wrapS(value: THREE.Wrapping) {
        if (this.texture.wrapS === value) { return; }
        this.texture.wrapS = value;
    }
    public get wrapT(): THREE.Wrapping { return this.texture.wrapT; }
    public set wrapT(value: THREE.Wrapping) {
        if (this.texture.wrapT === value) { return; }
        this.texture.wrapT = value;
    }

    // ThreeJS texture
    public texture: THREE.Texture;

    constructor(type: TextureType) {
        this.type = type;
        switch (this.type) {
        case TextureType.TEXTURE:
            this.texture = new THREE.Texture();
            break;
        default:
            console.error('Invalid texture type.');
            break;
        }

        this.name = uuid();
    }

    public static string2Image(img: string | HTMLImageElement): HTMLImageElement {
        if (!img) { return null; }
        if (img instanceof HTMLImageElement) { return img as HTMLImageElement; }

        const ret = document.createElement('img') as HTMLImageElement;
        ret.src = img;

        return ret;
    }

    public static img2base64(img: HTMLImageElement): string {
        if (!img) { return null; }

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        return canvas.toDataURL();
    }

    public static cloneTexture(texture: Texture): Texture {
        if (!texture) { return null; }

        if (!texture.clone) {
            const t = new Texture(TextureType.TEXTURE);
            texture.clone = t.clone.bind(texture);
        }

        return texture.clone();
    }

    public static resizeImage(img: HTMLImageElement, width?: number, height?: number): HTMLImageElement {
        if (!img) { return null; }
        if (!width) { width = img.width; }
        if (!height) { height = img.height; }
        if (img.naturalHeight === height && img.naturalWidth === width) { return img; }

        img.width = width;
        img.height = height;

        return this.string2Image(this.img2base64(img));
    }

    public static CreateTexture(texture: THREE.Texture): Texture {

        if (!texture) { return null; }
        let ret: Texture;

        if (texture instanceof THREE.Texture) {
            ret = new Texture(TextureType.TEXTURE);
        } else {
            console.error('Unknown texture.');
            ret = new Texture(TextureType.TEXTURE);
        }

        if (ret) {
            ret.texture = texture;
            if (texture && texture.name && texture.name.length > 0) {
                ret.name = texture.name;
            }
        }

        return ret;
    }

    public copy(texture: Texture): void {
        this.anisotropy = texture.anisotropy;
        this.center = texture.center;
        this.datatype = texture.datatype;
        this.format = texture.format;
        if (texture.image instanceof HTMLImageElement) {
            this.image = Texture.string2Image(Texture.img2base64(texture.image as HTMLImageElement));
        } else {
            this.image = texture.image;
        }
        this.magFilter = texture.magFilter;
        this.minFilter = texture.minFilter;
        this.mapping = texture.mapping;
        this.name = texture.name;
        this.offset = texture.offset;
        this.repeat = texture.repeat;
        this.rotation = texture.rotation;
        this.wrapS = texture.wrapS;
        this.wrapT = texture.wrapT;
    }

    public clone(): Texture {
        switch (this.type) {
        case TextureType.TEXTURE:
            const ret = new Texture(TextureType.TEXTURE);
            ret.copy(this);
            return ret;
        // case MaterialType.LINE_DASHED:
          //  return (this as unknown as LineDashedMaterial).clone();
        default:
            console.error('Unknown texture.');
            break;
        }

        return null;
    }

    public toJSON(): TextureExport {
        switch (this.type) {
            case TextureType.TEXTURE:
                return new TextureExport(this as unknown as Texture);
            default:
                console.error('Unknown texture.');
                break;
            }

        return null;
    }
}
