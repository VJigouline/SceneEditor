import { MaterialType } from './material-type.enum';
import { Texture, TextureExport } from '../textures/texture';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';
import { Vector2 } from '../geometries/vector2';

export class MaterialExport {
    private type: MaterialType;

    private alphaTest: number;
    private blendDst: number;
    private blendDstAlpha: number;
    private blendEquation: THREE.BlendingEquation;
    private blendEquationAlpha: number;
    private blending: THREE.Blending;
    private blendSrc: THREE.BlendingDstFactor | THREE.BlendingSrcFactor;
    private blendSrcAlpha: number;
    private clipShadows: boolean;
    private colourWrite: boolean;
    private depthFunc: THREE.DepthModes;
    private depthTest: boolean;
    private depthWrite: boolean;
    private stencilWrite: boolean;
    private flatShading: boolean;
    private fog: boolean;
    private name: string;
    private opacity: number;
    private side: THREE.Side;
    private toneMapped: boolean;
    private transparent: boolean;

    constructor(material: Material) {
        this.type = material.type;
        this.alphaTest = material.alphaTest;
        this.blendDst = material.blendDst;
        this.blendDstAlpha = material.blendDstAlpha;
        this.blendEquation = material.blendEquation;
        this.blendEquationAlpha = material.blendEquationAlpha;
        this.blending = material.blending;
        this.blendSrc = material.blendSrc;
        this.blendSrcAlpha = material.blendSrcAlpha;
        this.clipShadows = material.clipShadows;
        this.colourWrite = material.colourWrite;
        this.depthFunc = material.depthFunc;
        this.depthTest = material.depthTest;
        this.depthWrite = material.depthWrite;
        this.stencilWrite = material.stencilWrite;
        this.flatShading = material.flatShading;
        this.fog = material.fog;
        this.name = material.name;
        this.opacity = material.opacity;
        this.side = material.side;
        this.toneMapped = material.toneMapped;
        this.transparent = material.transparent;
    }
}

export class MeshBasicMaterialExport extends MaterialExport {
    private alphaMap: TextureExport;
    private aoMap: TextureExport;
    private aoMapIntensity: number;
    private colour: string;
    private combine: THREE.Combine;
    private envMap: TextureExport;
    private map: TextureExport;
    private morphTargets: boolean;
    private reflectivity: number;
    private refractionRatio: number;
    private skinning: boolean;
    private specularMap: TextureExport;
    private vertexTangents: boolean;
    private wireframe: boolean;
    private wireframeLinecap: string;
    private wireframeLinejoin: string;
    private wireframeLinewidth: number;

    constructor(material: MeshBasicMaterial) {
        super(material);
        if (material.alphaMap) { this.alphaMap = material.alphaMap.toJSON(); }
        if (material.aoMap) { this.aoMap = material.aoMap.toJSON(); }
        this.aoMapIntensity = material.aoMapIntensity;
        this.colour = material.colour;
        this.combine = material.combine;
        if (material.envMap) { this.envMap = material.envMap.toJSON(); }
        if (material.map) { this.map = material.map.toJSON(); }
        this.morphTargets = material.morphTargets;
        this.reflectivity = material.reflectivity;
        this.refractionRatio = material.refractionRatio;
        this.skinning = material.skinning;
        if (material.specularMap) { this.specularMap = material.specularMap.toJSON(); }
        this.wireframe = material.wireframe;
        this.wireframeLinecap = material.wireframeLinecap;
        this.wireframeLinejoin = material.wireframeLinejoin;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }
}

export class MeshStandardMaterialExport extends MaterialExport {
    private alphaMap: TextureExport;
    private aoMap: TextureExport;
    private aoMapIntensity: number;
    private bumpMap: TextureExport;
    private bumpScale: number;
    private colour: string;
    private displacementMap: TextureExport;
    private displacementScale: number;
    private displacementBias: number;
    private emissive: string;
    private emissiveMap: TextureExport;
    private emissiveIntensity: number;
    private envMap: TextureExport;
    private envMapIntensity: number;
    private lightMap: TextureExport;
    private lightMapIntensity: number;
    private map: TextureExport;
    private metalness: number;
    private metalnessMap: TextureExport;
    private morphNormals: boolean;
    private morphTargets: boolean;
    private normalMap: TextureExport;
    private normalMapType: THREE.NormalMapTypes;
    private normalScale: THREE.Vector2;
    private refractionRatio: number;
    private roughness: number;
//    private roughnessMap: TextureExport;
    private skinning: boolean;
    private vertexTangents: boolean;
    private wireframe: boolean;
    private wireframeLinewidth: number;

    constructor(material: MeshStandardMaterial) {
        super(material);
        if (material.alphaMap) { this.alphaMap = material.alphaMap.toJSON(); }
        if (material.aoMap) { this.aoMap = material.aoMap.toJSON(); }
        this.aoMapIntensity = material.aoMapIntensity;
        if (material.bumpMap) { this.bumpMap = material.bumpMap.toJSON(); }
        this.bumpScale = material.bumpScale;
        this.colour = material.colour;
        if (material.displacementMap) { this.displacementMap = material.displacementMap.toJSON(); }
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.emissive = material.emissive;
        if (material.emissiveMap) { this.emissiveMap = material.emissiveMap.toJSON(); }
        this.emissiveIntensity = material.emissiveIntensity;
        if (material.envMap) { this.envMap = material.envMap.toJSON(); }
        this.envMapIntensity = material.envMapIntensity;
        if (material.lightMap) { this.lightMap = material.lightMap.toJSON(); }
        this.lightMapIntensity = material.lightMapIntensity;
        if (material.map) { this.map = material.map.toJSON(); }
        this.metalness = material.metalness;
        if (material.metalnessMap) { this.metalnessMap = material.metalnessMap.toJSON(); }
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        if (material.normalMap) { this.normalMap = material.normalMap.toJSON(); }
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.refractionRatio = material.refractionRatio;
//        this.roughness = material.roughness;
//        if (material.roughnessMap) { this.roughnessMap = material.roughnessMap.toJSON(); }
        this.skinning = material.skinning;
        this.vertexTangents = material.vertexTangents;
        this.wireframe = material.wireframe;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }
}

export class MeshPhysicalMaterialExport extends MeshStandardMaterialExport {
    private clearcoat: number;
//    private clearcoatNormalMap: TextureExport;
    private clearcoatNormalScale: Vector2;
    private clearcoatRoughness: number;
    private reflectivity: number;

    constructor(material: MeshPhysicalMaterial) {
        super(material);

        this.clearcoat = material.clearcoat;
//        if (material.clearcoatNormalMap) {
//            this.clearcoatNormalMap = material.clearcoatNormalMap.toJSON();
//        }
        this.clearcoatNormalScale = material.clearcoatNormalScale.clone();
        this.clearcoatRoughness = material.clearcoatRoughness;
        this.reflectivity = material.reflectivity;
    }
}

export class MeshPhongMaterialExport extends MaterialExport {
    private alphaMap: TextureExport;
    private aoMap: TextureExport;
    private aoMapIntensity: number;
    private bumpMap: TextureExport;
    private bumpScale: number;
    private colour: string;
    private combine: THREE.Combine;
    private displacementMap: TextureExport;
    private displacementScale: number;
    private displacementBias: number;
    private emissive: string;
    private emissiveMap: TextureExport;
    private emissiveIntensity: number;
    private envMap: TextureExport;
    private lightMap: TextureExport;
    private lightMapIntensity: number;
    private map: TextureExport;
    private morphNormals: boolean;
    private morphTargets: boolean;
    private normalMap: TextureExport;
    private normalMapType: THREE.NormalMapTypes;
    private normalScale: THREE.Vector2;
    private reflectivity: number;
    private refractionRatio: number;
    private shininess: number;
    private skinning: boolean;
    private specular: string;
    private specularMap: TextureExport;
    private vertexTangents: boolean;
    private wireframe: boolean;
    private wireframeLinecap: string;
    private wireframeLinejoin: string;
    private wireframeLinewidth: number;

    constructor(material: MeshPhongMaterial) {
        super(material);
        if (material.alphaMap) { this.alphaMap = material.alphaMap.toJSON(); }
        if (material.aoMap) { this.aoMap = material.aoMap.toJSON(); }
        this.aoMapIntensity = material.aoMapIntensity;
        if (material.bumpMap) { this.bumpMap = material.bumpMap.toJSON(); }
        this.bumpScale = material.bumpScale;
        this.colour = material.colour;
        this.combine = material.combine;
        if (material.displacementMap) { this.displacementMap = material.displacementMap.toJSON(); }
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.emissive = material.emissive;
        if (material.emissiveMap) { this.emissiveMap = material.emissiveMap.toJSON(); }
        this.emissiveIntensity = material.emissiveIntensity;
        if (material.envMap) { this.envMap = material.envMap.toJSON(); }
        if (material.lightMap) { this.lightMap = material.lightMap.toJSON(); }
        this.lightMapIntensity = material.lightMapIntensity;
        if (material.map) { this.map = material.map.toJSON(); }
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        if (material.normalMap) { this.normalMap = material.normalMap.toJSON(); }
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.reflectivity = material.reflectivity;
        this.refractionRatio = material.refractionRatio;
        this.shininess = material.shininess;
        this.skinning = material.skinning;
        this.specular = material.specular;
        if (material.specularMap) { this.specularMap = material.specularMap.toJSON(); }
        this.wireframe = material.wireframe;
        this.wireframeLinecap = material.wireframeLinecap;
        this.wireframeLinejoin = material.wireframeLinejoin;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }
}

export class Material {
    // properties
    public type: MaterialType;

    public get alphaTest(): number { return this.material.alphaTest; }
    public set alphaTest(value: number) { this.material.alphaTest = value; }
    public get blendDst(): number { return this.material.blendDst; }
    public set blendDst(value: number) { this.material.blendDst = value; }
    public get blendDstAlpha(): number { return this.material.blendDstAlpha; }
    public set blendDstAlpha(value: number) { this.material.blendDstAlpha = value; }
    public get blendEquation(): THREE.BlendingEquation { return this.material.blendEquation; }
    public set blendEquation(value: THREE.BlendingEquation) { this.material.blendEquation = value; }
    public get blendEquationAlpha(): number { return this.material.blendEquationAlpha; }
    public set blendEquationAlpha(value: number) { this.material.blendEquationAlpha = value; }
    public get blending(): THREE.Blending { return this.material.blending; }
    public set blending(value: THREE.Blending) { this.material.blending = value; }
    public get blendSrc(): THREE.BlendingDstFactor | THREE.BlendingSrcFactor { return this.material.blendSrc; }
    public set blendSrc(value: THREE.BlendingDstFactor | THREE.BlendingSrcFactor) { this.material.blendSrc = value; }
    public get blendSrcAlpha(): number { return this.material.blendSrcAlpha; }
    public set blendSrcAlpha(value: number) { this.material.blendSrcAlpha = value; }
    public get clipIntersection(): boolean { return this.material.clipIntersection; }
    public set clipIntersection(value: boolean) { this.material.clipIntersection = value; }
    public get clippingPlanes(): THREE.Plane[] { return this.material.clippingPlanes; }
    public set clippingPlanes(value: THREE.Plane[]) { this.material.clippingPlanes = value; }
    public get clipShadows(): boolean { return this.material.clipShadows; }
    public set clipShadows(value: boolean) { this.material.clipShadows = value; }
    public get colourWrite(): boolean { return this.material.colorWrite; }
    public set colourWrite(value: boolean) { this.material.colorWrite = value; }
    public get depthFunc(): THREE.DepthModes { return this.material.depthFunc; }
    public set depthFunc(value: THREE.DepthModes) { this.material.depthFunc = value; }
    public get depthTest(): boolean { return this.material.depthTest; }
    public set depthTest(value: boolean) { this.material.depthTest = value; }
    public get depthWrite(): boolean { return this.material.depthWrite; }
    public set depthWrite(value: boolean) { this.material.depthWrite = value; }
    public get stencilWrite(): boolean { return this.material.stencilWrite; }
    public set stencilWrite(value: boolean) { this.material.stencilWrite = value; }
    public get flatShading(): boolean { return this.material.flatShading; }
    public set flatShading(value: boolean) { this.material.flatShading = value; }
    public get fog(): boolean { return this.material.fog; }
    public set fog(value: boolean) { this.material.fog = value; }
    public get name(): string { return this.material.name; }
    public set name(value: string) { this.material.name = value; }
    public get opacity(): number { return this.material.opacity; }
    public set opacity(value: number) { this.material.opacity = value; }
    public get polygonOffset(): boolean { return this.material.polygonOffset; }
    public set polygonOffset(value: boolean) { this.material.polygonOffset = value; }
    public get polygonOffsetFactor(): number { return this.material.polygonOffsetFactor; }
    public set polygonOffsetFactor(value: number) { this.material.polygonOffsetFactor = value; }
    public get polygonOffsetUnits(): number { return this.material.polygonOffsetUnits; }
    public set polygonOffsetUnits(value: number) { this.material.polygonOffsetUnits = value; }
    public get premultipliedAlpha(): boolean { return this.material.premultipliedAlpha; }
    public set premultipliedAlpha(value: boolean) { this.material.premultipliedAlpha = value; }
    public get dithering(): boolean { return this.material.dithering; }
    public set dithering(value: boolean) { this.material.dithering = value; }
    public get side(): THREE.Side { return this.material.side; }
    public set side(value: THREE.Side) { this.material.side = value; }
    public get toneMapped(): boolean { return this.material.toneMapped; }
    public set toneMapped(value: boolean) { this.material.toneMapped = value; }
    public get transparent(): boolean { return this.material.transparent; }
    public set transparent(value: boolean) { this.material.transparent = value; }
    public get vertexColors(): THREE.Colors { return this.material.vertexColors; }
    public set vertexColors(value: THREE.Colors) { this.material.vertexColors = value; }
    public get visible(): boolean { return this.material.visible; }
    public set visible(value: boolean) { this.material.visible = value; }

    // ThreeJS material
    public material: THREE.Material;

    constructor(type: MaterialType) {
        this.type = type;
        switch (this.type) {
        case MaterialType.LINE_BASIC:
            this.material = new THREE.LineBasicMaterial();
            break;
        case MaterialType.LINE_DASHED:
            this.material = new THREE.LineDashedMaterial();
            break;
        case MaterialType.MESH_BASIC:
            this.material = new THREE.MeshBasicMaterial();
            break;
        case MaterialType.MESH_DEPTH:
            this.material = new THREE.MeshDepthMaterial();
            break;
        case MaterialType.MESH_LAMBERT:
            this.material = new THREE.MeshLambertMaterial();
            break;
        case MaterialType.MESH_MATCAP:
            this.material = new THREE.MeshMatcapMaterial();
            break;
        case MaterialType.MESH_NORMAL:
            this.material = new THREE.MeshNormalMaterial();
            break;
        case MaterialType.MESH_PHYSICAL:
            this.material = new THREE.MeshPhysicalMaterial(null);
            break;
        case MaterialType.MESH_PHONG:
            this.material = new THREE.MeshPhongMaterial();
            break;
        case MaterialType.MESH_STANDARD:
            this.material = new THREE.MeshStandardMaterial();
            break;
        case MaterialType.MESH_TOON:
            this.material = new THREE.MeshToonMaterial();
            break;
        case MaterialType.POINTS:
            this.material = new THREE.PointsMaterial();
            break;
        case MaterialType.SHADOW:
            this.material = new THREE.ShadowMaterial();
            break;
        case MaterialType.SPRITE:
            this.material = new THREE.SpriteMaterial();
            break;
        default:
            console.error('Invalid material type.');
            break;
        }

        this.name = uuid();
    }

    public static CreateMaterial(material: THREE.Material): Material {

        let ret: Material;

        switch (material.type) {
        case 'LineBasicMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new LineBasicMaterial();
            break;
        case 'LineDashedMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new LineDashedMaterial();
            break;
        case 'MeshBasicMaterial':
            // tslint:disable-next-line: no-use-before-declare
            return MeshBasicMaterial.fromMaterial(material as THREE.MeshBasicMaterial);
        case 'MeshDepthMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new MeshDepthMaterial();
            break;
        case 'MeshLambertMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new MeshLambertMaterial();
            break;
        case 'MeshMatcapMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new MeshMatcapMaterial();
            break;
        case 'MeshNormalMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new MeshNormalMaterial();
            break;
        case 'MeshPhongMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new MeshPhongMaterial();
            break;
        case 'MeshPhysicalMaterial':
            // tslint:disable-next-line: no-use-before-declare
            return MeshPhysicalMaterial.fromMaterial(material as THREE.MeshPhysicalMaterial);
        case 'MeshStandardMaterial':
            // tslint:disable-next-line: no-use-before-declare
            return MeshStandardMaterial.fromMaterial(material as THREE.MeshStandardMaterial);
        case 'MeshToonMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new MeshToonMaterial();
            break;
        case 'PointsMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new PointsMaterial();
            break;
        case 'ShadowMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new ShadowMaterial();
            break;
        case 'SpriteMaterial':
            // tslint:disable-next-line: no-use-before-declare
            ret = new SpriteMaterial();
            break;
        default:
            console.error('Unknown material.');
            // tslint:disable-next-line: no-use-before-declare
            ret = new MeshStandardMaterial();
            break;
        }

        if (ret) {
            ret.material = material;
            if (material && material.name && material.name.length > 0) {
                ret.name = material.name;
            }
        }

        return ret;
    }

    public copy(material: Material): void {
        this.alphaTest = material.alphaTest;
        this.blendDst = material.blendDst;
        this.blendDstAlpha = material.blendDstAlpha;
        this.blendEquation = material.blendEquation;
        this.blendEquationAlpha = material.blendEquationAlpha;
        this.blending = material.blending;
        this.blendSrc = material.blendSrc;
        this.blendSrcAlpha = material.blendSrcAlpha;
        this.clipIntersection = material.clipIntersection;
        this.clippingPlanes = material.clippingPlanes;
        this.clipShadows = material.clipShadows;
        this.colourWrite = material.colourWrite;
        this.depthFunc = material.depthFunc;
        this.depthTest = material.depthTest;
        this.depthWrite = material.depthWrite;
        this.stencilWrite = material.stencilWrite;
        this.flatShading = material.flatShading;
        this.fog = material.fog;
        this.name = material.name;
        this.opacity = material.opacity;
        this.polygonOffset = material.polygonOffset;
        this.polygonOffsetFactor = material.polygonOffsetFactor;
        this.polygonOffsetUnits = material.polygonOffsetUnits;
        this.premultipliedAlpha = material.premultipliedAlpha;
        this.dithering = material.dithering;
        this.side = material.side;
        this.toneMapped = material.toneMapped;
        this.transparent = material.transparent;
        this.vertexColors = material.vertexColors;
        this.visible = material.visible;
    }

    public clone(): Material {
        switch (this.type) {
        case MaterialType.LINE_BASIC:
            return (this as unknown as LineBasicMaterial).clone();
        case MaterialType.LINE_DASHED:
            return (this as unknown as LineDashedMaterial).clone();
        case MaterialType.MESH_BASIC:
            return (this as unknown as MeshBasicMaterial).clone();
        case MaterialType.MESH_DEPTH:
            return (this as unknown as MeshDepthMaterial).clone();
        case MaterialType.MESH_LAMBERT:
            return (this as unknown as MeshLambertMaterial).clone();
        case MaterialType.MESH_MATCAP:
            return (this as unknown as MeshMatcapMaterial).clone();
        case MaterialType.MESH_NORMAL:
            return (this as unknown as MeshNormalMaterial).clone();
        case MaterialType.MESH_PHONG:
            return (this as unknown as MeshPhongMaterial).clone();
        case MaterialType.MESH_PHYSICAL:
            return (this as unknown as MeshPhysicalMaterial).clone();
        case MaterialType.MESH_STANDARD:
            return (this as unknown as MeshStandardMaterial).clone();
        case MaterialType.MESH_TOON:
            return (this as unknown as MeshToonMaterial).clone();
        case MaterialType.POINTS:
            return (this as unknown as PointsMaterial).clone();
        case MaterialType.SHADOW:
            return (this as unknown as ShadowMaterial).clone();
        case MaterialType.SPRITE:
            return (this as unknown as SpriteMaterial).clone();
        default:
            console.error('Unknown material.');
            break;
        }

        return null;
    }

    public update(): void {
        this.material.needsUpdate = true;
    }

    public toJSON(): MaterialExport {
        switch (this.type) {
            case MaterialType.LINE_BASIC:
            case MaterialType.LINE_DASHED:
            case MaterialType.MESH_BASIC:
                return new MeshBasicMaterialExport(this as unknown as MeshBasicMaterial);
            case MaterialType.MESH_DEPTH:
            case MaterialType.MESH_LAMBERT:
            case MaterialType.MESH_MATCAP:
            case MaterialType.MESH_NORMAL:
            case MaterialType.MESH_PHONG:
                return new MeshPhongMaterialExport(this as unknown as MeshPhongMaterial);
            case MaterialType.MESH_PHYSICAL:
                return new MeshPhysicalMaterialExport(this as unknown as MeshPhysicalMaterial);
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
}

export class LineBasicMaterial extends Material {
    public get colour(): string {
        return '#' + (this.material as THREE.LineBasicMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.LineBasicMaterial).color =
            new THREE.Color(value);
    }
    public get linewidth(): number {
        return (this.material as THREE.LineBasicMaterial).linewidth;
    }
    public set linewidth(value: number) {
        (this.material as THREE.LineBasicMaterial).linewidth = value;
    }
    public get linecap(): string {
        return (this.material as THREE.LineBasicMaterial).linecap;
    }
    public set linecap(value: string) {
        (this.material as THREE.LineBasicMaterial).linecap = value;
    }
    public get linejoin(): string {
        return (this.material as THREE.LineBasicMaterial).linejoin;
    }
    public set linejoin(value: string) {
        (this.material as THREE.LineBasicMaterial).linejoin = value;
    }

    constructor(type?: MaterialType) {
        super(type ? type : MaterialType.LINE_BASIC);
    }

    public clone(): LineBasicMaterial {
        const ret = new LineBasicMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: LineBasicMaterial): void {
        super.copy(material);
        this.colour = material.colour;
        this.linewidth = material.linewidth;
        this.linecap = material.linecap;
        this.linejoin = material.linejoin;
    }
}

export class LineDashedMaterial extends LineBasicMaterial {
    public get dashSize(): number {
        return (this.material as THREE.LineDashedMaterial).dashSize;
    }
    public set dashSize(value: number) {
        (this.material as THREE.LineDashedMaterial).dashSize = value;
    }
    public get gapSize(): number {
        return (this.material as THREE.LineDashedMaterial).gapSize;
    }
    public set gapSize(value: number) {
        (this.material as THREE.LineDashedMaterial).gapSize = value;
    }
    public get scale(): number {
        return (this.material as THREE.LineDashedMaterial).scale;
    }
    public set scale(value: number) {
        (this.material as THREE.LineDashedMaterial).scale = value;
    }

    constructor() {
        super(MaterialType.LINE_DASHED);
    }

    public clone(): LineDashedMaterial {
        const ret = new LineDashedMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: LineDashedMaterial): void {
        super.copy(material);
        this.dashSize = material.dashSize;
        this.gapSize = material.gapSize;
        this.scale = material.scale;
    }
}

export class MeshBasicMaterial extends Material {
    public alphaMap: Texture;
    public aoMap: Texture;
    public get aoMapIntensity(): number {
        return (this.material as THREE.MeshBasicMaterial).aoMapIntensity;
    }
    public set aoMapIntensity(value: number) {
        (this.material as THREE.MeshBasicMaterial).aoMapIntensity = value;
    }
    public get colour(): string {
        return '#' + (this.material as THREE.MeshBasicMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.MeshBasicMaterial).color =
            new THREE.Color(value);
    }
    public get combine(): THREE.Combine {
        return (this.material as THREE.MeshBasicMaterial).combine;
    }
    public set combine(value: THREE.Combine) {
        (this.material as THREE.MeshBasicMaterial).combine = value;
    }
    public envMap: Texture;
    public map: Texture;
    public get morphTargets(): boolean {
        return (this.material as THREE.MeshBasicMaterial).morphTargets;
    }
    public set morphTargets(value: boolean) {
        (this.material as THREE.MeshBasicMaterial).morphTargets = value;
    }
    public get reflectivity(): number {
        return (this.material as THREE.MeshBasicMaterial).reflectivity;
    }
    public set reflectivity(value: number) {
        (this.material as THREE.MeshBasicMaterial).reflectivity = value;
    }
    public get refractionRatio(): number {
        return (this.material as THREE.MeshBasicMaterial).refractionRatio;
    }
    public set refractionRatio(value: number) {
        (this.material as THREE.MeshBasicMaterial).refractionRatio = value;
    }
    public get skinning(): boolean {
        return (this.material as THREE.MeshBasicMaterial).skinning;
    }
    public set skinning(value: boolean) {
        (this.material as THREE.MeshBasicMaterial).skinning = value;
    }
    public specularMap: Texture;
    public get wireframe(): boolean {
        return (this.material as THREE.MeshBasicMaterial).wireframe;
    }
    public set wireframe(value: boolean) {
        (this.material as THREE.MeshBasicMaterial).wireframe = value;
    }
    public get wireframeLinecap(): string {
        return (this.material as THREE.MeshBasicMaterial).wireframeLinecap;
    }
    public set wireframeLinecap(value: string) {
        (this.material as THREE.MeshBasicMaterial).wireframeLinecap = value;
    }
    public get wireframeLinejoin(): string {
        return (this.material as THREE.MeshBasicMaterial).wireframeLinejoin;
    }
    public set wireframeLinejoin(value: string) {
        (this.material as THREE.MeshBasicMaterial).wireframeLinejoin = value;
    }
    public get wireframeLinewidth(): number {
        return (this.material as THREE.MeshBasicMaterial).wireframeLinewidth;
    }
    public set wireframeLinewidth(value: number) {
        (this.material as THREE.MeshBasicMaterial).wireframeLinewidth = value;
    }

    constructor(type?: MaterialType) {
        super(type ? type : MaterialType.MESH_BASIC);
    }

    public static fromMaterial(material: THREE.MeshBasicMaterial): MeshBasicMaterial {
        if (!material) { return null; }

        const ret = new MeshBasicMaterial();
        ret.alphaMap = Texture.CreateTexture(material.alphaMap);
        ret.aoMap = Texture.CreateTexture(material.aoMap);
        ret.envMap = Texture.CreateTexture(material.envMap);
        ret.map = Texture.CreateTexture(material.map);
        ret.specularMap = Texture.CreateTexture(material.specularMap);
        ret.material = material;

        ret.name = material.name ? material.name : material.uuid;

        return ret;
    }

    public clone(): MeshBasicMaterial {
        const ret = new MeshBasicMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshBasicMaterial): void {
        super.copy(material);

        const m = this.material as THREE.MeshBasicMaterial;

        this.alphaMap = Texture.cloneTexture(material.alphaMap);
        if (this.alphaMap) { m.alphaMap = this.alphaMap.texture; }
        this.aoMap = Texture.cloneTexture(material.aoMap);
        if (this.aoMap) { m.aoMap = this.aoMap.texture; }
        this.aoMapIntensity = material.aoMapIntensity;
        this.colour = material.colour;
        this.combine = material.combine;
        this.envMap = Texture.cloneTexture(material.envMap);
        if (this.envMap) { m.envMap = this.envMap.texture; }
        this.map = Texture.cloneTexture(material.map);
        if (this.map) { m.map = this.map.texture; }
        this.morphTargets = material.morphTargets;
        this.reflectivity = material.reflectivity;
        this.refractionRatio = material.refractionRatio;
        this.skinning = material.skinning;
        this.specularMap = Texture.cloneTexture(material.specularMap);
        if (this.specularMap) { m.specularMap = this.specularMap.texture; }
        this.wireframe = material.wireframe;
        this.wireframeLinecap = material.wireframeLinecap;
        this.wireframeLinejoin = material.wireframeLinejoin;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }

    public update(): void {
        super.update();

        if (this.alphaMap) { this.alphaMap.texture.needsUpdate = true; }
        if (this.aoMap) { this.aoMap.texture.needsUpdate = true; }
        if (this.envMap) { this.envMap.texture.needsUpdate = true; }
        if (this.map) { this.map.texture.needsUpdate = true; }
        if (this.specularMap) { this.specularMap.texture.needsUpdate = true; }
    }
}

export class MeshDepthMaterial extends Material {
    public get displacementMap(): THREE.Texture {
        return (this.material as THREE.MeshDepthMaterial).displacementMap;
    }
    public set displacementMap(value: THREE.Texture) {
        (this.material as THREE.MeshDepthMaterial).displacementMap = value;
    }
    public get displacementScale(): number {
        return (this.material as THREE.MeshDepthMaterial).displacementScale;
    }
    public set displacementScale(value: number) {
        (this.material as THREE.MeshDepthMaterial).displacementScale = value;
    }
    public get displacementBias(): number {
        return (this.material as THREE.MeshDepthMaterial).displacementBias;
    }
    public set displacementBias(value: number) {
        (this.material as THREE.MeshDepthMaterial).displacementBias = value;
    }
    public get fog(): boolean {
        return (this.material as THREE.MeshDepthMaterial).fog;
    }
    public set fog(value: boolean) {
        (this.material as THREE.MeshDepthMaterial).fog = value;
    }
    public get wireframe(): boolean {
        return (this.material as THREE.MeshDepthMaterial).wireframe;
    }
    public set wireframe(value: boolean) {
        (this.material as THREE.MeshDepthMaterial).wireframe = value;
    }
    public get wireframeLinewidth(): number {
        return (this.material as THREE.MeshDepthMaterial).wireframeLinewidth;
    }
    public set wireframeLinewidth(value: number) {
        (this.material as THREE.MeshDepthMaterial).wireframeLinewidth = value;
    }

    constructor() {
        super(MaterialType.MESH_DEPTH);
    }

    public clone(): MeshDepthMaterial {
        const ret = new MeshDepthMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshDepthMaterial): void {
        super.copy(material);
        this.displacementMap = material.displacementMap;
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.fog = material.fog;
        this.wireframe = material.wireframe;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }
}

export class MeshLambertMaterial extends Material {
    public get alphaMap(): THREE.Texture {
        return (this.material as THREE.MeshLambertMaterial).alphaMap;
    }
    public set alphaMap(value: THREE.Texture) {
        (this.material as THREE.MeshLambertMaterial).alphaMap = value;
    }
    public get aoMap(): THREE.Texture {
        return (this.material as THREE.MeshLambertMaterial).aoMap;
    }
    public set aoMap(value: THREE.Texture) {
        (this.material as THREE.MeshLambertMaterial).aoMap = value;
    }
    public get aoMapIntensity(): number {
        return (this.material as THREE.MeshLambertMaterial).aoMapIntensity;
    }
    public set aoMapIntensity(value: number) {
        (this.material as THREE.MeshLambertMaterial).aoMapIntensity = value;
    }
    public get colour(): string {
        return '#' + (this.material as THREE.MeshLambertMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.MeshLambertMaterial).color =
            new THREE.Color(value);
    }
    public get combine(): THREE.Combine {
        return (this.material as THREE.MeshLambertMaterial).combine;
    }
    public set combine(value: THREE.Combine) {
        (this.material as THREE.MeshLambertMaterial).combine = value;
    }
    public get emissive(): string {
        return '#' + (this.material as THREE.MeshLambertMaterial).emissive.getHexString();
    }
    public set emissive(value: string) {
        (this.material as THREE.MeshLambertMaterial).emissive =
            new THREE.Color(value);
    }
    public get emissiveMap(): THREE.Texture {
        return (this.material as THREE.MeshLambertMaterial).emissiveMap;
    }
    public set emissiveMap(value: THREE.Texture) {
        (this.material as THREE.MeshLambertMaterial).emissiveMap = value;
    }
    public get emissiveIntensity(): number {
        return (this.material as THREE.MeshLambertMaterial).emissiveIntensity;
    }
    public set emissiveIntensity(value: number) {
        (this.material as THREE.MeshLambertMaterial).emissiveIntensity = value;
    }
    public get envMap(): THREE.Texture {
        return (this.material as THREE.MeshLambertMaterial).envMap;
    }
    public set envMap(value: THREE.Texture) {
        (this.material as THREE.MeshLambertMaterial).envMap = value;
    }
    public get lightMap(): THREE.Texture {
        return (this.material as THREE.MeshLambertMaterial).lightMap;
    }
    public set lightMap(value: THREE.Texture) {
        (this.material as THREE.MeshLambertMaterial).lightMap = value;
    }
    public get lightMapIntensity(): number {
        return (this.material as THREE.MeshLambertMaterial).lightMapIntensity;
    }
    public set lightMapIntensity(value: number) {
        (this.material as THREE.MeshLambertMaterial).lightMapIntensity = value;
    }
    public get map(): THREE.Texture {
        return (this.material as THREE.MeshLambertMaterial).map;
    }
    public set map(value: THREE.Texture) {
        (this.material as THREE.MeshLambertMaterial).map = value;
    }
    public get morphNormals(): boolean {
        return (this.material as THREE.MeshLambertMaterial).morphNormals;
    }
    public set morphNormals(value: boolean) {
        (this.material as THREE.MeshLambertMaterial).morphNormals = value;
    }
    public get morphTargets(): boolean {
        return (this.material as THREE.MeshLambertMaterial).morphTargets;
    }
    public set morphTargets(value: boolean) {
        (this.material as THREE.MeshLambertMaterial).morphNormals = value;
    }
    public get reflectivity(): number {
        return (this.material as THREE.MeshLambertMaterial).reflectivity;
    }
    public set reflectivity(value: number) {
        (this.material as THREE.MeshLambertMaterial).reflectivity = value;
    }
    public get refractionRatio(): number {
        return (this.material as THREE.MeshLambertMaterial).refractionRatio;
    }
    public set refractionRatio(value: number) {
        (this.material as THREE.MeshLambertMaterial).refractionRatio = value;
    }
    public get skinning(): boolean {
        return (this.material as THREE.MeshLambertMaterial).skinning;
    }
    public set skinning(value: boolean) {
        (this.material as THREE.MeshLambertMaterial).skinning = value;
    }
    public get specularMap(): THREE.Texture {
        return (this.material as THREE.MeshLambertMaterial).specularMap;
    }
    public set specularMap(value: THREE.Texture) {
        (this.material as THREE.MeshLambertMaterial).specularMap = value;
    }
    public get wireframe(): boolean {
        return (this.material as THREE.MeshLambertMaterial).wireframe;
    }
    public set wireframe(value: boolean) {
        (this.material as THREE.MeshLambertMaterial).wireframe = value;
    }
    public get wireframeLinecap(): string {
        return (this.material as THREE.MeshLambertMaterial).wireframeLinecap;
    }
    public set wireframeLinecap(value: string) {
        (this.material as THREE.MeshLambertMaterial).wireframeLinecap = value;
    }
    public get wireframeLinejoin(): string {
        return (this.material as THREE.MeshLambertMaterial).wireframeLinejoin;
    }
    public set wireframeLinejoin(value: string) {
        (this.material as THREE.MeshLambertMaterial).wireframeLinejoin = value;
    }
    public get wireframeLinewidth(): number {
        return (this.material as THREE.MeshLambertMaterial).wireframeLinewidth;
    }
    public set wireframeLinewidth(value: number) {
        (this.material as THREE.MeshLambertMaterial).wireframeLinewidth = value;
    }

    constructor() {
        super(MaterialType.MESH_LAMBERT);
    }

    public clone(): MeshLambertMaterial {
        const ret = new MeshLambertMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshLambertMaterial): void {
        super.copy(material);
        this.alphaMap = material.alphaMap;
        this.aoMap = material.aoMap;
        this.aoMapIntensity = material.aoMapIntensity;
        this.colour = material.colour;
        this.combine = material.combine;
        this.emissive = material.emissive;
        this.emissiveMap = material.emissiveMap;
        this.emissiveIntensity = material.emissiveIntensity;
        this.envMap = material.envMap;
        this.lightMap = material.lightMap;
        this.lightMapIntensity = material.lightMapIntensity;
        this.map = material.map;
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        this.reflectivity = material.reflectivity;
        this.refractionRatio = material.refractionRatio;
        this.skinning = material.skinning;
        this.specularMap = material.specularMap;
        this.wireframe = material.wireframe;
        this.wireframeLinecap = material.wireframeLinecap;
        this.wireframeLinejoin = material.wireframeLinejoin;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }
}

export class MeshMatcapMaterial extends Material {
    public get alphaMap(): THREE.Texture {
        return (this.material as THREE.MeshMatcapMaterial).alphaMap;
    }
    public set alphaMap(value: THREE.Texture) {
        (this.material as THREE.MeshMatcapMaterial).alphaMap = value;
    }
    public get bumpMap(): THREE.Texture {
        return (this.material as THREE.MeshMatcapMaterial).bumpMap;
    }
    public set bumpMap(value: THREE.Texture) {
        (this.material as THREE.MeshMatcapMaterial).bumpMap = value;
    }
    public get bumpScale(): number {
        return (this.material as THREE.MeshMatcapMaterial).bumpScale;
    }
    public set bumpScale(value: number) {
        (this.material as THREE.MeshMatcapMaterial).bumpScale = value;
    }
    public get colour(): string {
        return '#' + (this.material as THREE.MeshMatcapMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.MeshMatcapMaterial).color =
            new THREE.Color(value);
    }
    public get displacementMap(): THREE.Texture {
        return (this.material as THREE.MeshMatcapMaterial).displacementMap;
    }
    public set displacementMap(value: THREE.Texture) {
        (this.material as THREE.MeshMatcapMaterial).displacementMap = value;
    }
    public get displacementScale(): number {
        return (this.material as THREE.MeshMatcapMaterial).displacementScale;
    }
    public set displacementScale(value: number) {
        (this.material as THREE.MeshMatcapMaterial).displacementScale = value;
    }
    public get displacementBias(): number {
        return (this.material as THREE.MeshMatcapMaterial).displacementBias;
    }
    public set displacementBias(value: number) {
        (this.material as THREE.MeshMatcapMaterial).displacementBias = value;
    }
    public get map(): THREE.Texture {
        return (this.material as THREE.MeshMatcapMaterial).map;
    }
    public set map(value: THREE.Texture) {
        (this.material as THREE.MeshMatcapMaterial).map = value;
    }
    public get matcap(): THREE.Texture {
        return (this.material as THREE.MeshMatcapMaterial).matcap;
    }
    public set matcap(value: THREE.Texture) {
        (this.material as THREE.MeshMatcapMaterial).matcap = value;
    }
    public get morphNormals(): boolean {
        return (this.material as THREE.MeshMatcapMaterial).morphNormals;
    }
    public set morphNormals(value: boolean) {
        (this.material as THREE.MeshMatcapMaterial).morphNormals = value;
    }
    public get morphTargets(): boolean {
        return (this.material as THREE.MeshMatcapMaterial).morphTargets;
    }
    public set morphTargets(value: boolean) {
        (this.material as THREE.MeshMatcapMaterial).morphNormals = value;
    }
    public get normalMap(): THREE.Texture {
        return (this.material as THREE.MeshMatcapMaterial).normalMap;
    }
    public set normalMap(value: THREE.Texture) {
        (this.material as THREE.MeshMatcapMaterial).normalMap = value;
    }
    public get normalMapType(): THREE.NormalMapTypes {
        return (this.material as THREE.MeshMatcapMaterial).normalMapType;
    }
    public set normalMapType(value: THREE.NormalMapTypes) {
        (this.material as THREE.MeshMatcapMaterial).normalMapType = value;
    }
    public get normalScale(): THREE.Vector2 {
        return (this.material as THREE.MeshMatcapMaterial).normalScale;
    }
    public set normalScale(value: THREE.Vector2) {
        (this.material as THREE.MeshMatcapMaterial).normalScale = value;
    }
    public get skinning(): boolean {
        return (this.material as THREE.MeshMatcapMaterial).skinning;
    }
    public set skinning(value: boolean) {
        (this.material as THREE.MeshMatcapMaterial).skinning = value;
    }

    constructor() {
        super(MaterialType.MESH_MATCAP);
    }

    public clone(): MeshMatcapMaterial {
        const ret = new MeshMatcapMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshMatcapMaterial): void {
        super.copy(material);
        this.alphaMap = material.alphaMap;
        this.bumpMap = material.bumpMap;
        this.bumpScale = material.bumpScale;
        this.colour = material.colour;
        this.displacementMap = material.displacementMap;
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.map = material.map;
        this.matcap = material.matcap;
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        this.normalMap = material.normalMap;
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.skinning = material.skinning;
    }
}

export class MeshNormalMaterial extends Material {
    public get bumpMap(): THREE.Texture {
        return (this.material as THREE.MeshNormalMaterial).bumpMap;
    }
    public set bumpMap(value: THREE.Texture) {
        (this.material as THREE.MeshNormalMaterial).bumpMap = value;
    }
    public get bumpScale(): number {
        return (this.material as THREE.MeshNormalMaterial).bumpScale;
    }
    public set bumpScale(value: number) {
        (this.material as THREE.MeshNormalMaterial).bumpScale = value;
    }
    public get displacementMap(): THREE.Texture {
        return (this.material as THREE.MeshNormalMaterial).displacementMap;
    }
    public set displacementMap(value: THREE.Texture) {
        (this.material as THREE.MeshNormalMaterial).displacementMap = value;
    }
    public get displacementScale(): number {
        return (this.material as THREE.MeshNormalMaterial).displacementScale;
    }
    public set displacementScale(value: number) {
        (this.material as THREE.MeshNormalMaterial).displacementScale = value;
    }
    public get displacementBias(): number {
        return (this.material as THREE.MeshNormalMaterial).displacementBias;
    }
    public set displacementBias(value: number) {
        (this.material as THREE.MeshNormalMaterial).displacementBias = value;
    }
    public get fog(): boolean {
        return (this.material as THREE.MeshNormalMaterial).fog;
    }
    public set fog(value: boolean) {
        (this.material as THREE.MeshNormalMaterial).fog = value;
    }
    public get morphNormals(): boolean {
        return (this.material as THREE.MeshNormalMaterial).morphNormals;
    }
    public set morphNormals(value: boolean) {
        (this.material as THREE.MeshNormalMaterial).morphNormals = value;
    }
    public get morphTargets(): boolean {
        return (this.material as THREE.MeshNormalMaterial).morphTargets;
    }
    public set morphTargets(value: boolean) {
        (this.material as THREE.MeshNormalMaterial).morphNormals = value;
    }
    public get normalMap(): THREE.Texture {
        return (this.material as THREE.MeshNormalMaterial).normalMap;
    }
    public set normalMap(value: THREE.Texture) {
        (this.material as THREE.MeshNormalMaterial).normalMap = value;
    }
    public get normalMapType(): THREE.NormalMapTypes {
        return (this.material as THREE.MeshNormalMaterial).normalMapType;
    }
    public set normalMapType(value: THREE.NormalMapTypes) {
        (this.material as THREE.MeshNormalMaterial).normalMapType = value;
    }
    public get normalScale(): THREE.Vector2 {
        return (this.material as THREE.MeshNormalMaterial).normalScale;
    }
    public set normalScale(value: THREE.Vector2) {
        (this.material as THREE.MeshNormalMaterial).normalScale = value;
    }
    public get skinning(): boolean {
        return (this.material as THREE.MeshNormalMaterial).skinning;
    }
    public set skinning(value: boolean) {
        (this.material as THREE.MeshNormalMaterial).skinning = value;
    }
    public get wireframe(): boolean {
        return (this.material as THREE.MeshNormalMaterial).wireframe;
    }
    public set wireframe(value: boolean) {
        (this.material as THREE.MeshNormalMaterial).wireframe = value;
    }
    public get wireframeLinewidth(): number {
        return (this.material as THREE.MeshNormalMaterial).wireframeLinewidth;
    }
    public set wireframeLinewidth(value: number) {
        (this.material as THREE.MeshNormalMaterial).wireframeLinewidth = value;
    }

    constructor() {
        super(MaterialType.MESH_NORMAL);
    }

    public clone(): MeshNormalMaterial {
        const ret = new MeshNormalMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshNormalMaterial): void {
        super.copy(material);
        this.bumpMap = material.bumpMap;
        this.bumpScale = material.bumpScale;
        this.displacementMap = material.displacementMap;
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.fog = material.fog;
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        this.normalMap = material.normalMap;
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.skinning = material.skinning;
        this.wireframe = material.wireframe;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }
}

export class MeshPhongMaterial extends Material {
    public alphaMap: Texture;
    public aoMap: Texture;
    public get aoMapIntensity(): number {
        return (this.material as THREE.MeshPhongMaterial).aoMapIntensity;
    }
    public set aoMapIntensity(value: number) {
        (this.material as THREE.MeshPhongMaterial).aoMapIntensity = value;
    }
    public bumpMap: Texture;
    public get bumpScale(): number {
        return (this.material as THREE.MeshPhongMaterial).bumpScale;
    }
    public set bumpScale(value: number) {
        (this.material as THREE.MeshPhongMaterial).bumpScale = value;
    }
    public get colour(): string {
        return '#' + (this.material as THREE.MeshPhongMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.MeshPhongMaterial).color =
            new THREE.Color(value);
    }
    public get combine(): THREE.Combine {
        return (this.material as THREE.MeshPhongMaterial).combine;
    }
    public set combine(value: THREE.Combine) {
        (this.material as THREE.MeshPhongMaterial).combine = value;
    }
    public displacementMap: Texture;
    public get displacementScale(): number {
        return (this.material as THREE.MeshPhongMaterial).displacementScale;
    }
    public set displacementScale(value: number) {
        (this.material as THREE.MeshPhongMaterial).displacementScale = value;
    }
    public get displacementBias(): number {
        return (this.material as THREE.MeshPhongMaterial).displacementBias;
    }
    public set displacementBias(value: number) {
        (this.material as THREE.MeshPhongMaterial).displacementBias = value;
    }
    public get emissive(): string {
        return '#' + (this.material as THREE.MeshPhongMaterial).emissive.getHexString();
    }
    public set emissive(value: string) {
        (this.material as THREE.MeshPhongMaterial).emissive =
            new THREE.Color(value);
    }
    public emissiveMap: Texture;
    public get emissiveIntensity(): number {
        return (this.material as THREE.MeshPhongMaterial).emissiveIntensity;
    }
    public set emissiveIntensity(value: number) {
        (this.material as THREE.MeshPhongMaterial).emissiveIntensity = value;
    }
    public envMap: Texture;
    public lightMap: Texture;
    public get lightMapIntensity(): number {
        return (this.material as THREE.MeshPhongMaterial).lightMapIntensity;
    }
    public set lightMapIntensity(value: number) {
        (this.material as THREE.MeshPhongMaterial).lightMapIntensity = value;
    }
    public map: Texture;
    public get morphNormals(): boolean {
        return (this.material as THREE.MeshPhongMaterial).morphNormals;
    }
    public set morphNormals(value: boolean) {
        (this.material as THREE.MeshPhongMaterial).morphNormals = value;
    }
    public get morphTargets(): boolean {
        return (this.material as THREE.MeshPhongMaterial).morphTargets;
    }
    public set morphTargets(value: boolean) {
        (this.material as THREE.MeshPhongMaterial).morphNormals = value;
    }
    public normalMap: Texture;
    public get normalMapType(): THREE.NormalMapTypes {
        return (this.material as THREE.MeshPhongMaterial).normalMapType;
    }
    public set normalMapType(value: THREE.NormalMapTypes) {
        (this.material as THREE.MeshPhongMaterial).normalMapType = value;
    }
    public get normalScale(): THREE.Vector2 {
        return (this.material as THREE.MeshPhongMaterial).normalScale;
    }
    public set normalScale(value: THREE.Vector2) {
        (this.material as THREE.MeshPhongMaterial).normalScale = value;
    }
    public get reflectivity(): number {
        return (this.material as THREE.MeshPhongMaterial).reflectivity;
    }
    public set reflectivity(value: number) {
        (this.material as THREE.MeshPhongMaterial).reflectivity = value;
    }
    public get refractionRatio(): number {
        return (this.material as THREE.MeshPhongMaterial).refractionRatio;
    }
    public set refractionRatio(value: number) {
        (this.material as THREE.MeshPhongMaterial).refractionRatio = value;
    }
    public get shininess(): number {
        return (this.material as THREE.MeshPhongMaterial).shininess;
    }
    public set shininess(value: number) {
        (this.material as THREE.MeshPhongMaterial).shininess = value;
    }
    public get skinning(): boolean {
        return (this.material as THREE.MeshPhongMaterial).skinning;
    }
    public set skinning(value: boolean) {
        (this.material as THREE.MeshPhongMaterial).skinning = value;
    }
    public get specular(): string {
        return '#' + (this.material as THREE.MeshPhongMaterial).specular.getHexString();
    }
    public set specular(value: string) {
        (this.material as THREE.MeshPhongMaterial).specular =
            new THREE.Color(value);
    }
    public specularMap: Texture;
    public get wireframe(): boolean {
        return (this.material as THREE.MeshPhongMaterial).wireframe;
    }
    public set wireframe(value: boolean) {
        (this.material as THREE.MeshPhongMaterial).wireframe = value;
    }
    public get wireframeLinecap(): string {
        return (this.material as THREE.MeshPhongMaterial).wireframeLinecap;
    }
    public set wireframeLinecap(value: string) {
        (this.material as THREE.MeshPhongMaterial).wireframeLinecap = value;
    }
    public get wireframeLinejoin(): string {
        return (this.material as THREE.MeshPhongMaterial).wireframeLinejoin;
    }
    public set wireframeLinejoin(value: string) {
        (this.material as THREE.MeshPhongMaterial).wireframeLinejoin = value;
    }
    public get wireframeLinewidth(): number {
        return (this.material as THREE.MeshPhongMaterial).wireframeLinewidth;
    }
    public set wireframeLinewidth(value: number) {
        (this.material as THREE.MeshPhongMaterial).wireframeLinewidth = value;
    }

    constructor() {
        super(MaterialType.MESH_PHONG);
    }

    public static fromMaterial(material: THREE.MeshPhongMaterial): MeshPhongMaterial {
        if (!material) { return null; }

        const ret = new MeshPhongMaterial();
        ret.alphaMap = Texture.CreateTexture(material.alphaMap);
        ret.aoMap = Texture.CreateTexture(material.aoMap);
        ret.bumpMap = Texture.CreateTexture(material.bumpMap);
        ret.displacementMap = Texture.CreateTexture(material.displacementMap);
        ret.emissiveMap = Texture.CreateTexture(material.emissiveMap);
        ret.envMap = Texture.CreateTexture(material.envMap);
        ret.lightMap = Texture.CreateTexture(material.lightMap);
        ret.map = Texture.CreateTexture(material.map);
        ret.normalMap = Texture.CreateTexture(material.normalMap);
        ret.specularMap = Texture.CreateTexture(material.specularMap);
        ret.material = material;

        ret.name = material.name ? material.name : material.uuid;

        return ret;
    }

    public clone(): MeshPhongMaterial {
        const ret = new MeshPhongMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshPhongMaterial): void {
        super.copy(material);

        const m = this.material as THREE.MeshPhongMaterial;

        this.alphaMap = Texture.cloneTexture(material.alphaMap);
        if (this.alphaMap) { m.alphaMap = this.alphaMap.texture; }
        this.aoMap = Texture.cloneTexture(material.aoMap);
        if (this.aoMap) { m.aoMap = this.aoMap.texture; }
        this.aoMapIntensity = material.aoMapIntensity;
        this.bumpMap = Texture.cloneTexture(material.bumpMap);
        if (this.bumpMap) { m.bumpMap = this.bumpMap.texture; }
        this.bumpScale = material.bumpScale;
        this.colour = material.colour;
        this.combine = material.combine;
        this.displacementMap = Texture.cloneTexture(material.displacementMap);
        if (this.displacementMap) { m.displacementMap = this.displacementMap.texture; }
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.emissive = material.emissive;
        this.emissiveMap = Texture.cloneTexture(material.emissiveMap);
        if (this.emissiveMap) { m.emissiveMap = this.emissiveMap.texture; }
        this.emissiveIntensity = material.emissiveIntensity;
        this.envMap = Texture.cloneTexture(material.envMap);
        if (this.envMap) { m.envMap = this.envMap.texture; }
        this.lightMap = Texture.cloneTexture(material.lightMap);
        if (this.lightMap) { m.lightMap = this.lightMap.texture; }
        this.lightMapIntensity = material.lightMapIntensity;
        this.map = Texture.cloneTexture(material.map);
        if (this.map) { m.map = this.map.texture; }
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        this.normalMap = Texture.cloneTexture(material.normalMap);
        if (this.normalMap) { m.normalMap = this.normalMap.texture; }
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.reflectivity = material.reflectivity;
        this.refractionRatio = material.refractionRatio;
        this.shininess = material.shininess;
        this.skinning = material.skinning;
        this.specular = material.specular;
        this.specularMap = Texture.cloneTexture(material.specularMap);
        if (this.specularMap) { m.specularMap = this.specularMap.texture; }
        this.wireframe = material.wireframe;
        this.wireframeLinecap = material.wireframeLinecap;
        this.wireframeLinejoin = material.wireframeLinejoin;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }

    public update(): void {
        super.update();

        if (this.alphaMap) { this.alphaMap.texture.needsUpdate = true; }
        if (this.aoMap) { this.aoMap.texture.needsUpdate = true; }
        if (this.bumpMap) { this.bumpMap.texture.needsUpdate = true; }
        if (this.displacementMap) { this.displacementMap.texture.needsUpdate = true; }
        if (this.emissiveMap) { this.emissiveMap.texture.needsUpdate = true; }
        if (this.envMap) { this.envMap.texture.needsUpdate = true; }
        if (this.lightMap) { this.lightMap.texture.needsUpdate = true; }
        if (this.map) { this.map.texture.needsUpdate = true; }
        if (this.normalMap) { this.normalMap.texture.needsUpdate = true; }
        if (this.specularMap) { this.specularMap.texture.needsUpdate = true; }
    }
}

export class MeshStandardMaterial extends Material {
    public alphaMap: Texture;
    public aoMap: Texture;
    public get aoMapIntensity(): number {
        return (this.material as THREE.MeshStandardMaterial).aoMapIntensity;
    }
    public set aoMapIntensity(value: number) {
        (this.material as THREE.MeshStandardMaterial).aoMapIntensity = value;
    }
    public bumpMap: Texture;
    public get bumpScale(): number {
        return (this.material as THREE.MeshStandardMaterial).bumpScale;
    }
    public set bumpScale(value: number) {
        (this.material as THREE.MeshStandardMaterial).bumpScale = value;
    }
    public get colour(): string {
        return '#' + (this.material as THREE.MeshStandardMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.MeshStandardMaterial).color =
            new THREE.Color(value);
    }
    public displacementMap: Texture;
    public get displacementScale(): number {
        return (this.material as THREE.MeshStandardMaterial).displacementScale;
    }
    public set displacementScale(value: number) {
        (this.material as THREE.MeshStandardMaterial).displacementScale = value;
    }
    public get displacementBias(): number {
        return (this.material as THREE.MeshStandardMaterial).displacementBias;
    }
    public set displacementBias(value: number) {
        (this.material as THREE.MeshStandardMaterial).displacementBias = value;
    }
    public get emissive(): string {
        return '#' + (this.material as THREE.MeshStandardMaterial).emissive.getHexString();
    }
    public set emissive(value: string) {
        (this.material as THREE.MeshStandardMaterial).emissive =
            new THREE.Color(value);
    }
    public emissiveMap: Texture;
    public get emissiveIntensity(): number {
        return (this.material as THREE.MeshStandardMaterial).emissiveIntensity;
    }
    public set emissiveIntensity(value: number) {
        (this.material as THREE.MeshStandardMaterial).emissiveIntensity = value;
    }
    public envMap: Texture;
    public get envMapIntensity(): number {
        return (this.material as THREE.MeshStandardMaterial).envMapIntensity;
    }
    public set envMapIntensity(value: number) {
        (this.material as THREE.MeshStandardMaterial).envMapIntensity = value;
    }
    public lightMap: Texture;
    public get lightMapIntensity(): number {
        return (this.material as THREE.MeshStandardMaterial).lightMapIntensity;
    }
    public set lightMapIntensity(value: number) {
        (this.material as THREE.MeshStandardMaterial).lightMapIntensity = value;
    }
    public map: Texture;
    public get metalness(): number {
        return (this.material as THREE.MeshStandardMaterial).metalness;
    }
    public set metalness(value: number) {
        (this.material as THREE.MeshStandardMaterial).metalness = value;
    }
    public metalnessMap: Texture;
    public get morphNormals(): boolean {
        return (this.material as THREE.MeshStandardMaterial).morphNormals;
    }
    public set morphNormals(value: boolean) {
        (this.material as THREE.MeshStandardMaterial).morphNormals = value;
    }
    public get morphTargets(): boolean {
        return (this.material as THREE.MeshStandardMaterial).morphTargets;
    }
    public set morphTargets(value: boolean) {
        (this.material as THREE.MeshStandardMaterial).morphNormals = value;
    }
    public normalMap: Texture;
    public get normalMapType(): THREE.NormalMapTypes {
        return (this.material as THREE.MeshStandardMaterial).normalMapType;
    }
    public set normalMapType(value: THREE.NormalMapTypes) {
        (this.material as THREE.MeshStandardMaterial).normalMapType = value;
    }
    public get normalScale(): THREE.Vector2 {
        return (this.material as THREE.MeshStandardMaterial).normalScale;
    }
    public set normalScale(value: THREE.Vector2) {
        (this.material as THREE.MeshStandardMaterial).normalScale = value;
    }
    public get refractionRatio(): number {
        return (this.material as THREE.MeshStandardMaterial).refractionRatio;
    }
    public set refractionRatio(value: number) {
        (this.material as THREE.MeshStandardMaterial).refractionRatio = value;
    }
    public get roughness(): number {
        return (this.material as THREE.MeshStandardMaterial).roughness;
    }
    public set roughness(value: number) {
        (this.material as THREE.MeshStandardMaterial).roughness = value;
    }
    // public roughnessMap: Texture;
    public get skinning(): boolean {
        return (this.material as THREE.MeshPhongMaterial).skinning;
    }
    public set skinning(value: boolean) {
        (this.material as THREE.MeshStandardMaterial).skinning = value;
    }
    public get vertexTangents(): boolean {
        return (this.material as THREE.MeshStandardMaterial).vertexTangents;
    }
    public set vertexTangents(value: boolean) {
        (this.material as THREE.MeshStandardMaterial).vertexTangents = value;
    }
    public get wireframe(): boolean {
        return (this.material as THREE.MeshStandardMaterial).wireframe;
    }
    public set wireframe(value: boolean) {
        (this.material as THREE.MeshStandardMaterial).wireframe = value;
    }
    public get wireframeLinewidth(): number {
        return (this.material as THREE.MeshStandardMaterial).wireframeLinewidth;
    }
    public set wireframeLinewidth(value: number) {
        (this.material as THREE.MeshStandardMaterial).wireframeLinewidth = value;
    }

    constructor(type?: MaterialType) {
        super(type ? type : MaterialType.MESH_STANDARD);
    }

    public static fromMaterial(material: THREE.MeshStandardMaterial): MeshStandardMaterial {
        if (!material) { return null; }

        const ret = new MeshStandardMaterial();
        ret.alphaMap = Texture.CreateTexture(material.alphaMap);
        ret.aoMap = Texture.CreateTexture(material.aoMap);
        ret.bumpMap = Texture.CreateTexture(material.bumpMap);
        ret.displacementMap = Texture.CreateTexture(material.displacementMap);
        ret.emissiveMap = Texture.CreateTexture(material.emissiveMap);
        ret.envMap = Texture.CreateTexture(material.envMap);
        ret.lightMap = Texture.CreateTexture(material.lightMap);
        ret.map = Texture.CreateTexture(material.map);
        ret.metalnessMap = Texture.CreateTexture(material.metalnessMap);
        ret.normalMap = Texture.CreateTexture(material.normalMap);
        // ret.roughnessMap = Texture.CreateTexture(material.roughnessMap);
        ret.material = material;

        ret.name = material.name ? material.name : material.uuid;

        return ret;
    }

    public clone(): MeshStandardMaterial {
        const ret = new MeshStandardMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshStandardMaterial): void {
        super.copy(material);

        const m = this.material as THREE.MeshStandardMaterial;

        this.alphaMap = Texture.cloneTexture(material.alphaMap);
        if (this.alphaMap) { m.alphaMap = this.alphaMap.texture; }
        this.aoMap = Texture.cloneTexture(material.aoMap);
        if (this.aoMap) { m.aoMap = this.aoMap.texture; }
        this.aoMapIntensity = material.aoMapIntensity;
        this.bumpMap = Texture.cloneTexture(material.bumpMap);
        if (this.bumpMap) { m.bumpMap = this.bumpMap.texture; }
        this.bumpScale = material.bumpScale;
        this.colour = material.colour;
        this.displacementMap = Texture.cloneTexture(material.displacementMap);
        if (this.displacementMap) { m.displacementMap = this.displacementMap.texture; }
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.emissive = material.emissive;
        this.emissiveMap = Texture.cloneTexture(material.emissiveMap);
        if (this.emissiveMap) { m.emissiveMap = this.emissiveMap.texture; }
        this.emissiveIntensity = material.emissiveIntensity;
        this.envMap = Texture.cloneTexture(material.envMap);
        if (this.envMap) { m.envMap = this.envMap.texture; }
        this.envMapIntensity = material.envMapIntensity;
        this.lightMap = Texture.cloneTexture(material.lightMap);
        if (this.lightMap) { m.lightMap = this.lightMap.texture; }
        this.lightMapIntensity = material.lightMapIntensity;
        this.map = Texture.cloneTexture(material.map);
        if (this.map) { m.map = this.map.texture; }
        this.metalness = material.metalness;
        this.metalnessMap = Texture.cloneTexture(material.metalnessMap);
        if (this.metalnessMap) {
            m.metalnessMap = this.metalnessMap.texture;
            m.roughnessMap = this.metalnessMap.texture;
        }
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        this.normalMap = Texture.cloneTexture(material.normalMap);
        if (this.normalMap) { m.normalMap = this.normalMap.texture; }
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.refractionRatio = material.refractionRatio;
        this.roughness = material.roughness;
        // this.roughnessMap = Texture.cloneTexture(material.roughnessMap);
        // if (this.roughnessMap) { m.roughnessMap = this.roughnessMap.texture; }
        this.skinning = material.skinning;
        this.vertexTangents = material.vertexTangents;
        this.wireframe = material.wireframe;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }

    public update(): void {
        super.update();

        if (this.alphaMap) { this.alphaMap.texture.needsUpdate = true; }
        if (this.aoMap) { this.aoMap.texture.needsUpdate = true; }
        if (this.bumpMap) { this.bumpMap.texture.needsUpdate = true; }
        if (this.displacementMap) { this.displacementMap.texture.needsUpdate = true; }
        if (this.emissiveMap) { this.emissiveMap.texture.needsUpdate = true; }
        if (this.envMap) { this.envMap.texture.needsUpdate = true; }
        if (this.lightMap) { this.lightMap.texture.needsUpdate = true; }
        if (this.map) { this.map.texture.needsUpdate = true; }
        if (this.metalnessMap) { this.metalnessMap.texture.needsUpdate = true; }
        if (this.normalMap) { this.normalMap.texture.needsUpdate = true; }
//        if (this.roughnessMap) { this.roughnessMap.texture.needsUpdate = true; }
    }
}

export class MeshPhysicalMaterial extends MeshStandardMaterial {
    public get clearcoat(): number {
        return (this.material as THREE.MeshPhysicalMaterial).clearcoat;
    }
    public set clearcoat(value: number) {
        (this.material as THREE.MeshPhysicalMaterial).clearcoat = value;
    }
//    public clearcoatNormalMap: Texture;
    public get clearcoatNormalScale(): Vector2 {
        const m = this.material as THREE.MeshPhysicalMaterial;
        return new Vector2(m.clearcoatNormalScale.x, m.clearcoatNormalScale.y);
    }
    public set clearcoatNormalScale(value: Vector2) {
        (this.material as THREE.MeshPhysicalMaterial).clearcoatNormalScale.set(value.X, value.Y);
    }
    public get clearcoatRoughness(): number {
        return (this.material as THREE.MeshPhysicalMaterial).clearcoatRoughness;
    }
    public set clearcoatRoughness(value: number) {
        (this.material as THREE.MeshPhysicalMaterial).clearcoatRoughness = value;
    }
    public get reflectivity(): number {
        return (this.material as THREE.MeshPhysicalMaterial).reflectivity;
    }
    public set reflectivity(value: number) {
        (this.material as THREE.MeshPhysicalMaterial).reflectivity = value;
    }

    constructor() {
        super(MaterialType.MESH_PHYSICAL);
    }

    public static fromMaterial(material: THREE.MeshPhysicalMaterial): MeshPhysicalMaterial {
        if (!material) { return null; }

        const ret = new MeshPhysicalMaterial();
        ret.alphaMap = Texture.CreateTexture(material.alphaMap);
        ret.aoMap = Texture.CreateTexture(material.aoMap);
        ret.bumpMap = Texture.CreateTexture(material.bumpMap);
//        ret.clearcoatNormalMap = Texture.CreateTexture(material.clearcoatNormalMap);
        ret.displacementMap = Texture.CreateTexture(material.displacementMap);
        ret.emissiveMap = Texture.CreateTexture(material.emissiveMap);
        ret.envMap = Texture.CreateTexture(material.envMap);
        ret.lightMap = Texture.CreateTexture(material.lightMap);
        ret.map = Texture.CreateTexture(material.map);
        ret.metalnessMap = Texture.CreateTexture(material.metalnessMap);
        ret.normalMap = Texture.CreateTexture(material.normalMap);
//        ret.roughnessMap = Texture.CreateTexture(material.roughnessMap);
        ret.material = material;

        ret.name = material.name ? material.name : material.uuid;

        return ret;
    }

    public clone(): MeshPhysicalMaterial {
        const ret = new MeshPhysicalMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshPhysicalMaterial): void {
        super.copy(material);

        const m = this.material as THREE.MeshPhysicalMaterial;

        this.clearcoat = material.clearcoat;
//        this.clearcoatNormalMap = Texture.cloneTexture(material.clearcoatNormalMap);
        if (this.metalnessMap) { m.clearcoatNormalMap = this.metalnessMap.texture; }
        this.clearcoatNormalScale = new Vector2(
            material.clearcoatNormalScale.X, material.clearcoatNormalScale.Y);
        this.clearcoatRoughness = material.clearcoatRoughness;
        this.reflectivity = material.reflectivity;
    }

    public update(): void {
        super.update();

//        if (this.clearcoatNormalMap) { this.clearcoatNormalMap.texture.needsUpdate = true; }
    }
}

export class MeshToonMaterial extends Material {
    public get alphaMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).alphaMap;
    }
    public set alphaMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).alphaMap = value;
    }
    public get aoMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).aoMap;
    }
    public set aoMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).aoMap = value;
    }
    public get aoMapIntensity(): number {
        return (this.material as THREE.MeshToonMaterial).aoMapIntensity;
    }
    public set aoMapIntensity(value: number) {
        (this.material as THREE.MeshToonMaterial).aoMapIntensity = value;
    }
    public get bumpMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).bumpMap;
    }
    public set bumpMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).bumpMap = value;
    }
    public get bumpScale(): number {
        return (this.material as THREE.MeshToonMaterial).bumpScale;
    }
    public set bumpScale(value: number) {
        (this.material as THREE.MeshToonMaterial).bumpScale = value;
    }
    public get colour(): string {
        return '#' + (this.material as THREE.MeshToonMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.MeshToonMaterial).color =
            new THREE.Color(value);
    }
    public get displacementMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).displacementMap;
    }
    public set displacementMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).displacementMap = value;
    }
    public get displacementScale(): number {
        return (this.material as THREE.MeshToonMaterial).displacementScale;
    }
    public set displacementScale(value: number) {
        (this.material as THREE.MeshToonMaterial).displacementScale = value;
    }
    public get displacementBias(): number {
        return (this.material as THREE.MeshToonMaterial).displacementBias;
    }
    public set displacementBias(value: number) {
        (this.material as THREE.MeshToonMaterial).displacementBias = value;
    }
    public get emissive(): string {
        return '#' + (this.material as THREE.MeshToonMaterial).emissive.getHexString();
    }
    public set emissive(value: string) {
        (this.material as THREE.MeshToonMaterial).emissive =
            new THREE.Color(value);
    }
    public get emissiveMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).emissiveMap;
    }
    public set emissiveMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).emissiveMap = value;
    }
    public get emissiveIntensity(): number {
        return (this.material as THREE.MeshToonMaterial).emissiveIntensity;
    }
    public set emissiveIntensity(value: number) {
        (this.material as THREE.MeshToonMaterial).emissiveIntensity = value;
    }
    public get envMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).envMap;
    }
    public set envMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).envMap = value;
    }
    public get gradientMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).gradientMap;
    }
    public set gradientMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).gradientMap = value;
    }
    public get lightMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).lightMap;
    }
    public set lightMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).lightMap = value;
    }
    public get lightMapIntensity(): number {
        return (this.material as THREE.MeshToonMaterial).lightMapIntensity;
    }
    public set lightMapIntensity(value: number) {
        (this.material as THREE.MeshToonMaterial).lightMapIntensity = value;
    }
    public get map(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).map;
    }
    public set map(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).map = value;
    }
    public get morphNormals(): boolean {
        return (this.material as THREE.MeshToonMaterial).morphNormals;
    }
    public set morphNormals(value: boolean) {
        (this.material as THREE.MeshToonMaterial).morphNormals = value;
    }
    public get morphTargets(): boolean {
        return (this.material as THREE.MeshToonMaterial).morphTargets;
    }
    public set morphTargets(value: boolean) {
        (this.material as THREE.MeshToonMaterial).morphNormals = value;
    }
    public get normalMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).normalMap;
    }
    public set normalMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).normalMap = value;
    }
    public get normalMapType(): THREE.NormalMapTypes {
        return (this.material as THREE.MeshToonMaterial).normalMapType;
    }
    public set normalMapType(value: THREE.NormalMapTypes) {
        (this.material as THREE.MeshToonMaterial).normalMapType = value;
    }
    public get normalScale(): THREE.Vector2 {
        return (this.material as THREE.MeshToonMaterial).normalScale;
    }
    public set normalScale(value: THREE.Vector2) {
        (this.material as THREE.MeshToonMaterial).normalScale = value;
    }
    public get refractionRatio(): number {
        return (this.material as THREE.MeshToonMaterial).refractionRatio;
    }
    public set refractionRatio(value: number) {
        (this.material as THREE.MeshToonMaterial).refractionRatio = value;
    }
    public get shininess(): number {
        return (this.material as THREE.MeshToonMaterial).shininess;
    }
    public set shininess(value: number) {
        (this.material as THREE.MeshToonMaterial).shininess = value;
    }
    public get skinning(): boolean {
        return (this.material as THREE.MeshPhongMaterial).skinning;
    }
    public set skinning(value: boolean) {
        (this.material as THREE.MeshToonMaterial).skinning = value;
    }
    public get specular(): string {
        return '#' + (this.material as THREE.MeshToonMaterial).specular.getHexString();
    }
    public set specular(value: string) {
        (this.material as THREE.MeshToonMaterial).specular =
            new THREE.Color(value);
    }
    public get specularMap(): THREE.Texture {
        return (this.material as THREE.MeshToonMaterial).specularMap;
    }
    public set specularMap(value: THREE.Texture) {
        (this.material as THREE.MeshToonMaterial).specularMap = value;
    }
    public get wireframe(): boolean {
        return (this.material as THREE.MeshToonMaterial).wireframe;
    }
    public set wireframe(value: boolean) {
        (this.material as THREE.MeshToonMaterial).wireframe = value;
    }
    public get wireframeLinecap(): string {
        return (this.material as THREE.MeshToonMaterial).wireframeLinecap;
    }
    public set wireframeLinecap(value: string) {
        (this.material as THREE.MeshToonMaterial).wireframeLinecap = value;
    }
    public get wireframeLinejoin(): string {
        return (this.material as THREE.MeshToonMaterial).wireframeLinejoin;
    }
    public set wireframeLinejoin(value: string) {
        (this.material as THREE.MeshToonMaterial).wireframeLinejoin = value;
    }
    public get wireframeLinewidth(): number {
        return (this.material as THREE.MeshToonMaterial).wireframeLinewidth;
    }
    public set wireframeLinewidth(value: number) {
        (this.material as THREE.MeshToonMaterial).wireframeLinewidth = value;
    }

    constructor(type?: MaterialType) {
        super(type ? type : MaterialType.MESH_TOON);
    }

    public clone(): MeshToonMaterial {
        const ret = new MeshToonMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshToonMaterial): void {
        super.copy(material);
        this.alphaMap = material.alphaMap;
        this.aoMap = material.aoMap;
        this.aoMapIntensity = material.aoMapIntensity;
        this.bumpMap = material.bumpMap;
        this.bumpScale = material.bumpScale;
        this.colour = material.colour;
        this.displacementMap = material.displacementMap;
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.emissive = material.emissive;
        this.emissiveMap = material.emissiveMap;
        this.emissiveIntensity = material.emissiveIntensity;
        this.envMap = material.envMap;
        this.gradientMap = material.gradientMap;
        this.lightMap = material.lightMap;
        this.lightMapIntensity = material.lightMapIntensity;
        this.map = material.map;
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        this.normalMap = material.normalMap;
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.refractionRatio = material.refractionRatio;
        this.shininess = material.shininess;
        this.skinning = material.skinning;
        this.specular = material.specular;
        this.specularMap = material.specularMap;
        this.wireframe = material.wireframe;
        this.wireframeLinecap = material.wireframeLinecap;
        this.wireframeLinejoin = material.wireframeLinejoin;
        this.wireframeLinewidth = material.wireframeLinewidth;
    }
}

export class PointsMaterial extends Material {
    public get colour(): string {
        return '#' + (this.material as THREE.PointsMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.PointsMaterial).color =
            new THREE.Color(value);
    }
    public get map(): THREE.Texture {
        return (this.material as THREE.PointsMaterial).map;
    }
    public set map(value: THREE.Texture) {
        (this.material as THREE.PointsMaterial).map = value;
    }
    public get size(): number {
        return (this.material as THREE.PointsMaterial).size;
    }
    public set size(value: number) {
        (this.material as THREE.PointsMaterial).size = value;
    }
    public get sizeAttenuation(): boolean {
        return (this.material as THREE.PointsMaterial).sizeAttenuation;
    }
    public set sizeAttenuation(value: boolean) {
        (this.material as THREE.PointsMaterial).sizeAttenuation = value;
    }

    constructor(type?: MaterialType) {
        super(type ? type : MaterialType.POINTS);
    }

    public clone(): PointsMaterial {
        const ret = new PointsMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: PointsMaterial): void {
        super.copy(material);
        this.colour = material.colour;
        this.map = material.map;
        this.size = material.size;
        this.sizeAttenuation = material.sizeAttenuation;
    }
}

export class ShadowMaterial extends Material {
    public get transparent(): boolean {
        return (this.material as THREE.ShadowMaterial).transparent;
    }
    public set transparent(value: boolean) {
        (this.material as THREE.ShadowMaterial).transparent = value;
    }

    constructor(type?: MaterialType) {
        super(type ? type : MaterialType.SHADOW);
    }

    public clone(): ShadowMaterial {
        const ret = new ShadowMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: ShadowMaterial): void {
        super.copy(material);
        this.transparent = material.transparent;
    }
}

export class SpriteMaterial extends Material {
    public get colour(): string {
        return '#' + (this.material as THREE.SpriteMaterial).color.getHexString();
    }
    public set colour(value: string) {
        (this.material as THREE.SpriteMaterial).color =
            new THREE.Color(value);
    }
    public get fog(): boolean {
        return (this.material as THREE.SpriteMaterial).fog;
    }
    public set fog(value: boolean) {
        (this.material as THREE.SpriteMaterial).fog = value;
    }
    public get map(): THREE.Texture {
        return (this.material as THREE.SpriteMaterial).map;
    }
    public set map(value: THREE.Texture) {
        (this.material as THREE.SpriteMaterial).map = value;
    }
    public get rotation(): number {
        return (this.material as THREE.SpriteMaterial).rotation;
    }
    public set rotation(value: number) {
        (this.material as THREE.SpriteMaterial).rotation = value;
    }
    public get sizeAttenuation(): boolean {
        return (this.material as THREE.SpriteMaterial).sizeAttenuation;
    }
    public set sizeAttenuation(value: boolean) {
        (this.material as THREE.SpriteMaterial).sizeAttenuation = value;
    }

    constructor(type?: MaterialType) {
        super(type ? type : MaterialType.SPRITE);
    }

    public clone(): SpriteMaterial {
        const ret = new SpriteMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: SpriteMaterial): void {
        super.copy(material);
        this.colour = material.colour;
        this.fog = material.fog;
        this.map = material.map;
        this.rotation = material.rotation;
        this.sizeAttenuation = material.sizeAttenuation;
    }
}
