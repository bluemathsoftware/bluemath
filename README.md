
## bluemath

Math in Javascript (Work in Progress)

[![NPM package](https://img.shields.io/npm/v/bluemath.svg)](https://www.npmjs.com/package/bluemath)

Usage
===

    npm install bluemath

Usage in TypeScript or ES6 modules javascript code

``` typescript
import {linalg} from 'bluemath'
console.log(linalg.eye(3));
```

Usage in Common JS environment (eg. node.js, browserify)

``` javascript
const linalg = require('bluemath').linalg
console.log(linalg.eye(3));
```

[**API Reference**](http://www.bluemathsoftware.com/docs/index.html)
[**Unit Tests**](http://www.bluemathsoftware.com/tests/index.html)

linalg example
===

```javascript
import {linalg, basic} from 'bluemath'
let A = new basic.NDArray([
	[11,-3,0],
	[-3,6,-1],
	[0,-1,3]
]);
let B = new basic.NDArray([30,5,-25]);
linalg.solve(A,B);
console.log(B.toArray()); // [3,1,-8]
```


Development
===

    git clone git@github.com:bluemathsoft/bluemath.git
    cd bluemath
    npm install

    # Build unit tests
    npm run build

    # Run tests by opening test/index.html in browser

    # For automatic rebuilds during development
    npm run watch


