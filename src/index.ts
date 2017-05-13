
 /*

 Copyright (C) 2017 Jayesh Salvi, Blue Math Software Inc.

 This file is part of bluemath.

 bluemath is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 bluemath is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with bluemath. If not, see <http://www.gnu.org/licenses/>.

*/

import * as utils from './utils'
import * as basic from './basic'
import * as geom from './geom'

type NumberArray1D = Array<number>;
type NumberArray2D = Array<NumberArray1D>;
type NumberType = 'int8'|'int16'|'int32'|'float32'|'float64';
type TypedArray = Int8Array | Uint8Array | Int16Array |
    Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;

export {
  utils,
  basic,
  geom,
  NumberArray1D,
  NumberArray2D,
  NumberType,
  TypedArray
}

