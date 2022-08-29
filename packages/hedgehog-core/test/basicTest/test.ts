import { assert } from 'chai';
import { transpile, executeOutput } from '../../src/index';

describe('The basic compiler and runtime test', async () => {
  const transpileResult = await transpile('x = 1; print(x);');
  const executeResult = await executeOutput(transpileResult);
  it('should pass', () => {
    assert.equal(executeResult.length, 1);
    assert.equal(executeResult[0].text, '1');
    assert.equal(executeResult[0].itemType, 'TEXT');
  });
});
