import { MaterialType } from './material-type.enum';
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
            break;
        case MaterialType.MESH_MATCAP:
            break;
        case MaterialType.MESH_NORMAL:
            break;
        case MaterialType.MESH_PHYSICAL:
            break;
        case MaterialType.MESH_PHONG:
            break;
        case MaterialType.MESH_STANDARD:
            this.material = new THREE.MeshStandardMaterial();
            break;
        case MaterialType.MESH_TOON:
            console.error('Not implemented.');
            break;
        case MaterialType.POINTS:
            console.error('Not implemented.');
            break;
        case MaterialType.SHADOW:
            console.error('Not implemented.');
            break;
        case MaterialType.SPRITE:
            console.error('Not implemented.');
            break;
        default:
            console.error('Invalid material type.');
            break;
        }
    }

    static create(mat: THREE.Material): Material {

        let ret: Material;

        switch (mat.type) {
        case 'LineBasicMaterial':
            ret = new Material(MaterialType.LINE_BASIC);
            const m1 = mat as THREE.LineBasicMaterial;
            break;
        case 'LineDashedMaterial':
            ret = new Material(MaterialType.LINE_DASHED);
            const m2 = mat as THREE.LineDashedMaterial;
            break;
        case 'MeshBasicMaterial':
            ret = new Material(MaterialType.MESH_BASIC);
            const m3 = mat as THREE.MeshBasicMaterial;
            break;
        case 'MeshDepthMaterial':
            ret = new Material(MaterialType.MESH_DEPTH);
            const m4 = mat as THREE.MeshDepthMaterial;
            break;
        case 'MeshDistanceMaterial':
            ret = new Material(MaterialType.MESH_DISTANCE);
            const m = mat as THREE.MeshDistanceMaterial;
            break;
        case 'MeshStandardMaterial':
            ret = new Material(MaterialType.MESH_STANDARD);
            const m5 = mat as THREE.MeshStandardMaterial;
            break;
        default:
            console.error('Unknown material.');
            ret = new Material(MaterialType.MESH_STANDARD);
            break;
        }

        return ret;
    }

    clone(): Material {
        console.error('Not implemented.');
        return null;
    }
}
