import { Point3 } from './point3';
import { Vector3 } from './vector3';

export class Line3 {
    public Start: Point3;
    public End: Point3;

    public get Direction(): Vector3 {
        return Point3.vector(this.Start, this.End);
    }
    public get UnitVector(): Vector3 { return this.Direction.UnitVector; }
    public get Length(): number { return this.Direction.Length; }

    constructor(point1: Point3, point2: Point3) {
        this.Start = point1.clone();
        this.End = point2.clone();
    }
}
