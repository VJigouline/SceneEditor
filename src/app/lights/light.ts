import { LightType } from './light-type.enum';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';
import { Point3 } from '../geometries/point3';

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
        }
        return new Point3(0, 0, 0);
    }
    public set position(value: Point3) {
        switch (this.type) {
            case LightType.DIRECTIONAL:
                const l = this.light as THREE.DirectionalLight;
                l.position.x = value.X;
                l.position.y = value.Y;
                l.position.z = value.Z;
                break;
        }
    }
    public get target(): Point3 {
        switch (this.type) {
            case LightType.DIRECTIONAL:
                const l = this.light as THREE.DirectionalLight;
                return new Point3(l.target.position.x, l.target.position.y, l.target.position.z);
        }
        return new Point3(0, 0, 0);
    }
    public set target(value: Point3) {
        switch (this.type) {
            case LightType.DIRECTIONAL:
                const l = this.light as THREE.DirectionalLight;
                l.target.position.x = value.X;
                l.target.position.y = value.Y;
                l.target.position.z = value.Z;
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
                ret = new Light(LightType.HEMISPHERE);
                break;
            case 'PointLight':
                ret = new Light(LightType.POINT);
                break;
            case 'RectAreaLight':
                ret = new Light(LightType.RECT_AREA);
                break;
            case 'SpotLight':
                ret = new Light(LightType.SPOT);
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
}
