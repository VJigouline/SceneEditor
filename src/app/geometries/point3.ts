import { Vector3 } from './vector3';

export class Point3 {
    public X = 0;
    public Y = 0;
    public Z = 0;

    constructor(x?: number, y?: number, z?: number) {
        this.X = x ? x : 0;
        this.Y = y ? y : 0;
        this.Z = z ? z : 0;
    }

    public static vector(point1: Point3, point2: Point3): Vector3 {
        return new Vector3(point2.X - point1.X, point2.Y - point1.Y, point2.Z - point1.Z);
    }

    public add(vector: Vector3): Point3 {
        this.X += vector.X;
        this.Y += vector.Y;
        this.Z += vector.Z;
        return this;
    }

    public subtract(vector: Vector3): Point3 {
        this.X -= vector.X;
        this.Y -= vector.Y;
        this.Z -= vector.Z;
        return this;
    }

    public multiply(value: number): Point3 {
        this.X *= value;
        this.Y *= value;
        this.Z *= value;
        return this;
    }

    public divide(value: number): Point3 {
        this.X /= value;
        this.Y /= value;
        this.Z /= value;
        return this;
    }

    public clone(): Point3 {
        return new Point3(this.X, this.Y, this.Z);
    }

    public copy(vector: Point3): void {
        if (!vector) { return; }
        this.X = vector.X;
        this.Y = vector.Y;
        this.Z = vector.Z;
    }
}
