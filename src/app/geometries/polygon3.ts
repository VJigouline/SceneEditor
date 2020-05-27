import { Line3 } from './line3';
import { Point3 } from './point3';
import { Transform3 } from './transform3';
import { Vector3 } from './vector3';
import { Polygon2 } from './polygon2';
import { Point2 } from './point2';

export class Polygon3 {
    public Vertices = new Array<Point3>();
    public Holes = new Array<Polygon3>();

    public get Lines(): Line3[] {
        const ret = new Array<Line3>();

        for (let i = 0; i < this.Vertices.length; ++i) {
            ret.push(new Line3(this.Vertices[i],
                this.Vertices[(i + 1) % this.Vertices.length]));
        }
        return ret;
    }

    public get MiddlePoint(): Point3 {
        // Calculate approximate gravity centre.
        let x = 0;
        let y = 0;
        let z = 0;

        let  count = 0;
        for (const pt of this.Vertices) {
            x += pt.X;
            y += pt.Y;
            z += pt.Z;
            ++count;
        }
        return new Point3(x / count, y / count, z / count);
    }

    public get Transform(): Transform3 {
        let ret = new Transform3();

        if (!this.Vertices || !this.Vertices.length) {
            ret = Transform3.Identity;
        } else if (this.Vertices.length === 1) {
            ret = Transform3.Identity;
            ret.Origin = this.Vertices[0].clone();
        } else if (this.Vertices.length === 2) {
            let y = Vector3.DirY;
            const x = Point3.vector(this.Vertices[0], this.Vertices[1]).UnitVector;
            if (Math.abs(x.dot(y)) > 0.5) { y = Vector3.DirX; }
            ret = Transform3.XY(this.Vertices[0], x, y);
        } else {
            const origin = this.MiddlePoint;
            let normal = new Vector3(0, 0, 0);
            for (let i = 0; i < this.Vertices.length; i++) {
                const pt1 = this.Vertices[i];
                const pt2 = this.Vertices[(i + 1) % this.Vertices.length];
                const v1 = Point3.vector(origin, pt1);
                const v2 =  Point3.vector(origin, pt2);
                const n = v1.cross(v2);
                if (n.Length < 1e-6) { continue; }
                normal.add(n.UnitVector.multiply(Point3.vector(pt1, pt2).Length));
            }
            if (normal.Length < 1e-6) {
                normal = Vector3.DirZ;
            } else {
                normal = normal.UnitVector;
            }
            ret = Transform3.ZX(origin, normal, this.getXDirection());
        }

        return ret;
    }

    public Project(tra: Transform3): Polygon2 {
        const ret = new Polygon2();

        for (const pt of this.Vertices) {
            const v = Point3.vector(tra.Origin, pt);
            ret.Vertices.push(new Point2(v.dot(tra.XVec), v.dot(tra.YVec)));
        }

        if (this.Holes) {
            for (const h of this.Holes) { ret.Holes.push(h.Project(tra)); }
        }

        return ret;
    }

    private getXDirection(): Vector3 {
        const sides = new Array<Vector3>();
        const lengths = new Array<number>();
        for (const l of this.Lines) {
            const tol = 1e-6;
            if (l.Length < tol) { continue; }
            let found = false;
            const v = l.UnitVector;
            for (let i = 0; i < sides.length; ++i) {
                const s = sides[i];
                const d = Math.abs(s.dot(v));
                if (d < tol || Math.abs(1 - d) < tol) {
                    lengths[i] += l.Length;
                    found = true;
                    break;
                }
            }
            if (!found) {
                sides.push(v);
                lengths.push(l.Length);
            }
        }
        let min = 0;
        let ret: Vector3;
        for (let i = 0; i < sides.length; ++i) {
            if (lengths[i] > min) {
                min = lengths[i];
                ret = sides[i];
            }
        }

        return ret ? Vector3.DirX : ret;
    }
}
