import { TextureType } from './texture-type.enum';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';

export class Texture {
    public type: TextureType;

    public get anisotropy(): number { return this.texture.anisotropy; }
    public set anisotropy(value: number) { this.texture.anisotropy = value; }
    public get center(): THREE.Vector2 { return this.texture.center; }
    public set center(value: THREE.Vector2) { this.texture.center = value; }
    public get datatype(): THREE.TextureDataType { return this.texture.type; }
    public set datatype(value: THREE.TextureDataType) { this.texture.type = value; }
    public get format(): THREE.PixelFormat { return this.texture.format; }
    public set format(value: THREE.PixelFormat) { this.texture.format = value; }
    public get image(): HTMLImageElement { return this.texture.image; }
    public set image(value: HTMLImageElement) { this.texture.image = value; }
    public get magFilter(): THREE.TextureFilter { return this.texture.magFilter; }
    public set magFilter(value: THREE.TextureFilter) { this.texture.magFilter = value; }
    public get minFilter(): THREE.TextureFilter { return this.texture.minFilter; }
    public set minFilter(value: THREE.TextureFilter) { this.texture.minFilter = value; }
    public get mapping(): THREE.Mapping { return this.texture.mapping; }
    public set mapping(value: THREE.Mapping) { this.texture.mapping = value; }
    public get name(): string { return this.texture.name; }
    public set name(value: string) { this.texture.name = value; }
    public get offset(): THREE.Vector2 { return this.texture.offset; }
    public set offset(value: THREE.Vector2) { this.texture.offset = value; }
    public get repeat(): THREE.Vector2 { return this.texture.repeat; }
    public set repeat(value: THREE.Vector2) { this.texture.repeat = value; }
    public get rotation(): number { return this.texture.rotation; }
    public set rotation(value: number) { this.texture.rotation = value; }
    public get wrapS(): THREE.Wrapping { return this.texture.wrapS; }
    public set wrapS(value: THREE.Wrapping) {
        if (this.texture.wrapS === value) { return; }
        this.texture.wrapS = value;
        this.texture.needsUpdate = true;
    }
    public get wrapT(): THREE.Wrapping { return this.texture.wrapT; }
    public set wrapT(value: THREE.Wrapping) {
        if (this.texture.wrapT === value) { return; }
        this.texture.wrapT = value;
        this.texture.needsUpdate = true;
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

    public static CreateTexture(texture: THREE.Texture): Texture {

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
        this.image = texture.image;
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
/*
    public toJSON(): MaterialExport {
        switch (this.type) {
            case MaterialType.LINE_BASIC:
            case MaterialType.LINE_DASHED:
            case MaterialType.MESH_BASIC:
            case MaterialType.MESH_DEPTH:
            case MaterialType.MESH_LAMBERT:
            case MaterialType.MESH_MATCAP:
            case MaterialType.MESH_NORMAL:
            case MaterialType.MESH_PHONG:
            case MaterialType.MESH_PHYSICAL:
            case MaterialType.MESH_STANDARD:
                return new MeshStandardMaterialExport(this as unknown as MeshStandardMaterial);
            case MaterialType.MESH_TOON:
            case MaterialType.POINTS:
            case MaterialType.SHADOW:
            case MaterialType.SPRITE:
            default:
                console.error('Unknown material.');
                break;
            }

        return null;
    }
    */
}
