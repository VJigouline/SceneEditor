import { Matrix4 } from "./matrix4";
import { Vector3 } from "./vector3";

/**
 * This is a ported [Matrix3 class](https://threejs.org/docs/index.html#api/en/math/Matrix3) 
 * from ThreeJS to have a typed and independent from the whole ThreeJS library 
 * implementation in the geometry code. Some adjustments are made
 * to work with other geometry classes in SceneEditor.
 */
 export class Matrix3 {
    public elements = [
			1, 0, 0,
			0, 1, 0,
			0, 0, 1
		];

    /** Create identity matrix*/
    public static get Identity() : Matrix3 { return new Matrix3()}
    /** Create zero matrix*/
    public static get Zero() : Matrix3 { return new Matrix3().set(0, 0, 0, 0, 0, 0, 0, 0, 0)}
    /** Affine transform X vector */
    public get XAxis() : Vector3 { return new Vector3().setFromMatrix3Column(this, 0); } 
    /** Affine transform Y vector */
    public get YAxis() : Vector3 { return new Vector3().setFromMatrix3Column(this, 1); } 
    /** Affine transform Z vector */
    public get ZAxis() : Vector3 { return new Vector3().setFromMatrix3Column(this, 2); }
	/** Scale factor along X axis */
	public get ScaleX() : number { return new Vector3().setFromMatrix3Column(this, 0).Length; }
	/** Scale factor along Y axis */
	public get ScaleY() : number { return new Vector3().setFromMatrix3Column(this, 1).Length; }
	/** Scale factor along Z axis */
	public get ScaleZ() : number { return new Vector3().setFromMatrix3Column(this, 2).Length; }
	/** Matrix [determinant](https://en.wikipedia.org/wiki/Determinant) */
	public get Determinant() : number {
		const te = this.elements;

		const a = te[ 0 ], b = te[ 1 ], c = te[ 2 ],
			d = te[ 3 ], e = te[ 4 ], f = te[ 5 ],
			g = te[ 6 ], h = te[ 7 ], i = te[ 8 ];

		return a * e * i - a * f * h - b * d * i + b * f * g + c * d * h - c * e * g;
	}
    /** New [inverted](https://en.wikipedia.org/wiki/Matrix_(mathematics)#Invertible_matrix_and_its_inverse) Matrix3 object */
	public get Inverted() : Matrix3 {
        let ret = this.clone();
		const te = ret.elements,

			n11 = te[ 0 ], n21 = te[ 1 ], n31 = te[ 2 ],
			n12 = te[ 3 ], n22 = te[ 4 ], n32 = te[ 5 ],
			n13 = te[ 6 ], n23 = te[ 7 ], n33 = te[ 8 ],

			t11 = n33 * n22 - n32 * n23,
			t12 = n32 * n13 - n33 * n12,
			t13 = n23 * n12 - n22 * n13,

			det = n11 * t11 + n21 * t12 + n31 * t13;

		if ( det === 0 ) return this.set( 0, 0, 0, 0, 0, 0, 0, 0, 0 );

		const detInv = 1 / det;

		te[ 0 ] = t11 * detInv;
		te[ 1 ] = ( n31 * n23 - n33 * n21 ) * detInv;
		te[ 2 ] = ( n32 * n21 - n31 * n22 ) * detInv;

		te[ 3 ] = t12 * detInv;
		te[ 4 ] = ( n33 * n11 - n31 * n13 ) * detInv;
		te[ 5 ] = ( n31 * n12 - n32 * n11 ) * detInv;

		te[ 6 ] = t13 * detInv;
		te[ 7 ] = ( n21 * n13 - n23 * n11 ) * detInv;
		te[ 8 ] = ( n22 * n11 - n21 * n12 ) * detInv;

		return ret;
	}
    /** New [transposed](https://en.wikipedia.org/wiki/Matrix_(mathematics)#Addition,_scalar_multiplication,_and_transposition) Matrix3 object */
	public get Transposed() : Matrix3 {
		let tmp : number;
        let ret = this.clone();
		const m = ret.elements;

		tmp = m[ 1 ]; m[ 1 ] = m[ 3 ]; m[ 3 ] = tmp;
		tmp = m[ 2 ]; m[ 2 ] = m[ 6 ]; m[ 6 ] = tmp;
		tmp = m[ 5 ]; m[ 5 ] = m[ 7 ]; m[ 7 ] = tmp;

		return ret;
	}

    /** Constructor */
	public constructor() {
	}
    /**
     * Set Matrix3 values.  
     *    | n11 n12 n13 |  
     *    | n21 n22 n23 |  
     *    | n31 n32 n33 |  
     * 
     * @returns The same Matrix3 object (for chaining.)
     */
    public set(
         n11 : number, n12 : number, n13 : number, 
         n21 : number, n22 : number, n23 : number, 
         n31 : number, n32 : number, n33 : number 
    ) : Matrix3 {
		const te = this.elements;

		te[ 0 ] = n11; te[ 1 ] = n21; te[ 2 ] = n31;
		te[ 3 ] = n12; te[ 4 ] = n22; te[ 5 ] = n32;
		te[ 6 ] = n13; te[ 7 ] = n23; te[ 8 ] = n33;

		return this;
	}
    /**
     * Clone Matrix3 object to create new object with the same elements.
     * @returns new Matrix3 object with the same elements as an original one.
     */
     public clone() : Matrix3 {
		return new Matrix3().fromArray( this.elements );
	}
    /**
     * Copy Matrix3 object into current one.
     * @param matrix Matrix3 object to copy.
     * @returns modified this Matrix3 object (for chaining.)
     */
	public copy( matrix : Matrix3 ) : Matrix3 {
		const te = this.elements;
		const me = matrix.elements;

		te[ 0 ] = me[ 0 ]; te[ 1 ] = me[ 1 ]; te[ 2 ] = me[ 2 ];
		te[ 3 ] = me[ 3 ]; te[ 4 ] = me[ 4 ]; te[ 5 ] = me[ 5 ];
		te[ 6 ] = me[ 6 ]; te[ 7 ] = me[ 7 ]; te[ 8 ] = me[ 8 ];

		return this;
	}
    /**
     * Create new Matrix3 object from {@link Matrix4} affine component.
     * @param matrix {@link Matrix4} to copy from
     * @returns modified this Matrix3 object (for chaining.)
     */
	public static FromMatrix4( matrix : Matrix4 ) : Matrix3 {
		const me = matrix.elements;

		return new Matrix3().set(
			me[ 0 ], me[ 4 ], me[ 8 ],
			me[ 1 ], me[ 5 ], me[ 9 ],
			me[ 2 ], me[ 6 ], me[ 10 ]
		);
	}
    /**
     * Postmultiply current Matrix3 matrix onto another Matrix3 one.  
     * _**this = this * matrix**_
     * @param matrix Matrix3 to multiply.
     * @returns modified this Matrix3 object (for chaining.)
     */
	multiply(matrix : Matrix3) {
		return this.multiplyMatrices(this, matrix);
	}
    /**
     * Premultiply current Matrix3 matrix onto another Matrix3 one.  
     * _**this = matrix * this**_
     * @param matrix Matrix3 to multiply.
     * @returns modified this Matrix3 object (for chaining.)
     */
     premultiply(matrix : Matrix3) {
		return this.multiplyMatrices(matrix, this);
	}

	private multiplyMatrices(a : Matrix3, b : Matrix3) : Matrix3 {
		const ae = a.elements;
		const be = b.elements;
		const te = this.elements;

		const a11 = ae[ 0 ], a12 = ae[ 3 ], a13 = ae[ 6 ];
		const a21 = ae[ 1 ], a22 = ae[ 4 ], a23 = ae[ 7 ];
		const a31 = ae[ 2 ], a32 = ae[ 5 ], a33 = ae[ 8 ];

		const b11 = be[ 0 ], b12 = be[ 3 ], b13 = be[ 6 ];
		const b21 = be[ 1 ], b22 = be[ 4 ], b23 = be[ 7 ];
		const b31 = be[ 2 ], b32 = be[ 5 ], b33 = be[ 8 ];

		te[ 0 ] = a11 * b11 + a12 * b21 + a13 * b31;
		te[ 3 ] = a11 * b12 + a12 * b22 + a13 * b32;
		te[ 6 ] = a11 * b13 + a12 * b23 + a13 * b33;

		te[ 1 ] = a21 * b11 + a22 * b21 + a23 * b31;
		te[ 4 ] = a21 * b12 + a22 * b22 + a23 * b32;
		te[ 7 ] = a21 * b13 + a22 * b23 + a23 * b33;

		te[ 2 ] = a31 * b11 + a32 * b21 + a33 * b31;
		te[ 5 ] = a31 * b12 + a32 * b22 + a33 * b32;
		te[ 8 ] = a31 * b13 + a32 * b23 + a33 * b33;

		return this;
	}
    /**
     * Multiply all element of the current Matrix4 on scalar value.
     * @param s multiplier.
     * @returns modified this Matrix3 object (for chaining.)
     */
	public multiplyScalar(s : number) : Matrix3 {

		const te = this.elements;

		te[ 0 ] *= s; te[ 3 ] *= s; te[ 6 ] *= s;
		te[ 1 ] *= s; te[ 4 ] *= s; te[ 7 ] *= s;
		te[ 2 ] *= s; te[ 5 ] *= s; te[ 8 ] *= s;

		return this;
	}

	private fromArray( array, offset = 0 ) : Matrix3 {
		for ( let i = 0; i < 9; i ++ ) {

			this.elements[ i ] = array[ i + offset ];

		}

		return this;
	}
}
