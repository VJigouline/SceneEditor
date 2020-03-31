import { LightType } from './light-type.enum';
import { v4 as uuid } from 'uuid';
import * as THREE from 'three';

export class Light {
    name: string;
    type: LightType;
    light: THREE.Light;

    constructor(type: LightType) {
        this.name = uuid();
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
