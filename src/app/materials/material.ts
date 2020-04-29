import { MaterialType } from './material-type.enum';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';

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
        case MaterialType.MESH_DISTANCE:
            this.material = new THREE.MeshDistanceMaterial();
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
            ret = new LineBasicMaterial();
            break;
        case 'LineDashedMaterial':
            ret = new Material(MaterialType.LINE_DASHED);
            const m2 = material as THREE.LineDashedMaterial;
            break;
        case 'MeshBasicMaterial':
            ret = new Material(MaterialType.MESH_BASIC);
            break;
        case 'MeshDepthMaterial':
            ret = new Material(MaterialType.MESH_DEPTH);
            break;
        case 'MeshDistanceMaterial':
            ret = new Material(MaterialType.MESH_DISTANCE);
            break;
        case 'MeshStandardMaterial':
            ret = new Material(MaterialType.MESH_STANDARD);
            break;
        default:
            console.error('Unknown material.');
            ret = new Material(MaterialType.MESH_STANDARD);
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
}

export class LineBasicMaterial extends Material {
    public get colour(): THREE.Color {
        return (this.material as THREE.LineBasicMaterial).color;
    }
    public set colour(value: THREE.Color) {
        (this.material as THREE.LineBasicMaterial).color = value;
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
    public get alphaMap(): THREE.Texture {
        return (this.material as THREE.MeshBasicMaterial).alphaMap;
    }
    public set alphaMap(value: THREE.Texture) {
        (this.material as THREE.MeshBasicMaterial).alphaMap = value;
    }
    public get aoMap(): THREE.Texture {
        return (this.material as THREE.MeshBasicMaterial).aoMap;
    }
    public set aoMap(value: THREE.Texture) {
        (this.material as THREE.MeshBasicMaterial).aoMap = value;
    }
    public get aoMapIntensity(): number {
        return (this.material as THREE.MeshBasicMaterial).aoMapIntensity;
    }
    public set aoMapIntensity(value: number) {
        (this.material as THREE.MeshBasicMaterial).aoMapIntensity = value;
    }
    public get colour(): THREE.Color {
        return (this.material as THREE.MeshBasicMaterial).color;
    }
    public set colour(value: THREE.Color) {
        (this.material as THREE.MeshBasicMaterial).color = value;
    }
    public get combine(): THREE.Combine {
        return (this.material as THREE.MeshBasicMaterial).combine;
    }
    public set combine(value: THREE.Combine) {
        (this.material as THREE.MeshBasicMaterial).combine = value;
    }
    public get envMap(): THREE.Texture {
        return (this.material as THREE.MeshBasicMaterial).envMap;
    }
    public set envMap(value: THREE.Texture) {
        (this.material as THREE.MeshBasicMaterial).envMap = value;
    }
    public get map(): THREE.Texture {
        return (this.material as THREE.MeshBasicMaterial).map;
    }
    public set map(value: THREE.Texture) {
        (this.material as THREE.MeshBasicMaterial).map = value;
    }
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
    public get specularMap(): THREE.Texture {
        return (this.material as THREE.MeshBasicMaterial).specularMap;
    }
    public set specularMap(value: THREE.Texture) {
        (this.material as THREE.MeshBasicMaterial).specularMap = value;
    }
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

    public clone(): MeshBasicMaterial {
        const ret = new MeshBasicMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshBasicMaterial): void {
        super.copy(material);
        this.alphaMap = material.alphaMap;
        this.aoMap = material.aoMap;
        this.aoMapIntensity = material.aoMapIntensity;
        this.colour = material.colour;
        this.combine = material.combine;
        this.envMap = material.envMap;
        this.map = material.map;
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
