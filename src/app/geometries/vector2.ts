export class Vector2 {
    public static get EPSILON(): number { return 1e-6; }
    public static get DirX(): Vector2 { return new Vector2(1, 0); }
    public static get DirY(): Vector2 { return new Vector2(0, 1); }

    public X = 0;
    public Y = 0;

    public get Length(): number { return Math.sqrt(this.X * this.X + this.Y * this.Y); }
    public get UnitVector(): Vector2 {
        const l = this.Length;
        return new Vector2(this.X / l, this.Y / l);
    }

    constructor(x?: number, y?: number) {
        this.X = x ? x : 0;
        this.Y = y ? y : 0;
    }

    public add(vector: Vector2): Vector2 {
        this.X += vector.X;
        this.Y += vector.Y;
        return this;
    }

    public subtract(vector: Vector2): Vector2 {
        this.X -= vector.X;
        this.Y -= vector.Y;
        return this;
    }

    public multiply(value: number): Vector2 {
        this.X *= value;
        this.Y *= value;
        return this;
    }

    public divide(value: number): Vector2 {
        this.X /= value;
        this.Y /= value;
        return this;
    }

    public dot(vector: Vector2): number {
        return this.X * vector.X + this.Y * vector.Y;
    }

    public cross(vector: Vector2): number {
        return this.X * vector.Y - this.Y * vector.X;
    }

    public equal(vector: Vector2): boolean {
        if (!vector) { return false; }
        return (this.clone().subtract(vector).Length < Vector2.EPSILON);
    }

    public aligned(vector: Vector2): boolean {
        if (!vector) { return false; }
        return Math.abs(Math.abs(this.UnitVector.dot(vector.UnitVector)) - 1) < Vector2.EPSILON;
    }
    public clone(): Vector2 {
        return new Vector2(this.X, this.Y);
    }

    public copy(vector: Vector2): void {
        if (!vector) { return; }
        this.X = vector.X;
        this.Y = vector.Y;
    }
}
