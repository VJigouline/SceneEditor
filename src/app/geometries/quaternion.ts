import { MathUtils } from "../mathematics/math-utils";
import { Euler, EulerRotationOrder } from "./euler";
import { Matrix4 } from "./matrix4";
import { Vector3 } from "./vector3";

/**
 * This is a ported [Quaternion class](https://threejs.org/docs/#api/en/math/Quaternion) 
 * from ThreeJS to have a typed and independent from the whole ThreeJS library 
 * implementation in the geometry code. Some adjustments are made
 * to work with other geometry classes in SceneEditor.
 */
export class Quaternion {
    /** Quaternion X component. */
    public X = 0;
    /** Quaternion Y component. */
    public Y = 0;
    /** Quaternion Z component. */
    public Z = 0;  
    /** Quaternion W component. */
    public W = 1;  

    /** Returns new identity quaternion */
	public get Identity() : Quaternion {
		return new Quaternion();
	}
    /** Returns new inverted quaternion from this one */
    public get Inverted() : Quaternion { return new Quaternion(-this.X, -this.Y, -this.Z, this.W); }
    /** Squared length of the quaternion */
	public get LengthSquared() : number { return this.X * this.X + this.Y * this.Y + this.Z * this.Z + this.W * this.W; }
    /** Quaternion length */
	public get Length() : number { return Math.sqrt(this.LengthSquared); }

    /**
     * Constructor
     * @param x quaternion X component
     * @param y quaternion Y component
     * @param z quaternion Z component
     * @param w quaternion W component
     */
	constructor(x = 0, y = 0, z = 0, w = 1) {
		this.X = x;
		this.Y = y;
		this.Z = z;
		this.W = w;
	}
    /**
     * Set Quaternion components.
     * @param x quaternion X component
     * @param y quaternion Y component
     * @param z quaternion Z component
     * @param w quaternion W component
     * @returns modified this quaternion (for chaining)
     */
	public set(x = 0, y = 0, z = 0, w = 1) : Quaternion {
		this.X = x;
		this.Y = y;
		this.Z = z;
		this.W = w;

		return this;
	}
	private static slerpFlat( dst : number[], dstOffset : number, src0 : number[], 
        srcOffset0 : number, src1 : number[], srcOffset1 : number, t : number) : void {

		// fuzz-free, array-based Quaternion SLERP operation

		let x0 = src0[ srcOffset0 + 0 ],
			y0 = src0[ srcOffset0 + 1 ],
			z0 = src0[ srcOffset0 + 2 ],
			w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 + 0 ],
			y1 = src1[ srcOffset1 + 1 ],
			z1 = src1[ srcOffset1 + 2 ],
			w1 = src1[ srcOffset1 + 3 ];

		if ( t === 0 ) {

			dst[ dstOffset + 0 ] = x0;
			dst[ dstOffset + 1 ] = y0;
			dst[ dstOffset + 2 ] = z0;
			dst[ dstOffset + 3 ] = w0;
			return;

		}

		if ( t === 1 ) {

			dst[ dstOffset + 0 ] = x1;
			dst[ dstOffset + 1 ] = y1;
			dst[ dstOffset + 2 ] = z1;
			dst[ dstOffset + 3 ] = w1;
			return;

		}

		if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {

			let s = 1 - t;
			const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
				dir = ( cos >= 0 ? 1 : - 1 ),
				sqrSin = 1 - cos * cos;

			// Skip the Slerp for tiny steps to avoid numeric problems:
			if ( sqrSin > Number.EPSILON ) {

				const sin = Math.sqrt( sqrSin ),
					len = Math.atan2( sin, cos * dir );

				s = Math.sin( s * len ) / sin;
				t = Math.sin( t * len ) / sin;

			}

			const tDir = t * dir;

			x0 = x0 * s + x1 * tDir;
			y0 = y0 * s + y1 * tDir;
			z0 = z0 * s + z1 * tDir;
			w0 = w0 * s + w1 * tDir;

			// Normalize in case we just did a lerp:
			if ( s === 1 - t ) {

				const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );

				x0 *= f;
				y0 *= f;
				z0 *= f;
				w0 *= f;

			}

		}

		dst[ dstOffset ] = x0;
		dst[ dstOffset + 1 ] = y0;
		dst[ dstOffset + 2 ] = z0;
		dst[ dstOffset + 3 ] = w0;

	}

	private static multiplyQuaternionsFlat(dst : number[], dstOffset : number, src0 : number[],
        srcOffset0 : number, src1 : number[], srcOffset1 : number) : number[] {

		const x0 = src0[ srcOffset0 ];
		const y0 = src0[ srcOffset0 + 1 ];
		const z0 = src0[ srcOffset0 + 2 ];
		const w0 = src0[ srcOffset0 + 3 ];

		const x1 = src1[ srcOffset1 ];
		const y1 = src1[ srcOffset1 + 1 ];
		const z1 = src1[ srcOffset1 + 2 ];
		const w1 = src1[ srcOffset1 + 3 ];

		dst[ dstOffset ] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
		dst[ dstOffset + 1 ] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
		dst[ dstOffset + 2 ] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
		dst[ dstOffset + 3 ] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;

		return dst;
	}
    /**
     * Clone Quaternion object to create new object with the same elements.
     * @returns new Quaternion object with the same elements as an original one.
     */
    public clone() : Quaternion {
		return new Quaternion(this.X, this.Y, this.Z, this.W);
	}
    /**
     * Copy Quaterinon object into current one.
     * @param quaternion quaternion to copy
     * @returns modified this Quaternion object (for chaining)
     */
	public copy( quaternion ) : Quaternion {
		this.X = quaternion.x;
		this.Y = quaternion.y;
		this.Z = quaternion.z;
		this.W = quaternion.w;

		return this;
	}
    /**
     * Set Quaternion from Euler angles
     * @param euler {@link Euler} angles
     * @returns modified this Quaternion object (for chaining)
     */
	setFromEuler(euler : Euler) : Quaternion {
		const x = euler.X, y = euler.Y, z = euler.Z, order = euler.Order;

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		const cos = Math.cos;
		const sin = Math.sin;

		const c1 = cos( x / 2 );
		const c2 = cos( y / 2 );
		const c3 = cos( z / 2 );

		const s1 = sin( x / 2 );
		const s2 = sin( y / 2 );
		const s3 = sin( z / 2 );

		switch ( order ) {

			case EulerRotationOrder.XYZ:
				this.X = s1 * c2 * c3 + c1 * s2 * s3;
				this.Y = c1 * s2 * c3 - s1 * c2 * s3;
				this.Z = c1 * c2 * s3 + s1 * s2 * c3;
				this.W = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case EulerRotationOrder.YXZ:
				this.X = s1 * c2 * c3 + c1 * s2 * s3;
				this.Y = c1 * s2 * c3 - s1 * c2 * s3;
				this.Z = c1 * c2 * s3 - s1 * s2 * c3;
				this.W = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case EulerRotationOrder.ZXY:
				this.X = s1 * c2 * c3 - c1 * s2 * s3;
				this.Y = c1 * s2 * c3 + s1 * c2 * s3;
				this.Z = c1 * c2 * s3 + s1 * s2 * c3;
				this.W = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case EulerRotationOrder.ZYX:
				this.X = s1 * c2 * c3 - c1 * s2 * s3;
				this.Y = c1 * s2 * c3 + s1 * c2 * s3;
				this.Z = c1 * c2 * s3 - s1 * s2 * c3;
				this.W = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			case EulerRotationOrder.YZX:
				this.X = s1 * c2 * c3 + c1 * s2 * s3;
				this.Y = c1 * s2 * c3 + s1 * c2 * s3;
				this.Z = c1 * c2 * s3 - s1 * s2 * c3;
				this.W = c1 * c2 * c3 - s1 * s2 * s3;
				break;

			case EulerRotationOrder.XZY:
				this.X = s1 * c2 * c3 - c1 * s2 * s3;
				this.Y = c1 * s2 * c3 - s1 * c2 * s3;
				this.Z = c1 * c2 * s3 + s1 * s2 * c3;
				this.W = c1 * c2 * c3 + s1 * s2 * s3;
				break;

			default:
				console.warn( 'Quaternion: .setFromEuler() encountered an unknown order: ' + order );
		}

		return this;
	}
    /**
     * Set Quaternion from rotational axis and angle
     * @param axis {@link Vector3} axis direction
     * @param angle rotation angle in radians
     * @returns modified this Quaternion object (for chaining)
     */
	public setFromAxisAngle(axis : Vector3, angle : number) : Quaternion {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm

		// assumes axis is normalized

		const halfAngle = angle / 2, s = Math.sin( halfAngle );

		this.X = axis.X * s;
		this.Y = axis.Y * s;
		this.Z = axis.Z * s;
		this.W = Math.cos( halfAngle );

		return this;
	}
    /**
     * Set Quaternion from {@link Matrix4}
     * @param matrix {@link Matrix4} to set from
     * @returns modified this Quaternion object (for chaining)
     */
	public setFromRotationMatrix(matrix : Matrix4) : Quaternion {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		const te = matrix.elements,

			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33;

		if ( trace > 0 ) {

			const s = 0.5 / Math.sqrt( trace + 1.0 );

			this.W = 0.25 / s;
			this.X = ( m32 - m23 ) * s;
			this.Y = ( m13 - m31 ) * s;
			this.Z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this.W = ( m32 - m23 ) / s;
			this.X = 0.25 * s;
			this.Y = ( m12 + m21 ) / s;
			this.Z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			const s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this.W = ( m13 - m31 ) / s;
			this.X = ( m12 + m21 ) / s;
			this.Y = 0.25 * s;
			this.Z = ( m23 + m32 ) / s;

		} else {

			const s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this.W = ( m21 - m12 ) / s;
			this.X = ( m13 + m31 ) / s;
			this.Y = ( m23 + m32 ) / s;
			this.Z = 0.25 * s;

		}

		return this;

	}
    /**
     * Set Quaternion as rotation from vFrom vector to vTo vector.
     * @param vFrom {@link Vector3} to rotate from
     * @param vTo {@link Vector3} to rotate to
     * @returns modified this Quaternion object (for chaining)
     */
	public setFromUnitVectors(vFrom : Vector3, vTo : Vector3) : Quaternion {

		// assumes direction vectors vFrom and vTo are normalized

		let r = vFrom.dot( vTo ) + 1;

		if ( r < Number.EPSILON ) {

			// vFrom and vTo point in opposite directions

			r = 0;

			if ( Math.abs( vFrom.X ) > Math.abs( vFrom.Z ) ) {

				this.X = - vFrom.Y;
				this.Y = vFrom.X;
				this.Z = 0;
				this.W = r;

			} else {

				this.X = 0;
				this.Y = - vFrom.Z;
				this.Z = vFrom.Y;
				this.W = r;

			}

		} else {
			// crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
			this.X = vFrom.Y * vTo.Z - vFrom.Z * vTo.Y;
			this.Y = vFrom.Z * vTo.X - vFrom.X * vTo.Z;
			this.Z = vFrom.X * vTo.Y - vFrom.Y * vTo.X;
			this.W = r;
		}

		return this.normalize();

	}
    /**
     * Find angle in radians between 2 quaternions
     * @param q Quaternion to find angle to
     * @returns angle between quaternions in radians
     */
	public angleTo( q : Quaternion) : number {
		return 2 * Math.acos( Math.abs( MathUtils.clamp( this.dot( q ), - 1, 1 ) ) );
	}
    /**
     * Rotate this quaternion towards another quaternion by given angle in radians
     * @param q quaternion to rotate to
     * @param step rotation angle in radians
     * @returns modified this Quaternion object (for chaining)
     */
	public rotateTowards(q : Quaternion, step : number) : Quaternion {

		const angle = this.angleTo( q );

		if ( angle === 0 ) return this;

		const t = Math.min( 1, step / angle );

		this.slerp( q, t );

		return this;
	}
    /**
     * Returns quaternion dot product.
     * @param v Quaternion to multiply
     * @returns dot product _**this * v**_
     */
	public dot(v : Quaternion) : number {
		return this.X * v.X + this.Y * v.Y + this.Z * v.Z + this.W * v.W;
	}
    /**
     * Normalize quaternion.
     * @returns modified this Quaternion object (for chaining)
     */
	normalize() : Quaternion {
		let l = this.Length;

		if ( l === 0 ) {

			this.X = 0;
			this.Y = 0;
			this.Z = 0;
			this.W = 1;

		} else {

			l = 1 / l;

			this.X = this.X * l;
			this.Y = this.Y * l;
			this.Z = this.Z * l;
			this.W = this.W * l;

		}

		return this;

	}
    /**
     * Postmultiply 2 quaternions  
     * _this = this * q_ 
     * @param q quaternion to multiply.
     * @returns modified this Quaternion object (for chaining)
     */
	public multiply(q : Quaternion) : Quaternion {
		return this.multiplyQuaternions(this, q);
	}
    /**
     * Premultiply 2 quaternions  
     * _this = q * this_ 
     * @param q quaternion to multiply.
     * @returns modified this Quaternion object (for chaining)
     */
    public premultiply(q : Quaternion) : Quaternion {
		return this.multiplyQuaternions(q, this);
	}

    /**
     * Postmultiply 2 quaternions  
     * _this = a * b_ 
     * @param a 1st quaternion to multiply
     * @param b 2nd quaternion to multiply
     * @returns modified this Quaternion object (for chaining)
     */
     public multiplyQuaternions(a : Quaternion, b : Quaternion) : Quaternion {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		const qax = a.X, qay = a.Y, qaz = a.Z, qaw = a.W;
		const qbx = b.X, qby = b.Y, qbz = b.Z, qbw = b.W;

		this.X = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this.Y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this.Z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this.W = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		return this;
	}

    /**
     * Linear quaternion interpolation towards another quaternion
     * @param qb quaternion to interpolate to
     * @param t interpolation factor
     * @returns modified this Quaternion object (for chaining)
     */
	public slerp(qb : Quaternion, t : number) : Quaternion {

		if ( t === 0 ) return this;
		if ( t === 1 ) return this.copy( qb );

		const x = this.X, y = this.Y, z = this.Z, w = this.W;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		let cosHalfTheta = w * qb.W + x * qb.X + y * qb.Y + z * qb.Z;

		if ( cosHalfTheta < 0 ) {

			this.W = - qb.W;
			this.X = - qb.X;
			this.Y = - qb.Y;
			this.Z = - qb.Z;

			cosHalfTheta = - cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this.W = w;
			this.X = x;
			this.Y = y;
			this.Z = z;

			return this;

		}

		const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

		if ( sqrSinHalfTheta <= Number.EPSILON ) {

			const s = 1 - t;
			this.W = s * w + t * this.W;
			this.X = s * x + t * this.X;
			this.Y = s * y + t * this.Y;
			this.Z = s * z + t * this.Z;

			this.normalize();

			return this;
		}

		const sinHalfTheta = Math.sqrt( sqrSinHalfTheta );
		const halfTheta = Math.atan2( sinHalfTheta, cosHalfTheta );
		const ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
			ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this.W = ( w * ratioA + this.W * ratioB );
		this.X = ( x * ratioA + this.X * ratioB );
		this.Y = ( y * ratioA + this.Y * ratioB );
		this.Z = ( z * ratioA + this.Z * ratioB );

		return this;

	}
    /**
     * Linear quaternion interpolation from one quaternion towards another quaternion
     * @param qa quaternion to interpolate from
     * @param qb quaternion to interpolate to
     * @param t interpolation factor
     * @returns modified this Quaternion object (for chaining)
     */
	public slerpQuaternions(qa : Quaternion, qb : Quaternion, t : number) : Quaternion {
		this.copy( qa ).slerp( qb, t );
        return this;
	}
    /**
     * Check if this quaternion is equal to another quaternion.
     * @param quaternion quaternion to compare
     * @returns _true_ - quaternions are equal, _false_ - not equal.
     */
	public equals(quaternion : Quaternion) : boolean {
		return ( quaternion.X === this.X ) && ( quaternion.Y === this.Y ) && ( quaternion.Z === this.Z ) && ( quaternion.W === this.W );
	}
    /**
     * Copy values from array into current Quaternion object.
     * @param array array of values to copy from
     * @param offset offset in the array to start copying.
     * @returns modified this Quaternion object (for chaining)
     */
     public fromArray(array : number[], offset = 0 ) : Quaternion {
		this.X = array[ offset ];
		this.Y = array[ offset + 1 ];
		this.Z = array[ offset + 2 ];
		this.W = array[ offset + 3 ];

		return this;
	}
    /**
     * Copy values to array from current Quaternion object.
     * @param array array of values to copy to
     * @param offset offset in the array to start copying.
     * @returns modified array with copied values
     */
     toArray( array : number[] = [], offset = 0 ) : number[] {
		array[ offset ] = this.X;
		array[ offset + 1 ] = this.Y;
		array[ offset + 2 ] = this.Z;
		array[ offset + 3 ] = this.W;

		return array;
	}
}
