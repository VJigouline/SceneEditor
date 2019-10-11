import { LightType } from './light-type.enum';
import * as THREE from 'three';

export class Light {
    name: string;
    type: LightType;
    light: THREE.Light;
}
