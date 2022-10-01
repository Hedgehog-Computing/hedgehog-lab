---
sidebar_position: 1
---

import { MathJax, MathJaxContext } from 'better-react-mathjax'

# Quickbook

Here is an overall view of the Hedgehog Computing Project.

---

### A Programming Environment inside a Browser

No installation or package management is required. Just open a browser and start coding, with a full-featured programming environment. Hedgehog Lab will execute and configure everything automatically. Hedgehog Lab is a web-based programming environment that runs in a browser, includes a text editor, a compiler, and an output window.


---


### **Hedgehog Script**: Built on top of JavaScript, easy to learn

In **Hedgehog Script**, most of the basic syntax and features are similar to the JavaScript. Variable and expressions, functions, classes, modules, etc. are all the same. The only difference is that Hedgehog Script supports operator overloading for matrix, vector and symbolic computing, which makes it easier to write linear algebra, statistics and machine learning code.

Here is an exmaple:

<iframe src="https://hlab.app/s/docs/quickbook_demo_1"
    width="100%"
    height="500px">
  </iframe>

To write snippets or scripts in Hedgehog Lab, you will need to understand some basic JavaScript/TypeScript. This includes but is not limited to: 
- Variables and expressions
- Control flow
- Functions
- Classes
- Packages and modules
 

This is what **Hedgehog Script** covers and gives examples of. There are many other topics that can be used in your scripts, and you can learn about them from MDN: [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

### Math, Linear Algebra, Statistics and Machine Learning

Math and Plot are both **reference libraries** of functions for math, and plot respectively. They are on the top navigation bar in this book. Later we will include more books such as machine learning, put plot into data visualization, and more.

In each reference library, in each page, a function is written with an explanation in the same format for each page. Let's go through that format with an example:

We will use `dot_multiply()` from 'Math' which takes two matrices and multiplies them **element-wise**.

Example:

#### `dot_multiply(input1: any[] | Mat | Tensor, input2: any[] | Mat | Tensor)`

**param** `input1` first input, the first multiplicand

**param** `input2` second input, the second multiplicand

**returns: any[] | Mat | Tensor** - A copy of the structure multiplied **element-wise** (Note: this is not a standard multiplication of matrices), similar to dot_divide

This function, similar to dot_divide, takes two structures of the same sizes, divides the elements element-wise, and returns it:

<iframe src="https://hlab.app/s/docs/dot_multiply_hbook"
    width="100%"
    height="500px">
  </iframe>

Notice the pattern (and all reference functions in math and plot and future libraries follow this): we have the name of the function with it's input parameters : their types. For this example, the input is `input1` which can be `any[]`, `Mat`, or `Tensor`. Similarly, it has a second parameter, `input2` with the same types, namely `any[]` or `Mat` or `Tensor`. 

Then we have the parameter descriptions, a separate line for each parameter. 

Then we have the statement for what it returns, and what type it returns, and a description of it. In this case, it returns either `any[]`, a `Mat`, or `Tensor`. This returned value is a copy of the structure multiplied element-wise. 

Lastly, we have a function description at the end of the reference page: " This function, similar to dot_divide, takes two structures of the same sizes, divides the elements element-wise, and returns it" with an example from Hedgehog Lab in action.

This is how you read the reference materials.

## Overall

Now that you understand the Lab itself, and the prerequisites (JavaScript namely), and how to read the reference material, feel free to dive in and write your own snippets, read our source code, read the reference libraries 'Math' and 'Plot' and build upon what's built! 

Thank you and we hope you enjoy.



