import { Lights } from './lights';

export class LightsLibrary {
    public name = 'Default';
    public lights = new Array<Lights>();
    public current = 0;

    public clone(): LightsLibrary {
        const ret = new LightsLibrary();
        const lights = new Lights();

        ret.name = this.name;
        ret.current = this.current;

        for (const ls of this.lights) {
            if (!ls.clone) {
                ls.clone = lights.clone.bind(ls);
            }
            ret.lights.push(ls.clone());
        }

        return ret;
    }
}
