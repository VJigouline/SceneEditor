import { Point2 } from './point2';
import { Polygon3 } from './polygon3';
import { Transform3 } from './transform3';

export class Polygon2 {
    public Vertices = new Array<Point2>();
    public Holes = new Array<Polygon2>();

    public unProject(tra: Transform3): Polygon3 {
        const ret = new Polygon3();

        for (const p of this.Vertices) {
            ret.Vertices.push(tra.Origin.clone().add(tra.XVec.clone().multiply(p.X))
            .add(tra.YVec.multiply(p.Y)));
        }

        if (this.Holes) {
            for (const h of this.Holes) { ret.Holes.push(h.unProject(tra)); }
        }

        return ret;
    }
}
