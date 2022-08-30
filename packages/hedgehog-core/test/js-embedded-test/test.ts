import { assert } from 'chai';
import { transpile, executeOutput } from '../../src/index';
import { isEqual } from 'lodash';

const testCode1 = `
let a = [[1,2],[3,4]];
let b = [[5,6],[7,8]];
let c = a + b;
*js-start

*js-end
print( c ===[ [ 6, 8 ], [ 10, 12 ] ] );
`;

describe('The embedded-js test', async () => {

});
