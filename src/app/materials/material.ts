import { MaterialType } from './material-type.enum';
import * as THREE from 'three';
import { MaterialLibrary } from './material-library';

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
    bumpMap: THREE.Texture;
    bumpScale = 1;
    combine: number;
    emissiveMap: THREE.Texture;
    emissiveIntensity = 1;
    envMap: THREE.Texture;
    envMapIntensity = 1;
    lightMap: THREE.Texture;
    lightMapIntensity = 1;
    map: THREE.Texture;
    metalness = 0.5;
    metallnesMap: THREE.Texture;
    morphNormals = false;
    morphTargets = false;
    normalMap: THREE.Texture;
    normalMapType = THREE.TangentSpaceNormalMap;
    normalScale = new THREE.Vector2(1, 1);
    reflectivity = 1;
    refractionRatio = 0.98;
    roughness = 0.5;
    roughnessMap: THREE.Texture;
    skinning = false;
    specularMap: THREE.Texture;
    wireframe = false;
    // wireframeLineWidth = 1;
    depthPacking = THREE.BasicDepthPacking;
    displacementMap: THREE.Texture;
    displacementScale = 1;
    displacementBias = 0;

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
    hasBumpMap = false;
    hasBumpScale = false;
    hasCombine = false;
    hasEmissiveMap = false;
    hasEmissiveIntensity = false;
    hasEnvMap = false;
    hasEnvMapIntensity = false;
    hasLightMap = false;
    hasLightMapIntensity = false;
    hasMap = false;
    hasMetalness = false;
    hasMetalnessMap = false;
    hasMorphNormals = false;
    hasMorphTargets = false;
    hasNormalMap = false;
    hasNormalMapType = false;
    hasNormalScale = false;
    hasReflectivity = false;
    hasRefractionRatio = false;
    hasRoughness = false;
    hasRoughnessMap = false;
    hasSkinning = false;
    hasSpecularMap = false;
    hasWireframe = false;
    hasDepthPacking = false;
    hasDisplacementMap = false;
    hasDisplacementScale = false;
    hasDisplacementBias = false;

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
            this.hasAlphaMap = true;
            this.hasAoMap = true;
            this.hasAoMapIntensity = true;
            this.hasCombine = true;
            this.hasEnvMap = true;
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
            this.hasDepthPacking = true;
            this.hasDisplacementMap = true;
            this.hasDisplacementScale = true;
            this.hasDisplacementBias = true;
            this.hasWireframe = true;
            this.hasLineWidth = true;
            this.material = new THREE.MeshDepthMaterial();
            break;
        case MaterialType.MESH_DISTANCE:
            this.hasDisplacementMap = true;
            this.hasDisplacementScale = true;
            this.hasDisplacementMap = true;
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
            this.hasColour = true;
            this.hasLineWidth = true;
            this.hasAlphaMap = true;
            this.hasAoMap = true;
            this.hasAoMapIntensity = true;
            this.hasBumpMap = true;
            this.hasBumpScale = true;
            this.hasDisplacementMap = true;
            this.hasDisplacementScale = true;
            this.hasDisplacementBias = true;
            this.hasEmissive = true;
            this.hasEmissiveMap = true;
            this.hasEmissiveIntensity = true;
            this.hasEnvMap = true;
            this.hasEnvMapIntensity = true;
            this.hasLightMap = true;
            this.hasLightMapIntensity = true;
            this.hasMap = true;
            this.hasMetalness = true;
            this.hasMetalnessMap = true;
            this.hasMorphNormals = true;
            this.hasMorphTargets = true;
            this.hasNormalMap = true;
            this.hasNormalMapType = true;
            this.hasNormalScale = true;
            this.hasReflectivity = true;
            this.hasRefractionRatio = true;
            this.hasRoughness = true;
            this.hasRoughnessMap = true;
            this.hasSkinning = true;
            this.hasSpecularMap = true;
            this.hasWireframe = true;
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
            ret.linewidth = m1.linewidth;
            ret.colour = m1.color.getStyle();
            break;
        case 'LineDashedMaterial':
            ret = new Material(MaterialType.LINE_DASHED);
            const m2 = mat as THREE.LineDashedMaterial;
            ret.linewidth = m2.linewidth;
            ret.colour = m2.color.getStyle();
            ret.dashSize = m2.dashSize;
            ret.gapSize = m2.gapSize;
            ret.scale = m2.scale;
            break;
        case 'MeshBasicMaterial':
            ret = new Material(MaterialType.MESH_BASIC);
            const m3 = mat as THREE.MeshBasicMaterial;
            ret.linewidth = m3.wireframeLinewidth;
            ret.colour = m3.color.getStyle();
            ret.alphaMap = m3.alphaMap;
            ret.aoMap = m3.aoMap;
            ret.aoMapIntensity = m3.aoMapIntensity;
            ret.combine = m3.combine;
            ret.envMap = m3.envMap;
            ret.map = m3.map;
            ret.morphTargets = m3.morphTargets;
            ret.reflectivity = m3.reflectivity;
            ret.refractionRatio = m3.refractionRatio;
            ret.skinning = m3.skinning;
            ret.specularMap = m3.specularMap;
            ret.wireframe = m3.wireframe;
            break;
        case 'MeshDepthMaterial':
            ret = new Material(MaterialType.MESH_DEPTH);
            const m4 = mat as THREE.MeshDepthMaterial;
            ret.linewidth = m4.wireframeLinewidth;
            ret.depthPacking = m4.depthPacking;
            ret.displacementMap = m4.displacementMap;
            ret.displacementScale = m4.displacementScale;
            ret.displacementBias = m4.displacementBias;
            ret.wireframe = m4.wireframe;
            break;
        case 'MeshDistanceMaterial':
            ret = new Material(MaterialType.MESH_DISTANCE);
            const m = mat as THREE.MeshDistanceMaterial;
            ret.displacementMap = m.displacementMap;
            ret.displacementScale = m.displacementScale;
            ret.displacementBias = m.displacementBias;
            break;
        case 'MeshStandardMaterial':
            ret = new Material(MaterialType.MESH_STANDARD);
            const m5 = mat as THREE.MeshStandardMaterial;
            ret.alphaMap = m5.alphaMap;
            ret.aoMap = m5.aoMap;
            ret.aoMapIntensity = m5.aoMapIntensity;
            ret.bumpMap = m5.bumpMap;
            ret.bumpScale = m5.bumpScale;
            ret.colour = m5.color.getStyle();
            ret.displacementMap = m5.displacementMap;
            ret.displacementScale = m5.displacementScale;
            ret.displacementBias = m5.displacementBias;
            ret.emissive = m5.emissive.getStyle();
            ret.emissiveMap = m5.emissiveMap;
            ret.emissiveIntensity = m5.emissiveIntensity;
            ret.envMap = m5.envMap;
            ret.envMapIntensity = m5.envMapIntensity;
            ret.lightMap = m5.lightMap;
            ret.lightMapIntensity = m5.lightMapIntensity;
            ret.map = m5.map;
            ret.metalness = m5.metalness;
            ret.metallnesMap = m5.metalnessMap;
            ret.morphNormals = m5.morphNormals;
            ret.morphTargets = m5.morphTargets;
            ret.normalMap = m5.normalMap;
            ret.normalMapType = m5.normalMapType;
            ret.normalScale = m5.normalScale;
            ret.refractionRatio = m5.refractionRatio;
            ret.roughness = m5.roughness;
            ret.roughnessMap = m5.roughnessMap;
            ret.skinning = m5.skinning;
            ret.wireframe = m5.wireframe;
            ret.linewidth = m5.wireframeLinewidth;
            break;
        default:
            console.error('Unknown material.');
            ret = new Material(MaterialType.MESH_STANDARD);
            break;
        }

        this.setCommonProperties(ret, mat);

        return ret;
    }

    private static setCommonProperties(m: Material, mat: THREE.Material) {
        m.material = mat;
        m.alphaTest = mat.alphaTest;
        m.blendDst = mat.blendDst;
        m.blendDstAlpha = mat.blendDstAlpha;
        m.blendEquation = mat.blendEquation;
        m.blendEquationAlpha = mat.blendEquationAlpha;
        m.blending = mat.blending;
        m.blendSrc = mat.blendSrc;
        m.blendSrcAlpha = mat.blendSrcAlpha;
        m.clipIntersection = mat.clipIntersection;
        m.clippingPlanes = mat.clippingPlanes;
        m.clipShadows = mat.clipShadows;
        m.colourWrite = mat.colorWrite;
        m.depthFunc = mat.depthFunc;
        m.depthTest = mat.depthTest;
        m.depthWrite = mat.depthWrite;
        m.stencilWrite = mat.stencilWrite;
        m.stencilMask = mat.stencilMask;
        m.stencilFunc = mat.stencilFunc;
        m.stencilRef = mat.stencilRef;
        m.stencilFail = mat.stencilFail;
        m.stencilZFail = mat.stencilZFail;
        m.stencilZPass = mat.stencilZPass;
        m.flatShading = mat.flatShading;
        m.fog = mat.fog;
        m.name = mat.name;
        m.opacity = mat.opacity;
        m.polygonOffset = mat.polygonOffset;
        m.polygonOffsetFactor = mat.polygonOffsetFactor;
        m.polygonOffsetUnits = mat.polygonOffsetUnits;
        m.precision = mat.precision;
        m.premultipliedAlpha = mat.premultipliedAlpha;
        m.dithering = mat.dithering;
        m.side = mat.side;
        m.toneMapped = mat.toneMapped;
        m.transparent = mat.transparent;
        m.vertexColors = mat.vertexColors;
        m.vertexTangents = mat.vertexTangents;
        m.visible = mat.visible;
    }

    clone(): Material {
        console.error('Not implemented.');
        return null;
    }
}
