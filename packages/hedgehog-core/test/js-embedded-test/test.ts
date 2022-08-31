import { assert } from 'chai';
import { transpile, executeOutput } from '../../src/index';
import { isEqual } from 'lodash';

const testCode1 = `
let a = 1;
*js-start
let d = a + 1;
*js-end
print( d===2 );
`;

describe('The embedded-js test', async () => {
  const transpileResult = await transpile(testCode1);
  const executeResult = await executeOutput(transpileResult);
  console.log(executeResult);
  it('should pass', async () => {
    //assert.equal(isEqual)
  });
});
