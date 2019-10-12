import { LightType } from './light-type.enum';
import { uuid } from 'uuid';
import * as THREE from 'three';

export class Light {
    name: string;
    type: LightType;
    light: THREE.Light;

    constructor(type: LightType) {
        this.name = uuid();

        switch(type) {
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
}
