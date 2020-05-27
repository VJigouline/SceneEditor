export class Vector3 {
    public static get EPSILON(): number { return 1e-6; }
    public static get DirX(): Vector3 { return new Vector3(1, 0, 0); }
    public static get DirY(): Vector3 { return new Vector3(0, 1, 0); }
    public static get DirZ(): Vector3 { return new Vector3(0, 0, 1); }

    public X = 0;
    public Y = 0;
    public Z = 0;

    public get Length(): number {
        return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z);
    }
    public get UnitVector(): Vector3 {
        const l = this.Length;
        return new Vector3(this.X / l, this.Y / l, this.Z / l);
    }

    constructor(x?: number, y?: number, z?: number) {
        this.X = x ? x : 0;
        this.Y = y ? y : 0;
        this.Z = z ? z : 0;
    }

    public add(vector: Vector3): Vector3 {
        this.X += vector.X;
        this.Y += vector.Y;
        this.Z += vector.Z;
        return this;
    }

    public subtract(vector: Vector3): Vector3 {
        this.X -= vector.X;
        this.Y -= vector.Y;
        this.Z -= vector.Z;
        return this;
    }

    public multiply(value: number): Vector3 {
        this.X *= value;
        this.Y *= value;
        this.Z *= value;
        return this;
    }

    public divide(value: number): Vector3 {
        this.X /= value;
        this.Y /= value;
        this.Z /= value;
        return this;
    }

    public dot(vector: Vector3): number {
        return this.X * vector.X + this.Y * vector.Y * this.Z * vector.Z;
    }

    public cross(vector: Vector3): Vector3 {

        this.X = this.Y * vector.Z - this.Z * vector.Y;
        this.Y = this.Z * vector.X - this.X * vector.Z;
        this.Z = this.X * vector.Y - this.Y * vector.X;

        return this;
    }

    public equal(vector: Vector3): boolean {
        if (!vector) { return false; }
        return (this.clone().subtract(vector).Length < Vector3.EPSILON);
    }

    public aligned(vector: Vector3): boolean {
        if (!vector) { return false; }
        return Math.abs(Math.abs(this.UnitVector.dot(vector.UnitVector)) - 1) < Vector3.EPSILON;
    }
    public clone(): Vector3 {
        return new Vector3(this.X, this.Y, this.Z);
    }

    public copy(vector: Vector3): void {
        if (!vector) { return; }
        this.X = vector.X;
        this.Y = vector.Y;
        this.Z = vector.Z;
    }
}
