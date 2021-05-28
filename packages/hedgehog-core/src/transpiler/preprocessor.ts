/*
About preprocessor, please check the document at 
https://github.com/Hedgehog-Computing/Hedgehog-Package-Manager

Hedgehog Lab supports three types of "*import":
a. *import YOUR_FULL_URL, for example *import http://website.com/mylib/myfunction.hhs
b. *import Package_Name: Function_1, Function_2, Function_3 ... the package name must be registered at https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Package-Manager/main/hedgehog-packages.json
c. let my_Function_A = *import MY_PACKAGE: Function_A
*/

async function preprocessor(source: string): Promise<string> {
  console.log('The source code after preprocessing');
  const result = await preprocessDFS(source, 'root');
  console.log(result);
  console.log('End of the source code after preprocessing');
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
  console.log('Package name: ' + packageName + ' , full list in json: ' + theFullListInJson);
  const jsonObj = JSON.parse(theFullListInJson); 
  for (const element of jsonObj) {
    if (element['name'] === packageName || element['alias'] === packageName) {
      return element['location'];
    }
  }
  throw 'Cannot find the package with name: ' + packageName;
}

/*
Parse the registered package (the type 1 of import macro: *import PACKAGE_NAME: LIB_NAME_LIST)
Input: secondPart: the second part of current line splitted by "*import". For example, current line is "*import std:magic, cholesky",
       then the input will be "std:magic, cholesky"; if current line is "let myMagic = *import std:magic", then the input should 
       be "std:magic, cholesky"
       strCurrentCallStack: current call stack
Output: A list of string, each string represents the corresponding hhs source file
*/
async function parseRegisterdPackage(
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
  const packageName = splittedResult[0]
  const importedHHSListString = splittedResult[1];

  //get package location
  const packageLocation = getPackageLocation(packageName.replace(/\s/g, ''), theFullListInJson);

  //get the package json file: package_location + hedgehog-package.json
  const packageJsonFile = packageLocation + 'hedgehog-package.json';

  console.log('Package Json file: ' + packageJsonFile);
  //get the hedgehog-pacakge.json, then get the list of "includes" libraries
  const thePackageJsonString = await fetch(packageJsonFile, { method: 'get' }).then((body) =>
    body.text()
  );
  console.log('Package Json string: ' + thePackageJsonString);
  const thePackageJsonObj = JSON.parse(thePackageJsonString);
  if ('includes' in thePackageJsonObj) {
    const hhsCompleteList = thePackageJsonObj['includes'];
    const setHHSCompleteList = new Set(hhsCompleteList);
    const importedItemList = importedHHSListString.split(',');
    for (const eachItem of importedItemList) {
      const eachItemWithoutSpace = eachItem.replace(/\s/g, '');
      if (setHHSCompleteList.has(eachItemWithoutSpace)) {
        const currentHHSLocation = packageLocation + eachItemWithoutSpace + ".hhs";
        const currentItemSourceCode = await fetch(currentHHSLocation, { method: 'get' }).then(
          (body) => body.text()
        );

        // After get the whole hhs source file, preprocess the string via DFS preprocessor
        // to handle the dependencies of current source file string
        const preprocessedCurrentItemSourceCode = await preprocessDFS(
          currentItemSourceCode,
          strCurrentCallStack + ' -> ' + strCurrentCallStack + ':' + eachItemWithoutSpace
        );
        returnListOfFunctions.push(preprocessedCurrentItemSourceCode);
      }
    }
  } else {
    throw (
      'Cannot find "includes" key in the hedgehog-package.json configuration file! Please add a key with name "includes" with a complete list of exported libraries. Exception at ' +
      secondPart +
      '.\nCall Stack at: ' +
      strCurrentCallStack
    );
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
      //3.1 if current line of code doesn't contain "*import ", just append it to returnCode
      if (!vecSplittedString[i].includes('*import ')) {
        returnCode += '\n' + vecSplittedString[i];
      }
      //3.2 otherwise, split the string by "*import ", keep the first part (if it exists), then download 
      //    and fetch the second part recursively (which should be and must be a valid URL or a registered package)
      else {
        const currentString = vecSplittedString[i];
        const splittedResult = currentString.split("*import ");
        if (splittedResult.length < 2) {
          throw (
            'Invalid current line of code for preprocessing: \n' +
          + "\nCall stack: \n" + strCurrentCallStack +
            '\nCurrent line: ' +
            currentString +
            '\n'
          );
        }
        //3.2.1 add the first part
        returnCode += splittedResult[0];
        //3.2.2 Is it imported from URL or from a registered package?
        if (containsURL(splittedResult[1])){
          //3.2.2.1 download the library from URL
          const libraryFromUrl = await fetch(splittedResult[1], { method: 'get' }).then((body) => {
            const real_library = body.text();
            return real_library;
          });

          //3.2.3 get the current file information (get "FunctionABC.js" from URL string http://mywebsite/FunctionABC.js)
          const splittedURLResult = splittedResult[1].split('/');
          const strCallStack = strCurrentCallStack + " -> " + splittedURLResult[splittedResult.length - 1];

          //3.2.4 process the big chunk of code
          let currentResult = await preprocessDFS(libraryFromUrl, strCallStack);

          //3.2.5 append it to the end of returnCode
          returnCode += currentResult + "\n";
        }

        else{
          // otherwise, try to split with colon and comma and fetch the registered packages
          let result = await parseRegisterdPackage(splittedResult[1], strCurrentCallStack);
          let combined_result = "";
          result.forEach(element => {
            combined_result += element + "\n"
            returnCode+= combined_result + '\n';
          });
        }

        
      }
    }
  }
  catch (err) {
    throw "Exception while preprocessing the script.\n" + "Error: " + err + "\nCall stack: " + strCurrentCallStack;
  }

  return await returnCode;
}

export default preprocessor;
