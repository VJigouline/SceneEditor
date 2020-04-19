import { Light, DirectionalLight, PointLight, HemisphereLight, SpotLight } from './light';
import { LightType } from './light-type.enum';

export class Lights {
    public name = 'Lights';
    public lights = new Array<Light>();

    public clone(): Lights {
        const ret = new Lights();
        ret.name = this.name;

        for (const light of this.lights) {
            if (!light.clone) {
                const l = new Light(light.type);
                light.clone = l.clone.bind(light);
                switch (light.type) {
                    case LightType.DIRECTIONAL:
                        const dl = l as DirectionalLight;
                        (light as DirectionalLight).clone = dl.clone.bind(light);
                        break;
                    case LightType.POINT:
                        const pl = l as PointLight;
                        (light as PointLight).clone = dl.clone.bind(light);
                        break;
                    case LightType.HEMISPHERE:
                        const hl = l as HemisphereLight;
                        (light as HemisphereLight).clone = dl.clone.bind(light);
                        break;
                    case LightType.SPOT:
                        const sl = l as SpotLight;
                        (light as SpotLight).clone = dl.clone.bind(light);
                        break;
                }
            }
            ret.lights.push(light.clone());
        }

        return ret;
    }
}
