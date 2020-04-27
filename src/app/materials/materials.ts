import { Material } from './material';

export class Materials {
    public name = 'Materials';
    public materials = new Array<Material>();

    public clone(): Materials {
        console.error('Not implemented.');
        return null;
    }
}
