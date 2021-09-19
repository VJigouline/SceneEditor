import { Vector3 } from './vector3';

/**
 * Class to specify 3D point.
 */
 export class Point3 {
    public X = 0;
    public Y = 0;
    public Z = 0;

    /**
     * Constructor
     * @param x point X component
     * @param y point Y component
     * @param z point Z component
    */
    constructor(x = 0, y = 0, z = 0) {
        this.set(x, y, z);
    }
    /**
     * Set Point3 components.
     * @param x point X component
     * @param y point Y component
     * @param z point Z component
     * @returns modified this point (for chaining)
     */
     public set(x = 0, y = 0, z = 0) : Point3 {
        this.X = x;
        this.Y = y;
        this.Z = z;

		return this;
	}
    /**
     * Create {@link Vector3} from point1 to point2
     * @param point1 first point
     * @param point2 second point
     * @returns created {@link Vector3} object.
     */
    public static vector(point1: Point3, point2: Point3): Vector3 {
        return new Vector3(point2.X - point1.X, point2.Y - point1.Y, point2.Z - point1.Z);
    }
    /**
     * Add {@link Vector3} to the current point
     * @param vector {@link Vector3} to add.
     * @returns modified this point (for chaining)
     */
    public addVector(vector: Vector3) : Point3 {
        this.X += vector.X;
        this.Y += vector.Y;
        this.Z += vector.Z;
        return this;
    }
    /**
     * Subtract {@link Vector3} from the current point
     * @param vector {@link Vector3} to subtract.
     * @returns modified this point (for chaining)
     */
     public subtractVector(vector: Vector3): Point3 {
        this.X -= vector.X;
        this.Y -= vector.Y;
        this.Z -= vector.Z;
        return this;
    }
    /**
     * Multiply all point components by number.
     * @param value multiplier
     * @returns modified this point (for chaining)
     */
     public multiplyScalar(value: number): Point3 {
        this.X *= value;
        this.Y *= value;
        this.Z *= value;
        return this;
    }
    /**
     * Divide all point components by number.
     * @param value divider
     * @returns modified this point (for chaining)
     */
     public divideScalar(value: number): Point3 {
        this.X /= value;
        this.Y /= value;
        this.Z /= value;
        return this;
    }
    /**
     * Clone Point3 object to create new object with the same elements.
     * @returns new Point3 object with the same elements as an original one.
     */
     public clone(): Point3 {
        return new Point3(this.X, this.Y, this.Z);
    }
    /**
     * Copy Point3 object into current one.
     * @param point Point3 object to copy.
     * @returns this Point3 object (for chaining.)
     */
     public copy(point: Point3): Point3 {
        if (!point) { return; }
        this.X = point.X;
        this.Y = point.Y;
        this.Z = point.Z;

        return this;
    }
}
