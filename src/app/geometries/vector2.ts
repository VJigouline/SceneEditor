export class Vector2 {
    public X = 0;
    public Y = 0;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
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
