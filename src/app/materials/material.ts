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
            ret = new LineDashedMaterial();
            break;
        case 'MeshBasicMaterial':
            ret = new MeshBasicMaterial();
            break;
        case 'MeshDepthMaterial':
            ret = new MeshDepthMaterial();
            break;
        case 'MeshLambertMaterial':
            ret = new MeshLambertMaterial();
            break;
        case 'MeshMatcapMaterial':
            ret = new MeshMatcapMaterial();
            break;
        case 'MeshNormalMaterial':
            ret = new MeshNormalMaterial();
            break;
        case 'MeshPhongMaterial':
            ret = new MeshPhongMaterial();
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
    public get colour(): THREE.Color {
        return (this.material as THREE.MeshLambertMaterial).color;
    }
    public set colour(value: THREE.Color) {
        (this.material as THREE.MeshLambertMaterial).color = value;
    }
    public get combine(): THREE.Combine {
        return (this.material as THREE.MeshLambertMaterial).combine;
    }
    public set combine(value: THREE.Combine) {
        (this.material as THREE.MeshLambertMaterial).combine = value;
    }
    public get emissive(): THREE.Color {
        return (this.material as THREE.MeshLambertMaterial).emissive;
    }
    public set emissive(value: THREE.Color) {
        (this.material as THREE.MeshLambertMaterial).emissive = value;
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
    public get colour(): THREE.Color {
        return (this.material as THREE.MeshMatcapMaterial).color;
    }
    public set colour(value: THREE.Color) {
        (this.material as THREE.MeshMatcapMaterial).color = value;
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
    public get alphaMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).alphaMap;
    }
    public set alphaMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).alphaMap = value;
    }
    public get aoMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).aoMap;
    }
    public set aoMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).aoMap = value;
    }
    public get aoMapIntensity(): number {
        return (this.material as THREE.MeshPhongMaterial).aoMapIntensity;
    }
    public set aoMapIntensity(value: number) {
        (this.material as THREE.MeshPhongMaterial).aoMapIntensity = value;
    }
    public get bumpMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).bumpMap;
    }
    public set bumpMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).bumpMap = value;
    }
    public get bumpScale(): number {
        return (this.material as THREE.MeshPhongMaterial).bumpScale;
    }
    public set bumpScale(value: number) {
        (this.material as THREE.MeshPhongMaterial).bumpScale = value;
    }
    public get colour(): THREE.Color {
        return (this.material as THREE.MeshPhongMaterial).color;
    }
    public set colour(value: THREE.Color) {
        (this.material as THREE.MeshPhongMaterial).color = value;
    }
    public get combine(): THREE.Combine {
        return (this.material as THREE.MeshPhongMaterial).combine;
    }
    public set combine(value: THREE.Combine) {
        (this.material as THREE.MeshPhongMaterial).combine = value;
    }
    public get displacementMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).displacementMap;
    }
    public set displacementMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).displacementMap = value;
    }
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
    public get emissive(): THREE.Color {
        return (this.material as THREE.MeshPhongMaterial).emissive;
    }
    public set emissive(value: THREE.Color) {
        (this.material as THREE.MeshPhongMaterial).emissive = value;
    }
    public get emissiveMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).emissiveMap;
    }
    public set emissiveMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).emissiveMap = value;
    }
    public get emissiveIntensity(): number {
        return (this.material as THREE.MeshPhongMaterial).emissiveIntensity;
    }
    public set emissiveIntensity(value: number) {
        (this.material as THREE.MeshPhongMaterial).emissiveIntensity = value;
    }
    public get envMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).envMap;
    }
    public set envMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).envMap = value;
    }
    public get lightMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).lightMap;
    }
    public set lightMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).lightMap = value;
    }
    public get lightMapIntensity(): number {
        return (this.material as THREE.MeshPhongMaterial).lightMapIntensity;
    }
    public set lightMapIntensity(value: number) {
        (this.material as THREE.MeshPhongMaterial).lightMapIntensity = value;
    }
    public get map(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).map;
    }
    public set map(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).map = value;
    }
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
    public get normalMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).normalMap;
    }
    public set normalMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).normalMap = value;
    }
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
    public get specular(): THREE.Color {
        return (this.material as THREE.MeshPhongMaterial).specular;
    }
    public set specular(value: THREE.Color) {
        (this.material as THREE.MeshPhongMaterial).specular = value;
    }
    public get specularMap(): THREE.Texture {
        return (this.material as THREE.MeshPhongMaterial).specularMap;
    }
    public set specularMap(value: THREE.Texture) {
        (this.material as THREE.MeshPhongMaterial).specularMap = value;
    }
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

    public clone(): MeshPhongMaterial {
        const ret = new MeshPhongMaterial();
        ret.copy(this);

        return ret;
    }

    public copy(material: MeshPhongMaterial): void {
        super.copy(material);
        this.alphaMap = material.alphaMap;
        this.aoMap = material.aoMap;
        this.aoMapIntensity = material.aoMapIntensity;
        this.bumpMap = material.bumpMap;
        this.bumpScale = material.bumpScale;
        this.colour = material.colour;
        this.combine = material.combine;
        this.displacementMap = material.displacementMap;
        this.displacementScale = material.displacementScale;
        this.displacementBias = material.displacementBias;
        this.emissive = material.emissive;
        this.emissiveMap = material.emissiveMap;
        this.emissiveIntensity = material.emissiveIntensity;
        this.envMap = material.envMap;
        this.lightMap = material.lightMap;
        this.lightMapIntensity = material.lightMapIntensity;
        this.map = material.map;
        this.morphNormals = material.morphNormals;
        this.morphTargets = material.morphTargets;
        this.normalMap = material.normalMap;
        this.normalMapType = material.normalMapType;
        this.normalScale = material.normalScale;
        this.reflectivity = material.reflectivity;
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
