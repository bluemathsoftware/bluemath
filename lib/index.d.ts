import { eye, zeros, iszero, isequal, torad, todeg, add, mul, sub, div } from './ops';
import * as linalg from './linalg';
import { EPSILON } from './constants';
import { NDArray, Matrix, Vector, Vector2, Vector3, Complex, PermutationVector, BandMatrix } from './basic';
export declare type NumberType = 'i8' | 'ui8' | 'i16' | 'ui16' | 'i32' | 'ui32' | 'f32' | 'f64';
export declare type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
export declare const version: any;
export { linalg, EPSILON, NDArray, Matrix, Vector, Vector2, Vector3, Complex, PermutationVector, BandMatrix, eye, zeros, iszero, isequal, torad, todeg, add, mul, sub, div };
