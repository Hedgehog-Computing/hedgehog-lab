import fetch_library from './utilities/fetch_library';

function preprocess(your_code:string):string{
    return your_code;

    // below is a fetch function to download a string from url
    // it could be a library or a csv file or a json of matrix
    // this is one of issues with highest priority in to-do list
    let lib = fetch_library("https://gist.githubusercontent.com/lidangzzz/cc13e32762418a2b198759682f351f81/raw/d4f7a4046ee3fa53aa15728a31cc4a540a86713c/test1.js");
    console.log("The source code after preprocessor");
    let result = lib + "\n\n\n" + your_code;
    console.log(result);
    return result;
}


/*

Function "preprocess_dependencies" is the core function that handle the dependencies of the source code
by feteching the strings of libraries and adding at the top of the source code.

For example, the input string is --

import http://a.com/my_function.js
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


---


Syntax: each third-party dependency line MUST start with keyword "import" following with the string of URL

For example:

import http://a.com/b.js


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


//Right now only import is used. Also preprocess will handle import for once and cannot traverse the dependency graph. 
//This will be done in a later version. 
async function preprocess_dependencies(your_code:string):string{

    //1. split code by new lines
    let splitted_vector_of_string = your_code.split(/\r?\n/);

    //2. traverse each line of source code and replace "import [url]" by the actual code
    let return_source_code = "";

    try{
        splitted_vector_of_string.forEach( eachLine => {

            //if the first seven chars are "import "
            if (eachLine.substring(0,7) === "import ") {

                let lib_url = eachLine.substring(7);     //get the remaining string from 7 as URL
                let lib_source_code =  fetch(lib_url, {method:'get'})
                .then(function(body){
                    let real_library =  body.text();
                    return real_library;
                })
                .then(async function(real_library){
                    console.log("Fetch library URL: " + lib_url);
                    console.log("Fetch return raw string: \n" + real_library);
                    return_source_code += await real_library;
                });//fetch the library source code

                //TODO: parse the library source code recursively, traverse the dependency graph
            }

            //if this line does not contain "import" keyword, just add this line of code to "return_source_code"
            else{
                return_source_code += eachLine + '\n';
            }
    });
    }
    catch(err){
        console.log("Exception while fetching library: " + err);
    }

    console.log("Source code after preprocess:");
    console.log(return_source_code);
    return await return_source_code;
}

export default preprocess;