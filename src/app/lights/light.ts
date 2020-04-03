import { LightType } from './light-type.enum';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';

export class Light {
    type: LightType;
    public light: THREE.Light;

    public get name(): string { return this.light == null ? '' : this.light.name; }
    public set name(value: string) { this.light.name = value; }
    public get intensity(): number { return this.light == null ? 0 : this.light.intensity; }
    public set intensity(value: number) { this.light.intensity = value; }
    public get colour(): string { return this.light == null ? '#ffffff' : '#' + this.light.color.getHexString(); }
    public set colour(value: string) { this.light.color = new THREE.Color(value); }

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
                ret = new Light(LightType.DIRECTIONAL);
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
