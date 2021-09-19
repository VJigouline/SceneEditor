import { EulerRotationOrder } from "../geometries/euler";

/**
 * This is a ported [MathUtils class](https://threejs.org/docs/#api/en/math/MathUtils) 
 * from ThreeJS to have a typed and independent from the whole ThreeJS library 
 * implementation in the geometry code. Some adjustments are made
 * to work with other geometry/mathematics classes in SceneEditor.
 */
export class MathUtils {

    public static readonly DEG2RAD = Math.PI / 180;
    public static readonly RAD2DEG = 180 / Math.PI;

    private static _seed = 1234567;
    
    /**
     * Create UUID string using [StackOverflow algorithm](http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136)
     * @returns string with UUID
     */
    public static generateUUID() : string {
        const _lut = [];

        for ( let i = 0; i < 256; i ++ ) {
        
            _lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );
        
        }
            
        const d0 = Math.random() * 0xffffffff | 0;
        const d1 = Math.random() * 0xffffffff | 0;
        const d2 = Math.random() * 0xffffffff | 0;
        const d3 = Math.random() * 0xffffffff | 0;
        const uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
                _lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
                _lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
                _lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];
    
        // .toUpperCase() here flattens concatenated strings to save heap memory space.
        return uuid.toUpperCase();
    }
    /**
     * Clamp value within specified range.
     * @param value value to clamp
     * @param min value minimum
     * @param max value maximum
     * @returns clamped value.
     */
    public static clamp(value : number, min : number, max : number) : number {  
        return Math.max( min, Math.min( max, value ) );
    }  
    /**
     * Compute [euclidian modulo](https://en.wikipedia.org/wiki/Modulo_operation) of m % n
     * @param n 
     * @param m 
     * @returns euclidian modulo
     */
    public static euclideanModulo(n : number, m : number) : number {    
        return ( ( n % m ) + m ) % m;
    }  
    /**
     * Linear mapping from range <a1, a2> to range <b1, b2>
     * @param x value to map
     * @param a1 start of the first range
     * @param a2 end of the first range
     * @param b1 start of the second range
     * @param b2 end of the second range
     * @returns mapped value
     */
    public static mapLinear(x : number, a1 : number, a2 : number, b1 : number, b2 : number) : number {
        return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );
    }
    /**
     * [Linear interpolation parameter](https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/).
     * @param x start of the range
     * @param y end of the range
     * @param value value to map to parameter
     * @returns calculated linear interpolation parameter
     */
    public static inverseLerp(x : number, y : number, value : number) : number {  
        if ( x !== y ) {  
            return ( value - x ) / ( y - x ); 
             } else {
            return 0;
        }
    }
    /**
     * [Linear interpolation](https://en.wikipedia.org/wiki/Linear_interpolation)
     * @param x start of the range
     * @param y end of the range
     * @param t interpolation parameter
     * @returns interpolated value
     */
    public static lerp(x : number, y : number, t : number) : number {
    
        return ( 1 - t ) * x + t * y;
    
    }   
    /**
     * http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
     * @param x start of the range
     * @param y end of the range
     * @param lambda damping factor
     * @param dt time interval
     * @returns damped value
     */
    public static damp(x : number, y : number, lambda : number, dt : number) : number { 
        return MathUtils.lerp( x, y, 1 - Math.exp( - lambda * dt ) );    
    }  
    /** https://www.desmos.com/calculator/vcsjnyz7x4 */
    public static pingpong(x : number, length = 1) : number {
        return length - Math.abs( MathUtils.euclideanModulo( x, length * 2 ) - length );   
    }
    /** http://en.wikipedia.org/wiki/Smoothstep */
    public static smoothstep(x : number, min : number, max : number) : number {    
        if ( x <= min ) return 0;
        if ( x >= max ) return 1;
    
        x = ( x - min ) / ( max - min );
    
        return x * x * ( 3 - 2 * x );
    }
    /** https://en.wikipedia.org/wiki/Smoothstep */
    public static smootherstep(x : number, min : number, max : number) : number {
        if ( x <= min ) return 0;
        if ( x >= max ) return 1;
    
        x = ( x - min ) / ( max - min );
    
        return x * x * x * ( x * ( x * 6 - 15 ) + 10 ); 
    }
    /** Random integer from <low, high> interval */
    public static randInt(low : number, high : number) : number {  
        return low + Math.floor( Math.random() * ( high - low + 1 ) );
    }  
    /** Random float from <low, high> interval */
    public static randFloat(low : number, high : number) : number {
        return low + Math.random() * ( high - low );
    }
    /** Random float from <-range/2, range/2> interval */
    public static randFloatSpread(range : number) : number {
        return range * ( 0.5 - Math.random() );
    }
    /** Deterministic pseudo-random float in the interval [ 0, 1 ] */
    public static seededRandom( s : number ) : number {  
        if ( s !== undefined ) MathUtils._seed = s % 2147483647;
    
        // Park-Miller algorithm
        MathUtils._seed = MathUtils._seed * 16807 % 2147483647;
    
        return ( MathUtils._seed - 1 ) / 2147483646;
    }
    /**
     * Convert degrees into radians
     * @param degrees value in degrees
     * @returns value in radians
     */
    public static degToRad( degrees : number ) : number {
        return degrees * MathUtils.DEG2RAD;
    }
    /**
     * Convert radians into degrees
     * @param radians value in radians
     * @returns value in degrees
     */
    public static radToDeg( radians : number ) : number {
        return radians * MathUtils.RAD2DEG;
    }
    /**
     * Check if value is a power of 2
     * @param value value to check
     * @returns _true_ - value is power of 2, _false_ - value is not a power of 2.
     */
    public static isPowerOfTwo( value : number ) : boolean { 
        return ( value & ( value - 1 ) ) === 0 && value !== 0;
    }
    
    public static ceilPowerOfTwo( value : number ) : number {  
        return Math.pow( 2, Math.ceil( Math.log( value ) / Math.LN2 ) );
    }
    
    public static floorPowerOfTwo( value : number ) : number {
        return Math.pow( 2, Math.floor( Math.log( value ) / Math.LN2 ) );
    }
}
