import { Point3 } from './point3';
import { Transform3 } from './transform3';

export class Point2 {
    public X = 0;
    public Y = 0;

    constructor(x?: number, y?: number) {
        this.X = x ? x : 0;
        this.Y = y ? y : 0;
    }

    public static unProject(pts: Point2[], tra: Transform3): Point3[] {
        const ret = new Array<Point3>();

        for (const p of pts) { ret.push(p.unProject(tra)); }

        return ret;
    }

    public unProject(tra: Transform3): Point3 {
        return tra.Origin.clone().addVector(tra.XVec.clone().multiplyScalar(this.X))
        .addVector(tra.YVec.multiplyScalar(this.Y));
    }
}
