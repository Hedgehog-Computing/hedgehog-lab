/*
About preprocessor, please check the document at 
https://github.com/Hedgehog-Computing/Hedgehog-Package-Manager

Hedgehog Lab supports three types of "*import":
a. *import YOUR_FULL_URL, for example *import http://website.com/mylib/myfunction.hhs
b. *import Package_Name: Function_1, Function_2, Function_3 ... the package name must be registered at https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Package-Manager/main/hedgehog-packages.json
c. let my_Function_A = *import MY_PACKAGE: Function_A
d. *github: Hedgehog-Computing/math/main/myFunction ( which will automatically convert to -> https://raw.githubusercontent.com/Hedgehog-Computing/math/main/myFunction.hhs)
e. *import @username/filename 
*/

import { githubDependency } from './GithubDependency/githubDependency';
import { fetchURL } from './FetchURL/fetchURL';
import { fetchApi } from './FetchURL/fetchApi';

async function preprocessor(source: string): Promise<string> {
  //console.log('The source code after preprocessing');
  const result = await preprocessDFS(source, 'root');
  //console.log(result);
  //console.log('End of the source code after preprocessing');
  return result;
}

/*
Fetch the full registered package list from 
https://github.com/Hedgehog-Computing/Hedgehog-Package-Manager
at 
https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Package-Manager/main/hedgehog-packages.json

Input: Package Name. For example, "Hedgehog-Standard-Library" or "std"
Output: The root location of the package. For example, "https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Standard-Library/main/"
*/

function getPackageLocation(packageName: string, theFullListInJson: string): string {
  //console.log('Package name: ' + packageName + ' , full list in json: ' + theFullListInJson);
  const jsonObj = JSON.parse(theFullListInJson);
  for (const element of jsonObj) {
    if (element['name'] === packageName || element['alias'] === packageName) {
      return element['location'];
    }
  }
  throw 'Cannot find the package with name: ' + packageName;
}

/*

Parse the registered package without package json file setup
All packages can be parsed in this way:

*import Package: Function1, Function2, Function3

*/
async function parseRegisterdPackageWithoutPackageJsonFile(
  secondPart: string,
  strCurrentCallStack: string
): Promise<Array<string>> {
  const returnListOfFunctions: string[] = [];
  const theFullListInJson = await fetch(
    'https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Package-Manager/main/hedgehog-packages.json',
    { method: 'get' }
  ).then((body) => body.text());
  const splittedResult = secondPart.split(':');
  if (splittedResult.length != 2) throw 'Invalid importing library: ' + secondPart;

  //get the right package name and HHS list string
  const packageName = splittedResult[0];
  const importedHHSListString = splittedResult[1];

  //get package location
  const packageLocation = getPackageLocation(packageName.replace(/\s/g, ''), theFullListInJson);

  const importedItemList = importedHHSListString.split(',');
  for (const eachItem of importedItemList) {
    const eachItemWithoutSpace = eachItem.replace(/\s/g, '');

    const currentHHSLocation = packageLocation + eachItemWithoutSpace + '.hhs';
    const currentItemSourceCode = await fetch(currentHHSLocation, { method: 'get' }).then(
      (response) => {
        if (!response.ok) {
          throw (
            'Failed to fetch the dependency. \nPackage:' +
            secondPart +
            '\nMissing file location: ' +
            currentHHSLocation
          );
        } else {
          return response.text();
        }
      }
    );

    // After get the whole hhs source file, preprocess the string via DFS preprocessor
    // to handle the dependencies of current source file string
    const preprocessedCurrentItemSourceCode = await preprocessDFS(
      currentItemSourceCode,
      strCurrentCallStack + ' -> ' + strCurrentCallStack + ':' + eachItemWithoutSpace
    );
    returnListOfFunctions.push(preprocessedCurrentItemSourceCode);
  }

  return returnListOfFunctions;
}

// A helper function to check if a string contains URL or not. Reference: https://regexr.com/3e6m0
function containsURL(code: string): boolean {
  const expression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  const regex = new RegExp(expression);
  if (code.match(regex)) return true;
  return false;
}

// code is the string of code, and strCurrentCallStack is the full call stack
async function preprocessDFS(code: string, strCurrentCallStack: string): Promise<string> {
  //1. split the codes into lines
  const vecSplittedString = code.split(/\r?\n/);

  //2. initialize the the chunk of string to return
  let returnCode = '';

  //3. process each line of code
  try {
    for (let i = 0; i < vecSplittedString.length; i++) {
      returnCode += '\n';
      if (vecSplittedString[i].includes('*import ')) {
        //3.1 otherwise, split the string by "*import ", keep the first part (if it exists), then download
        //and fetch the second part recursively (which should be and must be a valid URL, @username/filename or a registered package)
        const currentString = vecSplittedString[i];
        const splittedResult = currentString.split('*import ');
        if (splittedResult.length < 2) {
          throw (
            'Invalid current line of code for preprocessing: \n' +
            +'\nCall stack: \n' +
            strCurrentCallStack +
            '\nCurrent line: ' +
            currentString +
            '\n'
          );
        }
        //3.1.1 add the first part
        returnCode += splittedResult[0];
        //3.1.2 Is it imported from URL, @username/filename, or from a registered package?
        if (containsURL(splittedResult[1])) {
          //3.1.2.1.1 download the library from URL
          const libraryFromUrl = await fetchURL(splittedResult[1]);

          //3.1.2.1.2 get the current file information (get "FunctionABC.js" from URL string http://mywebsite/FunctionABC.js)
          const splittedURLResult = splittedResult[1].split('/');
          const strCallStack =
            strCurrentCallStack + ' -> ' + splittedURLResult[splittedURLResult.length - 1];
          console.log(strCallStack);
          //3.1.2.1.3 process the big chunk of code
          const currentResult = await preprocessDFS(libraryFromUrl, strCallStack);

          //3.1.2.1.4 append it to the end of returnCode
          returnCode += currentResult + '\n';
        } else if (splittedResult[1].charAt(0) === '@') {
          //3.1.2.2.1 remove "@" symbol and split username and filename by "/"
          const resultWithoutAt = splittedResult[1].slice(1);
          const userAndFile = resultWithoutAt.split('/');

          //3.1.2.2.2 get the library from api
          const libraryFromApi = await fetchApi(userAndFile[0], userAndFile[1]);

          //3.1.2.2.3 get the current file information (For example, storage '@lidang/sound_of_May' as 'root -> lidang -> sound_of_May')
          const strCallStack = strCurrentCallStack + ' -> ' + userAndFile[0] + ' -> ' + userAndFile[1];

          //3.1.2.2.4 process the big chunk of code
          const currentResult = await preprocessDFS(libraryFromApi, strCallStack);

          //3.1.2.2.5 append it to the end of returnCode
          returnCode += currentResult + '\n';

        } else {
          ////3.1.2.3 otherwise, try to split with colon and comma and fetch the registered packages
          const result = await parseRegisterdPackageWithoutPackageJsonFile(
            splittedResult[1],
            strCurrentCallStack
          );
          let combined_result = '';
          result.forEach((element) => {
            combined_result += element + '\n';
          });
          returnCode += combined_result + '\n';
        }
      } else if (vecSplittedString[i].includes('*github ')) {
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
            +'\nCall stack: \n' +
            strCurrentCallStack +
            '\nCurrent line: ' +
            currentString +
            '\n'
          );
        }
        //3.2.2 download the library from URL
 
        const libraryFromUrl = await githubDependency(splittedResult[1]);

        //3.2.3 get the current file information (get "FunctionABC.js" from URL string http://mywebsite/FunctionABC.js)
        const splittedURLResult = splittedResult[1].split('/');
        const strCallStack =
          strCurrentCallStack + ' -> ' + splittedURLResult[splittedResult.length - 1];

        //3.2.4 process the big chunk of code
        const currentResult = await preprocessDFS(libraryFromUrl, strCallStack);

        //3.2.5 append it to the end of returnCode
        returnCode += currentResult + '\n';
      } else {
        //3.3 otherwise, just add the current line to the return string
        returnCode += vecSplittedString[i];
      }
    }
  } catch (err) {
    throw (
      'Exception while preprocessing the script.\n' +
      'Error: ' +
      err +
      '\nCall stack: ' +
      strCurrentCallStack
    );
  }

  return await returnCode;
}

export default preprocessor;
