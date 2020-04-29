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
            ret = new Material(MaterialType.LINE_BASIC);
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
