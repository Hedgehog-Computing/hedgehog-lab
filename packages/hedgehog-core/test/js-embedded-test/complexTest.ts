import { assert } from 'chai';
import { transpile, executeOutput } from '../../src/index';
import { isEqual } from 'lodash';

const testCode1 = `
*js-start
*js-end
*js-start
*js-end
let a = 1;
let b = 2;
let c = 3;
let matrix1 = [[1,2],[3,4]];
let matrix2 = matrix1 * 2;
*js-start
let d = a + 1;
let e = b + 1;
let f = c + 1;
*js-end
*js-start
d = d + 1;
e = e + 1;
f = f + 1;
*js-end
*js-start
d = d + 1;
e = e + 1;
f = f + 1;
*js-end
*js-start
*js-end
*js-start
*js-end
*js-start
*js-end
d = d + 1;
e = e + 1;
f = f + 1;
print( d===5);
print( e===6 );
print( f===7 );
print( 'Hello World' );
print( matrix2 === [[2,4],[6,8]] );
*js-start
print( d===5);
*js-end
*js-start
*js-end
`;

describe('The embedded-js simple test 1', async () => {
  it('should pass', async () => {
    const transpileResult = await transpile(testCode1);
    const executeResult = executeOutput(transpileResult);
    console.log('the transpile result is \n ' + transpileResult);
    assert.equal(executeResult.length, 6);
    assert.equal(executeResult[0].text, 'true');
    assert.equal(executeResult[1].text, 'true');
    assert.equal(executeResult[2].text, 'true');
    assert.equal(executeResult[3].text, 'Hello World');
    assert.equal(executeResult[4].text, 'true');
    assert.equal(executeResult[5].text, 'true');
  });
});
