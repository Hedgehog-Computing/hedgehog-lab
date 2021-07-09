/**
 * This is the core runtime for compiled hedgehog script,
 * all the built-in functions and classes must be defined in prelude
 * to make sure that user can call it at function executeOutput()
 */

import * as prelude from './prelude';

export function executeOutput(code: string) {
  let preludeImport = '';

  for (const key in prelude) {
    preludeImport += `const ${key} = prelude.${key};`;
  }

  // eslint-disable-next-line no-new-func
  const fn = new Function('prelude', preludeImport + code + '\n return _OUTPUT_ITEMS_LIST_;');

  const results = fn.call({}, prelude);

  console.log('***Execution results***');
  console.log(results);
  console.log('***End of execution results***');

  const returnList = [...results];
  prelude._OUTPUT_ITEMS_LIST_.length = 0;
  return returnList;
}
