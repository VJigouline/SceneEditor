import { LightType } from './light-type.enum';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';
import { Point3 } from '../geometries/point3';

class LightExport {
    private type: LightType;
    private name: string;
    private intensity: number;
    private colour: string;

    constructor(light: Light) {
        this.type = light.type;
        this.name = light.name;
        this.intensity = light.intensity;
        this.colour = light.colour;
    }
}

class AmbientLightExport extends LightExport {
    constructor(light: Light) {
        super(light);
    }
}

class DirectionalLightExport extends LightExport {
    private position: Point3;
    private target: Point3;
    private castShadow: boolean;

    constructor(light: DirectionalLight) {
        super(light);
        this.position = light.position;
        this.target = light.target;
        this.castShadow = light.castShadow;
    }
}

class SpotLightExport extends LightExport {
    private position: Point3;
    private target: Point3;
    private castShadow: boolean;
    private angle: number;
    private decay: number;
    private penumbra: number;
    private distance: number;
    private power: number;

    constructor(light: SpotLight) {
        super(light);
        this.position = light.position;
        this.target = light.target;
        this.castShadow = light.castShadow;
        this.angle = light.angle;
        this.decay = light.decay;
        this.penumbra = light.penumbra;
        this.distance = light.distance;
    }
}

class PointLightExport extends LightExport {
    private position: Point3;
    private castShadow: boolean;
    private decay: number;
    private distance: number;

    constructor(light: PointLight) {
        super(light);
        this.position = light.position;
        this.castShadow = light.castShadow;
        this.decay = light.decay;
        this.distance = light.distance;
    }
}

class HemisphereLightExport extends LightExport {
    private position: Point3;
    private castShadow: boolean;
    private groundColour: string;

    constructor(light: HemisphereLight) {
        super(light);
        this.position = light.position;
        this.castShadow = light.castShadow;
        this.groundColour = light.groundColour;
    }
}

export class Light {
    type: LightType;
    public light: THREE.Light;

    public get name(): string { return this.light == null ? '' : this.light.name; }
    public set name(value: string) { this.light.name = value; }
    public get intensity(): number { return this.light == null ? 0 : this.light.intensity; }
    public set intensity(value: number) { this.light.intensity = value; }
    public get colour(): string { return this.light == null ? '#ffffff' : '#' + this.light.color.getHexString(); }
    public set colour(value: string) { this.light.color = new THREE.Color(value); }
    public get position(): Point3 {
        switch (this.type) {
            case LightType.DIRECTIONAL:
                const l = this.light as THREE.DirectionalLight;
                return new Point3(l.position.x, l.position.y, l.position.z);
            case LightType.HEMISPHERE:
                const hl = this.light as THREE.HemisphereLight;
                return new Point3(hl.position.x, hl.position.y, hl.position.z);
            case LightType.POINT:
                const pl = this.light as THREE.PointLight;
                return new Point3(pl.position.x, pl.position.y, pl.position.z);
            case LightType.SPOT:
                const sl = this.light as THREE.SpotLight;
                return new Point3(sl.position.x, sl.position.y, sl.position.z);
        }
        return new Point3(0, 0, 0);
    }
    public set position(value: Point3) {
        switch (this.type) {
            case LightType.DIRECTIONAL:
                const l = this.light as THREE.DirectionalLight;
                l.position.set(value.X, value.Y, value.Z);
                break;
            case LightType.HEMISPHERE:
                const hl = this.light as THREE.HemisphereLight;
                hl.position.set(value.X, value.Y, value.Z);
                break;
            case LightType.POINT:
                const pl = this.light as THREE.PointLight;
                pl.position.set(value.X, value.Y, value.Z);
                break;
            case LightType.SPOT:
                const sl = this.light as THREE.SpotLight;
                sl.position.set(value.X, value.Y, value.Z);
                break;
        }
    }
    public get target(): Point3 {
        switch (this.type) {
            case LightType.DIRECTIONAL:
                const l = this.light as THREE.DirectionalLight;
                return new Point3(l.target.position.x, l.target.position.y, l.target.position.z);
            case LightType.SPOT:
                const sl = this.light as THREE.SpotLight;
                return new Point3(sl.target.position.x, sl.target.position.y, sl.target.position.z);
        }
        return new Point3(0, 0, 0);
    }
    public set target(value: Point3) {
        switch (this.type) {
            case LightType.DIRECTIONAL:
                const l = this.light as THREE.DirectionalLight;
                l.target.position.set(value.X, value.Y, value.Z);
                break;
            case LightType.SPOT:
                const sl = this.light as THREE.SpotLight;
                sl.target.position.set(value.X, value.Y, value.Z);
                break;
        }
    }

    constructor(type: LightType) {
        this.type = type;

        switch (type) {
            case LightType.AMBIENT:
                this.light = new THREE.AmbientLight();
                break;
            case LightType.DIRECTIONAL:
                this.light = new THREE.DirectionalLight();
                break;
            case LightType.HEMISPHERE:
                this.light = new THREE.HemisphereLight();
                break;
            case LightType.POINT:
                this.light = new THREE.PointLight();
                break;
            case LightType.RECT_AREA:
                this.light = new THREE.RectAreaLight();
                break;
            case LightType.SPOT:
                this.light = new THREE.SpotLight();
                break;
            default:
                console.error('Invalid light type');
                break;
        }

        this.name = uuid();
    }

    public static CreateLight(light: THREE.Light): Light {
        let ret: Light = null;

        switch (light.type) {
            case 'AmbientLight':
                ret = new Light(LightType.AMBIENT);
                break;
            case 'DirectionalLight':
                ret = new DirectionalLight();
                break;
            case 'HemisphereLight':
                ret = new HemisphereLight();
                break;
            case 'PointLight':
                ret = new PointLight();
                break;
            case 'RectAreaLight':
                ret = new Light(LightType.RECT_AREA);
                break;
            case 'SpotLight':
                ret = new SpotLight();
                break;
            default:
                console.error(`Unknown light type: ${light.type}`);
                break;
        }

        if (ret) {
            ret.light = light;
            if (light && light.name && light.name.length > 0) {
                ret.name = light.name;
            }
        }

        return ret;
    }

    public toJSON(): LightExport {
        switch (this.type) {
            case LightType.AMBIENT:
                return new AmbientLightExport(this);
            case LightType.DIRECTIONAL:
                return new DirectionalLightExport(this as unknown as DirectionalLight);
            case LightType.SPOT:
                return new SpotLightExport(this as unknown as SpotLight);
            case LightType.POINT:
                return new PointLightExport(this as unknown as PointLight);
            case LightType.HEMISPHERE:
                return new HemisphereLightExport(this as unknown as HemisphereLight);
        }

        return null;
    }

    public clone(): Light {
        const ret = new Light(this.type);
        ret.copy(this);

        return ret;
    }

    public copy(light: Light): void {
        this.name = light.name;
        this.intensity = light.intensity;
        this.colour = light.colour;
        this.position = light.position;
        this.target = light.target;
    }
}

export class DirectionalLight extends Light {
    public get castShadow(): boolean {
        return (this.light as THREE.DirectionalLight).castShadow;
    }
    public set castShadow(value: boolean) {
        (this.light as THREE.DirectionalLight).castShadow = value;
    }

    constructor() {
        super(LightType.DIRECTIONAL);
    }

    public clone(): DirectionalLight {
        const ret = new DirectionalLight();
        ret.copy(this);

        return ret;
    }

    public copy(light: DirectionalLight): void {
        super.copy(light);
        this.castShadow = light.castShadow;
    }
}

export class SpotLight extends Light {
    public get castShadow(): boolean {
        return (this.light as THREE.SpotLight).castShadow;
    }
    public set castShadow(value: boolean) {
        (this.light as THREE.SpotLight).castShadow = value;
    }
    public get angle(): number {
        return (this.light as THREE.SpotLight).angle;
    }
    public set angle(value: number) {
        (this.light as THREE.SpotLight).angle = value;
    }
    public get decay(): number {
        return (this.light as THREE.SpotLight).decay;
    }
    public set decay(value: number) {
        (this.light as THREE.SpotLight).decay = value;
    }
    public get distance(): number {
        return (this.light as THREE.SpotLight).distance;
    }
    public set distance(value: number) {
        (this.light as THREE.SpotLight).distance = value;
    }
    public get penumbra(): number {
        return (this.light as THREE.SpotLight).penumbra;
    }
    public set penumbra(value: number) {
        (this.light as THREE.SpotLight).penumbra = value;
    }
    public get power(): number {
        return (this.light as THREE.SpotLight).power;
    }
    public set power(value: number) {
        (this.light as THREE.SpotLight).power = value;
    }

    constructor() {
        super(LightType.SPOT);
    }

    public clone(): SpotLight {
        const ret = new SpotLight();
        ret.copy(this);

        return ret;
    }

    public copy(light: SpotLight): void {
        super.copy(light);
        this.castShadow = light.castShadow;
        this.angle = light.angle;
        this.decay = light.decay;
        this.distance = light.distance;
        this.penumbra = light.penumbra;
    }
}

export class PointLight extends Light {
    public get castShadow(): boolean {
        return (this.light as THREE.PointLight).castShadow;
    }
    public set castShadow(value: boolean) {
        (this.light as THREE.PointLight).castShadow = value;
    }
    public get decay(): number {
        return (this.light as THREE.PointLight).decay;
    }
    public set decay(value: number) {
        (this.light as THREE.PointLight).decay = value;
    }
    public get distance(): number {
        return (this.light as THREE.PointLight).distance;
    }
    public set distance(value: number) {
        (this.light as THREE.PointLight).distance = value;
    }
    public get power(): number {
        return (this.light as THREE.PointLight).power;
    }
    public set power(value: number) {
        (this.light as THREE.PointLight).power = value;
    }

    constructor() {
        super(LightType.POINT);
    }

    public clone(): PointLight {
        const ret = new PointLight();
        ret.copy(this);

        return ret;
    }

    public copy(light: PointLight): void {
        super.copy(light);
        this.castShadow = light.castShadow;
        this.decay = light.decay;
        this.distance = light.distance;
    }
}

export class HemisphereLight extends Light {
    public get groundColour(): string {
        return this.light == null ? '#ffffff' :
            '#' + (this.light as THREE.HemisphereLight).groundColor.getHexString();
    }
    public set groundColour(value: string) {
        (this.light as THREE.HemisphereLight).groundColor = new THREE.Color(value);
    }
    public get castShadow(): boolean {
        return (this.light as THREE.HemisphereLight).castShadow;
    }
    public set castShadow(value: boolean) {
        (this.light as THREE.HemisphereLight).castShadow = value;
    }

    constructor() {
        super(LightType.HEMISPHERE);
    }

    public clone(): HemisphereLight {
        const ret = new HemisphereLight();
        ret.copy(this);

        return ret;
    }

    public copy(light: HemisphereLight): void {
        super.copy(light);
        this.castShadow = light.castShadow;
        this.groundColour = light.groundColour;
    }
}
