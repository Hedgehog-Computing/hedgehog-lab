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

import './ICodeSnippetObject/ICodeSnippetObject';

export function splitSourceCodeIntoJSandHHSSnippetList(source: string):  {
  const vecSplittedString = source.split('\n');
  const vecJSandHHSSnippetList = [];
  for (let i = 0; i < vecSplittedString.length; i++) {
    if (vecSplittedString[i].includes('*github ')) {
      //3.2.1 otherwise, split the string by "*github ", keep the first part (if it exists), then download
      //    and fetch real github URL with the second part recursively (which should be and must be a valid URL or a registered package)
      // For example, the code is composed at
      //      *github Hedgehog-Computing/math/main/QR
      // and the result is:
      //      https://raw.githubusercontent.com/Hedgehog-Computing/math/main/QR.hhs
      const currentString = vecSplittedString[i];
      const splittedResult = currentString.split('*github ');
      if (splittedResult.length < 2) {
        throw (
          'Invalid current line of code for preprocessing: \n' +
          '\nCall stack: \n' +
          strCurrentCallStack +
          '\nCurrent line: ' +
          currentString +
          '\n'
        );
      }
      //3.2.2 download the library from URL
      const libraryFromUrl = githubDependency(splittedResult[1]);
      vecJSandHHSSnippetList.push(libraryFromUrl);
    } else {
      //3.3 otherwise, just add the current line to the return string
      vecJSandHHSSnippetList.push(vecSplittedString[i]);
    }
  }
  return vecJSandHHSSnippetList;
}