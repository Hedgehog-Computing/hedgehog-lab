
async function fetchLibrary(lib_url: string) {
  let raw_string_return = fetch(lib_url, { method: 'get' })
    .then(function (body) {
      return body.text();
    })
    .then(function (data) {
      return data;
    });

    return raw_string_return;
}


async function preprocessor(source: string): Promise<string> {
  console.log('The source code after preprocessing');
  let result = await preprocessDFS(source , 'root');
  console.log(result);
  console.log('End of the source code after preprocessing');
  return result;
}

/*

Function "preprocess_dependencies" is the core function that handle the dependencies of the source code
by feteching the strings of libraries and adding at the top of the source code.

For example, the input string is --

*import http://a.com/my_function.js
let matrixA = mat([[1,2,3],[4,5,6]])
let result = my_function(matrixA)
print(result)


--

And the library in http://a.com/my_function.js is --
function my_function(matrixA: Mat):Mat
{
    return matrixA * matrixA.T();
}

--

Then the output of preprocess function should be:


function my_function(matrixA: Mat):Mat
{
    return matrixA * matrixA.T();
}
let matrixA = mat([[1,2,3],[4,5,6]])
let result = my_function(matrixA)
print(result)


or the input string is 

func = *import http://a.com/my_function.js
let matrixA = mat([[1,2,3],[4,5,6]])
let result = my_function(matrixA)
print(result)

and the preprocessed string will be 

func = function my_function(matrixA: Mat):Mat
{
    return matrixA * matrixA.T();
}
let matrixA = mat([[1,2,3],[4,5,6]])
let result = func(matrixA)
print(result)

---


Syntax: each third-party dependency line MUST start with keyword "import" following with the string of URL

For example:

*import http://a.com/b.js


Todo: 
Also there is an official repo that contains all stable and official libraries at https://github.com/lidangzzz/hedgehog-lib/blob/master/stable/
To use an official stable libraries in stable folder, the user should add the dependency in this way (for example, a demo function at 
https://raw.githubusercontent.com/lidangzzz/hedgehog-lib/master/stable/demo_function.js, the user should add the dependency by adding

using demo_function

at the beginning of the script, which is the same as 

import https://github.com/lidangzzz/hedgehog-lib/blob/master/stable/demo_function.js

Also the preprocessor provides a way to allow user to manage the stable libraries with another repo or standalone server or mirror 
instead of the "hedgehog-lib" repo on github by defining 

STABLE_CODE_BASE = 'http://myserver.com/my-code-base/'

so that user can import a stable function from their owm mirror server http://myserver.com/my-code-base/demo_function.js by using

using demo_function

*/



// code is the string of code, and strCurrentCallStack is the full call stack at current process
// for example 
async function preprocessDFS(code: string, strCurrentCallStack: string): Promise<string> {
  //1. split the codes into lines
  let vecSplittedString = code.split(/\r?\n/);

  //2. initialize the the chunk of string to return
  let returnCode = '';

  //3. process each line of code
  try{
    for (let i=0;i<vecSplittedString.length; i++){
      //3.1 if current line of code doesn't contain "*import ", just append it to returnCode
      if (!vecSplittedString[i].includes("*import ")){  returnCode += '\n' + vecSplittedString[i]; }
      //3.2 otherwise, split the string by "*import ", keep the first part (if it exists), then download 
      //    and fetch the second part recursively (which should be and must be a valid URL)
      else {
        let currentString = vecSplittedString[i];
        let splittedResult = currentString.split("*import ");
        if (splittedResult.length!=2) {
          throw "Invalid current line of code for preprocessing: \n" 
          + "\nCall stack: \n" + strCurrentCallStack 
          + "\nCurrent line: "+ currentString + "\n";
        }
        //3.2.1 add the first part
        returnCode += splittedResult[0];
        //3.2.2 download the library from URL
        let libraryFromUrl = await fetch(splittedResult[1], { method: 'get' })
        .then(function (body) {
          let real_library = body.text();
          return real_library;
        }); 

        //3.2.3 get the current file information (get "FunctionABC.js" from URL string http://mywebsite/FunctionABC.js)
        let splittedURLResult =  splittedResult[1].split('/');
        let strCallStack = strCurrentCallStack + " -> " + splittedURLResult[splittedResult.length-1];
        
        //3.2.4 process the big chunk of code
        let currentResult  = await preprocessDFS(libraryFromUrl, strCallStack);

        //3.2.5 append it to the end of returnCode
        returnCode += currentResult + "\n";
      }
    }
  }
  catch (err) {
    throw "Exception while preprocessing the script.\n" + "Error: " + err + "\nCall stack: " + strCurrentCallStack;
  }

  return await returnCode;
}

export default preprocessor;
