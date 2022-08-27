/*
   Function splitSourceCodeIntoJSandHHSSnippetList()
    Input: The source code
    Output: a list of objects, each object contains:
        - the type of the object: js or hhs
        - the code snippet as a string
    
    The js code snippet is the part of the source code that is
    between *js-start and *js-end, and all the rest parts are hhs code snippets.

    After the parsing, the code snippet will be transformed into a list of 
    objects, and the transpiler core will be able to compile the hedgehog script
    into javascript, while the js code will not be compiled and will be executed
    as what it is.

*/

import { CodeSnippet, CodeSnippetType } from './CodeSnippetObject';

export function splitSourceCodeIntoJSandHHSSnippetList(source: string): Array<CodeSnippet> {
  const vecSplittedString = source.split('\n');
  const vecJSandHHSSnippetList: Array<CodeSnippet> = [];
  for (let i = 0; i < vecSplittedString.length; i++) {
    vecJSandHHSSnippetList.push(new CodeSnippet(CodeSnippetType.js, vecSplittedString[i]));
  }
  return vecJSandHHSSnippetList;
}
