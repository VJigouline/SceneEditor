import { MaterialType } from './material-type.enum';
import * as THREE from 'three';

export class Material {
    // properties
    alphaTest = 0;
    blendDst = THREE.OneMinusSrcAlphaFactor;
    blendDstAlpha: number;
    blendEquation = THREE.AddEquation;
    blendEquationAlpha: number;
    blending = THREE.NormalBlending;
    blendSrc: number = THREE.SrcAlphaFactor;
    blendSrcAlpha: number;
    clipIntersection = false;
    clippingPlanes: THREE.Plane[];
    clipShadows = true;
    colourWrite = true;
    depthFunc = THREE.LessEqualDepth;
    depthTest = true;
    depthWrite = true;
    stencilWrite = false;
    stencilMask = 0xFF;
    stencilFunc = THREE.AlwaysStencilFunc;
    stencilRef = 0;
    stencilFail = THREE.KeepStencilOp;
    stencilZFail = THREE.KeepStencilOp;
    stencilZPass = THREE.KeepStencilOp;
    flatShading = false;
    fog = true;
    name = '';
    opacity = 1;
    polygonOffset = false;
    polygonOffsetFactor = 0;
    polygonOffsetUnits = 0;
    precision: string;
    premultipliedAlpha = false;
    dithering = false;
    side = THREE.FrontSide;
    toneMapped = true;
    transparent = false;
    vertexColors = THREE.NoColors;
    vertexTangents = false;
    visible = true;

    linewidth = 1;
    dashSize = 3;
    gapSize = 1;
    scale = 1;
    type: MaterialType;
    colour: string;
    specular: string;
    emissive: string;
    shininess: number;

    alphaMap: THREE.Texture;
    aoMap: THREE.Texture;
    aoMapIntensity = 1;
    combine: number;
    envMap: THREE.Texture;
    lightMap: THREE.Texture;
    lightMapIntensity = 1;
    map: THREE.Texture;
    morphTargets = false;
    reflectivity = 1;
    refractionRatio = 0.98;
    skinning = false;
    specularMap: THREE.Texture;
    wireframe = false;
    // wireframeLineWidth = 1;

    // availability.
    hasLineWidth = false;
    hasDashSize = false;
    hasGapSize = false;
    hasScale = false;
    hasColour = false;
    hasSpecular = false;
    hasEmissive = false;
    hasShininess = false;
    hasAlphaMap = false;
    hasAoMap = false;
    hasAoMapIntensity = false;
    hasCombine = false;
    hasEnvMap = false;
    hasLightMap = false;
    hasLightMapIntensity = false;
    hasMap = false;
    hasMorphTargets = false;
    hasReflectivity = false;
    hasRefractionRatio = false;
    hasSkinning = false;
    hasSpecularMap = false;
    hasWireframe = false;

    // ThreeJS material
    material: THREE.Material;

    constructor(type: MaterialType) {
        this.type = type;
        switch (this.type) {
        case MaterialType.LINE_BASIC:
            this.hasColour = true;
            this.hasLineWidth = true;
            this.material = new THREE.LineBasicMaterial();
            break;
        case MaterialType.LINE_DASHED:
            this.hasColour = true;
            this.hasLineWidth = true;
            this.hasDashSize = true;
            this.hasGapSize = true;
            this.hasScale = true;
            this.material = new THREE.LineDashedMaterial();
            break;
        case MaterialType.MESH_BASIC:
                this.hasColour = true;
                this.hasLineWidth = true;
                this.hasLineWidth = true;
                this.hasDashSize = true;
                this.hasGapSize = true;
                this.hasScale = true;
                this.hasSpecular = true;
                this.hasEmissive = true;
                this.hasShininess = true;
                this.hasAlphaMap = true;
                this.hasAoMap = true;
                this.hasAoMapIntensity = true;
                this.hasCombine = true;
                this.hasEnvMap = true;
                this.hasLightMap = true;
                this.hasLightMapIntensity = true;
                this.hasMap = true;
                this.hasMorphTargets = true;
                this.hasReflectivity = true;
                this.hasRefractionRatio = true;
                this.hasSkinning = true;
                this.hasSpecularMap = true;
                this.hasWireframe = true;
                this.material = new THREE.MeshBasicMaterial();
                break;
        case MaterialType.MESH_DEPTH:
            break;
        case MaterialType.MESH_DISTANCE:
            break;
        case MaterialType.MESH_LAMBERT:
            break;
        case MaterialType.MESH_MATCAP:
            break;
        case MaterialType.MESH_NORMAL:
            break;
        case MaterialType.MESH_PHISICAL:
            break;
        case MaterialType.MESH_PHONG:
            break;
        case MaterialType.MESH_STANDARD:
            break;
        case MaterialType.MESH_TOON:
            break;
        case MaterialType.POINTS:
            break;
        case MaterialType.SHADOW:
            break;
        case MaterialType.SPRITE:
            break;
        default:
            console.error('Invalid material type.');
            break;
        }
    }

    create(mat: THREE.Material): Material {

        let ret: Material;

        this.alphaTest = mat.alphaTest;
        this.blendDst = mat.blendDst;
        this.blendDstAlpha = mat.blendDstAlpha;
        this.blendEquation = mat.blendEquation;
        this.blendEquationAlpha = mat.blendEquationAlpha;
        this.blending = mat.blending;
        this.blendSrc = mat.blendSrc;
        this.blendSrcAlpha = mat.blendSrcAlpha;
        this.clipIntersection = mat.clipIntersection;
        this.clippingPlanes = mat.clippingPlanes;
        this.clipShadows = mat.clipShadows;
        this.colourWrite = mat.colorWrite;
        this.depthFunc = mat.depthFunc;
        this.depthTest = mat.depthTest;
        this.depthWrite = mat.depthWrite;
        this.stencilWrite = mat.stencilWrite;
        this.stencilMask = mat.stencilMask;
        this.stencilFunc = mat.stencilFunc;
        this.stencilRef = mat.stencilRef;
        this.stencilFail = mat.stencilFail;
        this.stencilZFail = mat.stencilZFail;
        this.stencilZPass = mat.stencilZPass;
        this.flatShading = mat.flatShading;
        this.fog = mat.fog;
        this.name = mat.name;
        this.opacity = mat.opacity;
        this.polygonOffset = mat.polygonOffset;
        this.polygonOffsetFactor = mat.polygonOffsetFactor;
        this.polygonOffsetUnits = mat.polygonOffsetUnits;
        this.precision = mat.precision;
        this.premultipliedAlpha = mat.premultipliedAlpha;
        this.dithering = mat.dithering;
        this.side = mat.side;
        this.toneMapped = mat.toneMapped;
        this.transparent = mat.transparent;
        this.vertexColors = mat.vertexColors;
        this.vertexTangents = mat.vertexTangents;
        this.visible = mat.visible;

        switch (mat.type) {
        case 'LineBasicMaterial':
            ret = new Material(MaterialType.LINE_BASIC);
            const m = mat as THREE.LineBasicMaterial;
            ret.linewidth = m.linewidth;
            ret.colour = m.color.getStyle();
            break;
        default:
            console.error('Unknown material.');
        }

        return ret;
    }
}
