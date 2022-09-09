import { assert } from 'chai';
import { transpile, executeOutput } from '../../src/index';
import { isEqual } from 'lodash';

const testCode1 = `
let a = 1;
let b = 2;
let c = 3;
let matrix1 = [[1,2],[3,4]];
let matrix2 = matrix1 * 2;
js_start
let d = a + 1;
let e = b + 1;
let f = c + 1;
js_end
print( d===2 );
print( e===3 );
print( f===4 );
print( 'Hello World' );
print( matrix2 === [[2,4],[6,8]] );
`;

describe('The embedded-js simple test 1', async () => {
  it('should pass', async () => {
    const transpileResult = await transpile(testCode1);
    const executeResult = executeOutput(transpileResult);
    assert.equal(executeResult[0].text, 'true');
    assert.equal(executeResult[1].text, 'true');
    assert.equal(executeResult[2].text, 'true');
    assert.equal(executeResult[3].text, 'Hello World');
    assert.equal(executeResult[4].text, 'true');
  });
});
