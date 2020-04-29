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
                let l = new Light(light.type);
                switch (light.type) {
                    case LightType.DIRECTIONAL:
                        l = new DirectionalLight();
                        const dl = l as DirectionalLight;
                        (light as DirectionalLight).clone = dl.clone.bind(light);
                        break;
                    case LightType.POINT:
                        l = new PointLight();
                        const pl = l as PointLight;
                        (light as PointLight).clone = pl.clone.bind(light);
                        break;
                    case LightType.HEMISPHERE:
                        l = new HemisphereLight();
                        const hl = l as HemisphereLight;
                        (light as HemisphereLight).clone = hl.clone.bind(light);
                        break;
                    case LightType.SPOT:
                        l = new SpotLight();
                        const sl = l as SpotLight;
                        (light as SpotLight).clone = sl.clone.bind(light);
                        break;
                }
                light.clone = l.clone.bind(light);
            }
            ret.lights.push(light.clone());
        }

        return ret;
    }
}
