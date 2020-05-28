import { Point3 } from './point3';
import { Vector3 } from './vector3';

export class Transform3 {
    public static get Identity(): Transform3 {
        return new Transform3 (
            new Point3(0, 0, 0),
            new Vector3(1, 0, 0),
            new Vector3(0, 1, 0),
            new Vector3(0, 0, 1)
        );
    }

    public get Inverted(): Transform3 {
        const ret = Transform3.XY(
            new Point3(0, 0, 0),
            new Vector3(this.XVec.X, this.YVec.X, this.ZVec.X),
            new Vector3(this.XVec.Y, this.YVec.Y, this.ZVec.Y)
        );

        const orig = new Point3(-this.Origin.X, -this.Origin.Y, -this.Origin.Z);
        ret.Origin = ret.point3(orig);

        return ret;
    }

    public XVec: Vector3;
    public YVec: Vector3;
    public ZVec: Vector3;
    public Origin: Point3;

    constructor(origin?: Point3, xvec?: Vector3, yvec?: Vector3, zvec?: Vector3) {
        this.Origin = origin ? origin.clone() : new Point3(0, 0, 0);
        this.XVec = xvec ? xvec.clone() : new Vector3(1, 0, 0);
        this.YVec = yvec ? yvec.clone() : new Vector3(0, 1, 0);
        this.ZVec = zvec ? zvec.clone() : new Vector3(0, 0, 1);
    }

    public static XY(origin: Point3, x: Vector3, y: Vector3): Transform3 {
        const xvec = x.UnitVector;
        const zvec = x.clone().cross(y).UnitVector;
        const yvec = zvec.clone().cross(x).UnitVector;

        return new Transform3(origin, xvec, yvec, zvec);
    }

    public static ZX(origin: Point3, z: Vector3, x: Vector3): Transform3 {
        const zvec = z.UnitVector;
        const yvec = z.clone().cross(x).UnitVector;
        const xvec = yvec.clone().cross(z).UnitVector;

        return new Transform3(origin, xvec, yvec, zvec);
    }

    public point3(point: Point3): Point3 {
        return this.Origin.clone().add(this.XVec.multiply(point.X))
        .add(this.YVec.multiply(point.Y)).add(this.ZVec.multiply(point.Z));
    }
}
