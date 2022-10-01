---
sidebar_position: 1
---

import { MathJax, MathJaxContext } from 'better-react-mathjax'

# Quickbook

Here is an overall view of the Hedgehog Computing Project.

---

#### A Programming Environment inside a Browser

Most of the programming languages 

---


#### Built on top of JavaScript, easy to learn

In Hedgehog Script, most of the basic syntax and features are similar to the JavaScript. Variable and expressions, functions, classes, modules, etc. are all the same. The only difference is that Hedgehog Script supports operator overloading for Matrix and Vector, which makes it easier to write linear algebra, statistics and machine learning code.

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
 

This is what 'Hedgehog Script' covers and gives examples of. There are many other topics that can be used in your scripts, and you can learn about them from MDN: [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---

Hedgehog lab is a tool to run, compile, and execute JavaScript for Scientific Computing, Data Analysis, and Data Visualization TOTALLY in your browser. It's an open source scientific computing environment for JavaScript, again, completely in your browser, with matrix operation and many other math functions that are supported by GPU acceleration, TeX support, and symbolic computation.

Community of Hedgehog: Scientific Computing, Data Visualization, Machine Learning, Optimization, Algebra & GPU Acceleration in JavaScript.

Basically, you can run mathematical analysis, matrix operations, data visualization and more on just your browser with JavaScript.

To understand how to do this we're going to cover these topics in the following manner: 
<ul><li>Getting Started & Hedgehog Lab </li>
      <li>Hedgehog Script</li>
      <li>Math library </li>
      <li>Plot library </li>
</ul>



## Getting Started

<iframe src="https://hlab.app/s/docs/helloworld_hbook" width="100%" height="500px" />

Notice the variety of buttons you can press and the two screens you have presented to you. Let's cover them quickly. On the **top left** you can access the snippet bar/snippet access, where you can create new snippets, explore and find other snippets, view your timeline (people you follow and their snippets), your current snippets and your profile. Note that snippets are basically scripts. 

The central button at the top is deciding if it's in LiveMode or not. If it's not, you have to click 'Run' on the **top right** each time you want to execute code. Otherwise, you may write and run code continuously using LiveMode. If you ever run into a problem, refresh the page. 

The other buttons are 'Fullscreen' for fullscreen access to the output screen (right hand screen). 'Book' for access to this book you're reading! 'Discord' for the official Hedgehog Community Discord. 'Github' for the official Hedgehog Lab GitHub repo, if you want to view or contribute to this open source project and lastly, 'Run' which executes the code on the left screen.

As implied, the two screens, left and right, are code (input) on the left and output on the right.

## Hedgehog Script




## Math & Plot

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



