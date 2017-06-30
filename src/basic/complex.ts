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

import {EPSILON} from '../constants'
import {isequal} from '../utils'

export default class Complex {
  real : number;
  imag : number;

  constructor(real?:number,imag?:number) {
    this.real = real || 0;
    this.imag = imag || 0;
  }

  isEqual(other:Complex, tolerance=EPSILON) {
    return isequal(this.real,other.real,tolerance) &&
      isequal(this.imag,other.imag,tolerance);
  }

  toString(precision=4) {
    let sign = (this.imag >=0) ? '+' : '-';
    return `(${this.real.toFixed(precision)}`+
      `${sign}${Math.abs(this.imag).toFixed(precision)}i)`;
  }
}