import { Point3 } from './point3';
import { Vector3 } from './vector3';

export class Transform3 {
    public static get Identity(): Transform3 {
        return {
            XVec: new Vector3(1, 0, 0),
            YVec: new Vector3(0, 1, 0),
            ZVec: new Vector3(0, 0, 1),
            Origin: new Point3(0, 0, 0)
        };
    }

    public XVec: Vector3;
    public YVec: Vector3;
    public ZVec: Vector3;
    public Origin: Point3;

    public static XY(origin: Point3, x: Vector3, y: Vector3): Transform3 {
        const xvec = x.UnitVector;
        const zvec = x.cross(y).UnitVector;
        const yvec = zvec.cross(x).UnitVector;

        return { XVec: xvec, YVec: yvec, ZVec: zvec, Origin: origin };
    }

    public static ZX(origin: Point3, z: Vector3, x: Vector3): Transform3 {
        const zvec = z.UnitVector;
        const yvec = z.cross(x).UnitVector;
        const xvec = yvec.cross(z).UnitVector;

        return { XVec: xvec, YVec: yvec, ZVec: zvec, Origin: origin };
    }
}
