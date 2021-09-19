import { Matrix3 } from "./matrix3";
import { Matrix4 } from "./matrix4";

/**
 * Class to specify 3D vector. Some methods are borrowed from ThreeJS
 * [Vector3 class](https://threejs.org/docs/#api/en/math/Vector3),
 * but generally this is an independent implementation.
 */
export class Vector3 {
    /** Tolerance */
    public static get EPSILON(): number { return 1e-6; }
    /** Unit vector along X axis */
    public static get DirX(): Vector3 { return new Vector3(1, 0, 0); }
    /** Unit vector along Y axis */
    public static get DirY(): Vector3 { return new Vector3(0, 1, 0); }
    /** Unit vector along Z axis */
    public static get DirZ(): Vector3 { return new Vector3(0, 0, 1); }
    /** Zero vector */
    public static get Zero(): Vector3 { return new Vector3(); }

    /** Vector X component. */
    public X = 0;
    /** Vector Y component. */
    public Y = 0;
    /** Vector Z component. */
    public Z = 0;  
    /**
     * Vector length.
     */
    public get Length(): number {
        return Math.sqrt(this.X * this.X + this.Y * this.Y + this.Z * this.Z);
    }
    /**
     * Vector unit vector.
     */
    public get UnitVector(): Vector3 {
        const l = this.Length;
        return new Vector3(this.X / l, this.Y / l, this.Z / l);
    }

    /**
     * Constructor.
     * @param x vector X component
     * @param y vector Y component
     * @param z vector Z component
     */
    public constructor(x = 0, y = 0, z = 0) {
        this.set(x, y, z);
    }
    /**
     * Set Vector3 components.
     * @param x vector X component
     * @param y vector Y component
     * @param z vector Z component
     * @returns modified this vector (for chaining)
     */
    public set(x = 0, y = 0, z = 0) : Vector3 {
        this.X = x;
        this.Y = y;
        this.Z = z;

		return this;
	}
   /**
     * Add Vector3 to this one.
     * @param vector Vector3 to add
     * @returns modified this vector (for chaining)
     */
    public add(vector: Vector3): Vector3 {
        this.X += vector.X;
        this.Y += vector.Y;
        this.Z += vector.Z;
        return this;
    }
    /**
     * Subtruct Vector3 from this one.
     * @param vector Vector3 to subtract
     * @returns modified this vector (for chaining)
     */
     public subtract(vector: Vector3): Vector3 {
        this.X -= vector.X;
        this.Y -= vector.Y;
        this.Z -= vector.Z;
        return this;
    }
    /**
     * Multiply all vector components by number.
     * @param value multiplier
     * @returns modified this vector (for chaining)
     */
    public multiplyScalar(value: number): Vector3 {
        this.X *= value;
        this.Y *= value;
        this.Z *= value;
        return this;
    }
    /**
     * Divide all vector components by number.
     * @param value divider
     * @returns modified this vector (for chaining)
     */
     public divideScalar(value: number): Vector3 {
        this.X /= value;
        this.Y /= value;
        this.Z /= value;
        return this;
    }
    /**
     * Calculate [dot product](https://en.wikipedia.org/wiki/Dot_product)
     * of 2 Vector3 objects.
     * @param vector Vector3 to multiply 
     * @returns dot product value.
     */
    public dot(vector: Vector3): number {
        return this.X * vector.X + this.Y * vector.Y + this.Z * vector.Z;
    }
    /**
     * Calculate [cross product](https://en.wikipedia.org/wiki/Cross_product)
     * of 2 Vector3 objects.
     * @param vector Vector3 to multiply 
     * @returns new Vector3 object with cross product value.
     */
     public cross(vector: Vector3): Vector3 {
        return new Vector3(
            this.Y * vector.Z - this.Z * vector.Y,
            this.Z * vector.X - this.X * vector.Z,
            this.X * vector.Y - this.Y * vector.X
        );
    }
    /**
     * Check if 2 Vector3 objects are equal with tolerance.
     * @param vector Vector3 to compare
     * @returns _true_ - vectors are equal, _false_ - not equal.
     */
    public equal(vector: Vector3): boolean {
        if (!vector) { return false; }
        return (this.clone().subtract(vector).Length < Vector3.EPSILON);
    }
    /**
     * Check if 2 Vector3 objects are aligned (parallel) to each other with tolerance.
     * Vectors can be in opposite directions but still aligned.
     * @param vector Vector3 to compare
     * @returns _true_ - vectors are aligned, _false_ - not aligned.
     */
    public aligned(vector: Vector3): boolean {
        if (!vector) { return false; }
        return Math.abs(Math.abs(this.UnitVector.dot(vector.UnitVector)) - 1) < Vector3.EPSILON;
    }
    /**
     * Clone Vector3 object to create new object with the same elements.
     * @returns new Vector3 object with the same elements as an original one.
     */
    public clone(): Vector3 {
        return new Vector3(this.X, this.Y, this.Z);
    }
    /**
     * Copy Vector3 object into current one.
     * @param vector Vector3 object to copy.
     * @returns this Vector3 object (for chaining.)
     */
     public copy(vector: Vector3): Vector3 {
        if (!vector) { return; }
        this.X = vector.X;
        this.Y = vector.Y;
        this.Z = vector.Z;
        
        return this;
    }
    /**
     * Copy values from array into current Vector3 object.
     * @param array array of values to copy from
     * @param offset offset in the array to start copying.
     * @returns this Vector3 object (for chaining.)
     */
	public fromArray(array : number[], offset = 0) : Vector3 {

		this.X = array[ offset ];
		this.Y = array[ offset + 1 ];
		this.Z = array[ offset + 2 ];

		return this;
	}
    /**
     * Copy values to array from current Vector3 object.
     * @param array array of values to copy to
     * @param offset offset in the array to start copying.
     * @returns array with values copy.
     */
     public toArray( array : number[] = [], offset = 0 ) : number[] {
		array[ offset ] = this.X;
		array[ offset + 1 ] = this.Y;
		array[ offset + 2 ] = this.Z;

		return array;
	}
    /**
     * Copy values from the {@link Matrix4} column into this object.
     * @param matrix {@link Matrix4} to copy from.
     * @param index column number
     * @returns this Vector3 object (for chaining.)
     */
	public setFromMatrixColumn(matrix : Matrix4, index : number) : Vector3 {
		return this.fromArray( matrix.elements, index * 4 );
	}
    /**
     * Copy values from the {@link Matrix3} column into this object.
     * @param matrix {@link Matrix3} to copy from.
     * @param index column number
     * @returns this Vector3 object (for chaining.)
     */
    public setFromMatrix3Column(matrix : Matrix3, index : number) : Vector3 {

		return this.fromArray( matrix.elements, index * 3 );
	}
}
