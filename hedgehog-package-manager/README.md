# Hedgehog Package Manager

Hedgehog-Package-Manager is the core package manager for Hedgehog Lab. It only contains a single list permanently on Github at

[https://raw.githubusercontent.com/Hedgehog-Computing/hedgehog-lab/dev/hedgehog-package-manager/hedgehog-packages.json](https://raw.githubusercontent.com/Hedgehog-Computing/hedgehog-lab/dev/hedgehog-package-manager/hedgehog-packages.json)

## A quick tutorial for Hedgehog Lab user

You can use any libraries on Hedgehog Manager by using keyword <code>*import PACKAGE_NAME : FUNCTION_NAME</code>, which PACKAGE_NAME is the package name defined in the JSON list, and FUNCTION_NAME is the actual function defined in the package.

For example, you want to use **magic** and **fibonacci** functions defined at **Hedgehog-Standard-Library**, and the package **Hedgehog-Standard-Library** is defined in the JSON list as:

```json
{
  "name":"Hedgehog-Standard-Library",
  "alias":"std",
  "location":"https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Standard-Library/main/",
  "docs":"https://github.com/Hedgehog-Computing/Hedgehog-Standard-Library/blob/main/README.md",
  "website": "https://github.com/Hedgehog-Computing/Hedgehog-Standard-Library",
  "author": "lidangzzz",
  "description": "The standard library for Hedgehog Lab"
}
```

Then you don't need to install anything or configurations in your environment, just add the <code>*import</code> macro at the beginning of your script:

```javascript
*import std : magic, fibonacci
```

or

```javascript
*import Hedgehog-Standard-Library : magic, fibonacci
```

And Hedgehog Lab will help you download and add <code>magic.hhs</code> and <code>fibonacci.hhs</code> from the package root location, then all functions imported above is ready to use.

The two demos above are exactly the same as importing from URL like:

```javascript
*import https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Standard-Library/main/magic.hhs
*import https://raw.githubusercontent.com/Hedgehog-Computing/Hedgehog-Standard-Library/main/fibonacci.hhs
```

You can also import libraries inside a function/class scope, for example:

```javascript

function Negative_Magic_Matrix(N){
  *import std : magic
  return magic(N) * -1
}

```

which will keep the <code>magic(N)</code> function only alive inside the scope of <code>Negative_Magic_Matrix</code> function.

Also you can import and rename any function/class, for example:

```javascript
let chol = *import std : Cholesky_Decomposition
print(chol(MatrixX))
```

in which function <code>chol(MatrixX)</code> is exactly the same as <code>Cholesky_Decomposition(MatrixX)</code> (but do NOT assign multiple functions into one variable using <code>*immport</code>, for example <code>let my_function =*import MY_LIB: A, B, C, D, E</code>).

If you want to specify a certain version of package, just add <code>version VER_NUMBER</code> after the package name/alias, such as:

```javascript
*import Hedgehog-Standard-Library version 1.2 : magic, fibonacci
```

Otherwise, the latest code from the location will be downloaded and added.

## For Package Developers

- Each package on Github or on your own server must contains a package description file ```hedgehog-package.json```, including the package name and all the hhs files that can be imported, for example:

```
{
  "name":"Hedgehog-Standard-Library",
  "includes" : ["magic", "fibonacci"]
}
```

which means user can import ```magic.hhs``` and ```fibonacci.hhs``` files directly by using ```*import NAME: magic, fibonacci```, which means ```magic.hhs``` and ```fibonacci.hhs``` must be valid files at the root of the package.

- Feel free to add your package into this repo, including the official name, alias and location. It allows users to import your libraries and modules conveniently.
- Please do NOT add malicious codes into your library, such as data theft, back doors, uploading privacy information, cryptocurrency mining or other harmful scripts.
- Please make sure that there aren't any other packages existing that are using your name or alias as names or aliases before submitting pull requests.
- It's recommended to keep each file name exactly the same as the function/class name, and each file contains one and only one function/class.
- It's OK that adding several functions/classes/variables/constants into a single hhs file, for example, the instructor wants to setup the environment for students at CS101, and create a package called <code>XX-Univeristy-CS101</code>

<code>XX-University-CS101/CS101-homework-1-environment.hhs</code>

```javascript
*import LinearAlgebraLib: SVD, LU, QR
function EigenVector(X){ ... }
class LogisticRegression(X, Y){ ... }
let SVM = *import AnotherLibrary: SupportVectorMachine
let dataset = getDataset("http://dataset.com/dataset.csv").toMatrix()
let trainingDatasetX = datasets.Rows(0,1000).Cols(0,10)
let trainingDatasetY = datasets.Cols(0,1000).Cols(10,11)
...
```

so that students can setup all functions/classes/variables above by adding one line of code in Hedgehog Lab at beginning:

```javascript
*import XX-University-CS101 : CS101-homework-1-environment
```

And please specify the usage above in the package document.

- If any stable version released officially, please remember to add another folder of codes at <code>location/VER_NUMBER</code> with all codes of current version. Also please keep all legacy version of package. This will allow the other package developes or users to choose any older version of your package. Also if you decide to maintain a stable package, please import all dependencies with a specified version number so that the behavior of each function will always keep same.

For example <code>PackageA 1.0 -> { PackageX version 1.1, PackageY version 1.2}</code>, a good design for MyFunction at PackageA 1.0 should be:

```javascript
function MyFunction (mat1, mat2, mat3, mat4){
   *import PackageX version 1.1: f1, f2
   *import PackageY version 1.2: f3, f4
   return f1(mat1) + f2(mat2) *  ( f3(mat3) / f4(mat4) );
}

```

And when the user tries to use <code>{PackageA version 1.0, PackageX version 2.0, PackageY version 3.0}</code> as

```javascript
*import PackageA version 1.0 : MyFunction
*import PackageX version 2.0 : f1, f2
*import PackageY version 3.0 : f3, f4, f5
```

so that X and Y packages with different versions will be automatically downloaded inside different scope.

- Github, Github Gist and Gitlab are all recommended for packages and datasets. You can also develop and maintain your own package server.
- Hedgehog Computing reserves the right to refusing pull requests, and the right of modifying or removing any package information from the JSON list file.

## How it works

Before compiling and running any codes in Hedgehog Lab, the package JSON list will be downloaded from Hedgehog-Package-Manager and converted into a table. A preprocessor traverses all the codes and find macros of <code>*import</code>.

- If a package is imported in this format: <code>*import PACKAGE_NAME : FUNCTION_1 FUNCTION_2 FUNCTION_3...</code>, preprocessor will try to look up the <code>PACKAGE_NAME</code> in package JSON list, and if it exists as a value of key <code>"name"</code> or <code>"alias"</code>, preprocessor will get the value of <code>location</code> (for example <code>PACKAGE_LOCATION</code>) try to fetch the following library files:

```
PACKAGE_LOCATION + FUNCTION_1 + ".hhs"
PACKAGE_LOCATION + FUNCTION_2 + ".hhs"
PACKAGE_LOCATION + FUNCTION_3 + ".hhs"
```

or with version number if user specify it in this way <code>*import PACKAGE_NAME version VER_NUMBER: FUNCTION_1 FUNCTION_2 FUNCTION_3...</code>

```
PACKAGE_LOCATION + "VER_NUMBER/" + FUNCTION_1 + ".hhs"
PACKAGE_LOCATION + "VER_NUMBER/" + FUNCTION_2 + ".hhs"
PACKAGE_LOCATION + "VER_NUMBER/" + FUNCTION_3 + ".hhs"
```

and process these source code files recursively. After all of the files preprocessed, the results will be added to the source code sequentially.

For example, the user imports a few functions in this way:

```javascript
*import Package-A : Function_M, Function_N
*import Package-B : Function_P

print(Function_X(A) + Function_N(A) + Function_P(A))
```

And <code>Function_M</code> is

```javascript
function Function_M (X) {
  *import Package-C : Function_Q, Function_R
  return X + Function_Q(X^(-1)) + Function_R
}
```

After preprocessing, the whole code before compiling is:

```javascript
function Function_M(X) { 
    function Function_Q(X) {...}
    function Function_R(X) {...}
    return X + Function_Q(X^(-1)) + Function_R
}

function Function_N(X) {...}
function Function_P(X) {...}

print(Function_X(A) + Function_N(A) + Function_P(A))
```
