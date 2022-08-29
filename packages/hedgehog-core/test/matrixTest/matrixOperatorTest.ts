import { assert } from 'chai';
import { transpile, executeOutput } from '../../src/index';

describe('Matrix operator test', async () => {
  it('should pass', async () => {
    const matrixPlusCode = `
      let a = [[1,2],[3,4]];
      let b = [[5,6],[7,8]];
      let c = a + b;
      print( c ==[ [ 6, 8 ], [ 10, 12 ] ] );
      `;
    const transpileResult = await transpile(matrixPlusCode);
    const executeResult = await executeOutput(transpileResult);
    assert.equal(executeResult.length, 1);
    assert.equal(executeResult[0].text, 'true');
  });
});
