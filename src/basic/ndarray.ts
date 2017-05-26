
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

import {TypedArray} from '..'

type DataType = 'i8'|'ui8'|'i16'|'ui16'|'i32'|'ui32'|'f32'|'f64';
export {DataType}

export interface NDArrayOptions {
  shape? : number[];
  datatype? : DataType;
  fill? : number;
}

function deduceShape(data:Array<any>) {
  let dim = 0;
  let d = data;
  let shape = [data.length];
  while(Array.isArray(d[0])) {
    shape.push(d[0].length);
    dim++;
    d = data[0];
  }
  return shape;
}

function deduceDataType(data:TypedArray) : DataType {
  if(data instanceof Float32Array) {
    return 'f32';
  } else if(data instanceof Float64Array) {
    return 'f64';
  } else if(data instanceof Int8Array) {
    return 'i8';
  } else if(data instanceof Uint8Array) {
    return 'ui8';
  } else if(data instanceof Int16Array) {
    return 'i16';
  } else if(data instanceof Uint16Array) {
    return 'ui16';
  } else if(data instanceof Int32Array) {
    return 'i32';
  } else if(data instanceof Uint32Array) {
    return 'ui32';
  } else {
    throw new Error('Unknown datatype');
  }
}

function populateFromArray(data:TypedArray, idx:number, arr:Array<any>) {
  if(Array.isArray(arr[0])) {
    let len = 0;
    for(let i=0; i<arr.length; i++) {
      let l = populateFromArray(data, idx+len, arr[i]);
      len += l;
    }
    return len;
  } else {
    for(let i=0; i<arr.length; i++) {
      data[idx+i] = arr[i];
    }
    return arr.length;
  }
}

export default class NDArray {

  shape : number[];
  size : number;
  datatype : DataType;
  private _data : TypedArray;

  constructor(
    arg0:TypedArray|Array<any>|NDArrayOptions,
    arg1?:NDArrayOptions)
  {
    this.size = 0;
    this.datatype = 'f32';
    if(Array.isArray(arg0)) {
      this.shape = deduceShape(arg0);
      this._calcSize();
      if(arg1 && arg1.datatype) {
        this.datatype = arg1.datatype;
      }
      this._alloc(this.size, arg0, this.datatype);
    } else if(ArrayBuffer.isView(arg0)) {
      this._data = arg0;
      if(arg1 && arg1.shape) {
        this.shape = arg1.shape;
      } else {
        this.shape = [arg0.length];
      }
      // in this case options.datatype is ignored if supplied
      this.datatype = deduceDataType(arg0);
      this._calcSize();
    } else { // must be NDArrayOption
      let options = arg0;
      if(options.datatype) {
        this.datatype = options.datatype;
      }
      if(options.shape) {
        this.shape = options.shape;
        this._calcSize();
        this._alloc(this.size, undefined, this.datatype);
        if(options.fill) {
          this._data.fill(options.fill);
        }
      }
    }
  }

  reshape(shape:number[]) {
    this.shape = shape;
    let oldsize = this.size;
    this._calcSize();
    if(this.size > oldsize) {
      // Rellocate a buffer of bigger size, copy old data to it
      this._alloc(this.size, this._data, this.datatype);
      // Fill the excess elements in new buffer with 0
      this._data.fill(0,oldsize);
    }
  }

  private _calcSize() {
    this.size = this.shape.reduce((prev,cur) => prev*cur, 1);
  }

  private _alloc(size:number, data?:TypedArray|Array<any>, datatype?:DataType) {
    switch(datatype) {
    case 'i8':
      this._data = new Int8Array(size);
      break;
    case 'ui8':
      this._data = new Uint8Array(size);
      break;
    case 'i16':
      this._data = new Int16Array(size);
      break;
    case 'ui16':
      this._data = new Uint16Array(size);
      break;
    case 'i32':
      this._data = new Int32Array(size);
      break;
    case 'ui32':
      this._data = new Uint32Array(size);
      break;
    case 'f32':
      this._data = new Float32Array(size);
      break;
    case 'f64':
      this._data = new Float64Array(size);
      break;
    }
    if(Array.isArray(data)) {
      populateFromArray(this._data, 0, data);
    } else if(ArrayBuffer.isView(data)) {
      this._data.set(data);
    }
  }

  private _getAddress(...indices:number[]) {
    if(indices.length !== this.shape.length) {
      throw new Error('Mismatched number of dimensions');
    }
    let addr = 0;
    for (let i = 0; i < this.shape.length; i++) {
      if (i < this.shape.length - 1) {
        addr += this.shape[i + 1] * indices[i];
      } else {
        if(indices[i] < 0) {
          throw new Error('Invalid index '+indices[i]);
        }
        if(indices[i] >= this.shape[i]) {
          throw new Error('Index out of bounds '+indices[i]);
        }
        addr += indices[i];
      }
    }
    return addr;
  }

  get(...indices:number[]) {
    let addr = this._getAddress(...indices);
    return this._data[addr];
  }

  set(...args:number[]) {
    let nargs = args.length;
    let addr = this._getAddress(...(args.slice(0,nargs-1)));
    this._data[addr] = args[nargs-1];
  }
}