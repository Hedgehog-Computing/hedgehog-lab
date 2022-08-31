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

    For example, the following source code:
    let a=1;
    let b=2;
    let c=a+b;
    *js-start
    function add(a,b) { return a+b; }
    console.log(c);
    *js-end
    console.log(add(a,b));

    will be parsed into the following list of objects:
    [
        {type: CodeSnippetType.hhs, code: 'let a=1; let b=2; let c=a+b;'},
        {type: CodeSnippetType.js, code: 'function add(a,b) { return a+b; } console.log(c);'},
        {type: CodeSnippetType.js, code: 'console.log(add(a,b));'}
    ]

*/

import { CodeSnippet, CodeSnippetType } from './CodeSnippetObject';

export function splitSourceCodeIntoJSandHHSSnippetList(source: string): Array<CodeSnippet> {
  const vecSplittedString = source.split('\n');
  const vecJSandHHSSnippetList: Array<CodeSnippet> = [];
  let lineCounter = 0;
  const maxLineCounter = vecSplittedString.length;
  while (lineCounter < maxLineCounter) {
    let line = vecSplittedString[lineCounter];
    if (!line) {
      lineCounter++;
      continue;
    }
    if (line === '') {
      lineCounter++;
      continue;
    }
    if (line.includes('*js-start')) {
      console.log('the first if statement');
      //find the *js-start line
      const jsStartLine = lineCounter;
      let jsEndLine = -1;
      while (lineCounter < maxLineCounter - 1) {
        lineCounter++;
        line = vecSplittedString[lineCounter];
        if (line.includes('*js-end')) {
          console.log('====js-end found');
          jsEndLine = lineCounter;
          break;
        }
      }
      if (jsEndLine === -1) {
        throw new Error('The *js-start line is not followed by a *js-end line');
      }
      //find the js code snippet
      let jsCodeSnippet = '';
      for (let i = jsStartLine + 1; i < jsEndLine; i++) {
        jsCodeSnippet += vecSplittedString[i] + '\n';
      }
      //add the js code snippet to the list
      vecJSandHHSSnippetList.push(new CodeSnippet(CodeSnippetType.js, jsCodeSnippet));
    } else {
      //find the hhs code snippet
      let hhsCodeSnippet = '';
      while (lineCounter < maxLineCounter) {
        line = vecSplittedString[lineCounter];
        if (line.includes('*js-start')) {
          lineCounter -= 1;
          break;
        }
        hhsCodeSnippet += line + '\n';
        lineCounter++;
      }
      //add the hhs code snippet to the list
      vecJSandHHSSnippetList.push(new CodeSnippet(CodeSnippetType.hhs, hhsCodeSnippet));
    }
    lineCounter++;
  }
  return vecJSandHHSSnippetList;
}
