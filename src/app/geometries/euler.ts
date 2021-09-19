import { MathUtils } from "../mathematics/math-utils";
import { Matrix4 } from "./matrix4";
import { Quaternion } from "./quaternion";
import { Vector3 } from "./vector3";

/**
 * This is a ported [Euler class](https://threejs.org/docs/#api/en/math/Euler) 
 * from ThreeJS to have a typed and independent from the whole ThreeJS library 
 * implementation in the geometry code. Some adjustments are made
 * to work with other geometry classes in SceneEditor.
 */
export enum EulerRotationOrder {
    XYZ,
    YZX,
    ZXY,
    XZY,
    YXZ,
    ZYX
}

export class Euler {
    public static DefaultOrder = EulerRotationOrder.XYZ;
    /** Rotation angle around X axis */
    public X = 0;
    /** Rotation angle around X axis */
    public Y = 0;
    /** Rotation angle around X axis */
    public Z = 0;
    public Order = Euler.DefaultOrder;
    /** {@link Vector3} from quaternion*/
	public get Vector3() { return new Vector3( this.X, this.Y, this.Z ); }

    /**
     * Constructor.
     * @param x rotation angle around X axis
     * @param y rotation angle around Y axis
     * @param z rotation angle around Z axis
     * @param order rotation order.
     */
	public constructor(x = 0, y = 0, z = 0, order = Euler.DefaultOrder) {
		this.X = x;
		this.Y = y;
		this.Z = z;
		this.Order = order;
	}
    /**
     * Set rotation angles and order.
     * @param x rotation angle around X axis
     * @param y rotation angle around Y axis
     * @param z rotation angle around Z axis
     * @param order rotation order.
     * @returns modified this Euler object (for chaining.)
     */
	public set(x = 0, y = 0, z = 0, order = Euler.DefaultOrder) : Euler {

		this.X = x;
		this.Y = y;
		this.Z = z;
		this.Order = order;

		return this;
	}
    /**
     * Clone Euler object to create new object with the same elements.
     * @returns new Euler object with the same elements as an original one.
     */
    public clone() : Euler {
		return new Euler(this.X, this.Y, this.Z, this.Order);
	}
    /**
     * Copy Euler object into current one.
     * @param euler Euler object to copy.
     * @returns modified this Euler object (for chaining.)
     */
    public copy(euler : Euler) : Euler {
		return this.set(euler.X, euler.Y, euler.Z, euler.Order);
	}
    /**
     * Set current Euler object from rotational component of the {@link Matrix4}.
     * @param matrix {@link Matrix4} to copy from.
     * @returns modified this Euler object (for chaining.)
     */
    public setFromRotationMatrix(matrix : Matrix4, order = this.Order) : Euler {
		const te = matrix.Rotation.elements;
		const m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		const m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		const m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		switch ( order ) {
			case EulerRotationOrder.XYZ:
				this.Y = Math.asin( MathUtils.clamp( m13, - 1, 1 ) );
				if ( Math.abs( m13 ) < 0.9999999 ) {
					this.X = Math.atan2( - m23, m33 );
					this.Z = Math.atan2( - m12, m11 );
				} else {
					this.X = Math.atan2( m32, m22 );
					this.Z = 0;
				}
				break;
			case EulerRotationOrder.YXZ:
				this.X = Math.asin( - MathUtils.clamp( m23, - 1, 1 ) );
				if ( Math.abs( m23 ) < 0.9999999 ) {
					this.Y = Math.atan2( m13, m33 );
					this.Z = Math.atan2( m21, m22 );
				} else {
					this.Y = Math.atan2( - m31, m11 );
					this.Z = 0;
				}
				break;
			case EulerRotationOrder.ZXY:
				this.X = Math.asin( MathUtils.clamp( m32, - 1, 1 ) );
				if ( Math.abs( m32 ) < 0.9999999 ) {
					this.Y = Math.atan2( - m31, m33 );
					this.Z = Math.atan2( - m12, m22 );
				} else {
					this.Y = 0;
					this.Z = Math.atan2( m21, m11 );
				}
				break;
			case EulerRotationOrder.ZYX:
				this.Y = Math.asin( - MathUtils.clamp( m31, - 1, 1 ) );
				if ( Math.abs( m31 ) < 0.9999999 ) {
					this.X = Math.atan2( m32, m33 );
					this.Z = Math.atan2( m21, m11 );
				} else {
					this.X = 0;
					this.Z = Math.atan2( - m12, m22 );
				}
				break;
			case EulerRotationOrder.YZX:
				this.Z = Math.asin( MathUtils.clamp( m21, - 1, 1 ) );
				if ( Math.abs( m21 ) < 0.9999999 ) {
					this.X = Math.atan2( - m23, m22 );
					this.Y = Math.atan2( - m31, m11 );
				} else {
					this.X = 0;
					this.Y = Math.atan2( m13, m33 );
				}
				break;
			case EulerRotationOrder.XZY:
				this.Z = Math.asin( - MathUtils.clamp( m12, - 1, 1 ) );
				if ( Math.abs( m12 ) < 0.9999999 ) {
					this.X = Math.atan2( m32, m22 );
					this.Y = Math.atan2( m13, m11 );
				} else {
					this.X = Math.atan2( - m23, m33 );
					this.Y = 0;
				}
				break;
			default:
				console.warn( 'THREE.Euler: .setFromRotationMatrix() encountered an unknown order: ' + order );
		}

		this.Order = order;

		return this;
	}
    /**
     * Set Euler object from quaternion and rotation order.
     * @param q {@link Quaternion} to set from
     * @param order {@link EulerRotationOrder} rotation order
     * @returns modified this Euler object (for chaining.)
     */
	public setFromQuaternion(q : Quaternion, order = this.Order) : Euler {
		let m = new Matrix4().makeRotationFromQuaternion( q );

		return this.setFromRotationMatrix( m, order );
	}
    /**
     * Set Euler object from {@link Vector3} and rotation order.
     * @param v {@link Vector3} to set from
     * @param order {@link EulerRotationOrder} rotation order
     * @returns modified this Euler object (for chaining.)
     */
    public setFromVector3(v : Vector3, order = this.Order ) : Euler {
		return this.set( v.X, v.Y, v.Z, order );
	}
    /**
     * Change rotation order.
     * @param newOrder new {@link EulerRotationOrder} rotation order
     * @returns modified this Euler object (for chaining.)
     */
	public reorder(newOrder : EulerRotationOrder) : Euler {
		// WARNING: this discards revolution information -bhouston
		let q = new Quaternion().setFromEuler(this);

		return this.setFromQuaternion( q, newOrder );
	}
    /**
     * Compare 2 Euler objects.
     * @param euler Euler object to compare with.
     * @returns _true_ - objects are equal, _false - objects are not equal
     */
	public equals(euler : Euler) : boolean {
		return ( euler.X === this.X ) && ( euler.Y === this.Y ) && ( euler.Z === this.Z ) && ( euler.Order === this.Order );
	}
    /**
     * Set Euler object from array of values
     * @param array array of values
     * @param offset offset in array
     * @returns modified this Euler object (for chaining.)
     */
	public fromArray(array : number[], offset = 0) : Euler {
		this.X = array[ offset + 0 ];
		this.Y = array[ offset + 1 ];
		this.Z = array[ offset + 2 ];
		if ( array[ offset + 3 ] !== undefined ) this.Order = array[ 3 ];

		return this;
	}
    /**
     * Set values on the array from this Euler object
     * @param array array of values to set
     * @param offset offset in array
     * @returns array with set values
     */
	public toArray(array = [], offset = 0) : number[] {
		array[ offset ] = this.X;
		array[ offset + 1 ] = this.Y;
		array[ offset + 2 ] = this.Z;
		array[ offset + 3 ] = this.Order;

		return array;
	}
 }
