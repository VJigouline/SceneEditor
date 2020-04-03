import { LightType } from './light-type.enum';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';

export class Light {
    public get name(): string { return this.light == null ? '' : this.light.name; }
    public set name(value: string) { this.light.name = value; }
    type: LightType;
    public light: THREE.Light;

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
                ret = new Light(LightType.AMBIENT);
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
