class demoCode{

    demo_1_Matrix  = 

`
//1. Initialize matrix with a 2D array. You could create a Mat object or use mat() wrapper function since they are basically the same
let a = mat([[1,2,3],[4,5,6],[7,8,9]]);
print("Matrix a is: \\n" + a);

//2. You could also create an N-by-1 matrix with 1D array
print("Another matrix is: \\n" + mat([1,2,3,4]));

//3. A matrix can be initialized by a string in CSV format
let b = csv2mat(\`
1,2
3,4
\`);
print("Creating a matrix from csv: \\n" + b);

//4. Also there are some useful built-in functions to create different kinds of matrix
print("Creating a 3-by-3 eye matrix:\\n" + eye(3));
print("Creating a random 2-by-3 matrix:\\n" + random(2,3));
print("Creating a matrix of ones:\\n" + ones(2)); 
print("Creating a matrix of zeros:\\n" + zeros(2)); 

//5. You can also create a sequence of number starting with 1 ending with 20 and increasing with step 3, then reshape it as a 3-by-3 matrix
print("Matrix c is:\\n" + range(1,20,3).reshape(3,3));
`;
    
demo_2_Operators = 

`// Operator overloads are available for Mat class. 
// Right operator could be Mat object, 2D or 1D array or number

let A = mat([[1,2],[3,4]]);
let B = mat([[3,4],[5,6]]);

print("A+B=\\n" + (A+B));
print("A-B=\\n" + (A-B));
print("A*B=\\n" + (A*B));
print("A/B=\\n" + (A/B));
print("A^3=\\n" + (A^3));
print("A^(-1)=\\n" + (A^(-1)));
print("A + [[1,1],[1,1]]=\\n" + (A + [[1,1],[1,1]]));

// If the right operands are scalar, operator will do element-wise operation (or "dot operation" in Matlab)
print("A+1=\\n" + (A+1));
print("A-1=\\n" + (A-1));
print("A*3=\\n" + (A*3));
print("A/2=\\n" + (A/2));

// For element-wise multiplication (the same as A.*B in Matlab), use operator '**' instead
print("A**A=\\n" + (A**A))

// and if the right operand of operator "**" is a number N, it will generate an element-wise 
// power of N to the left operand matrix (the same as A.^N in Matlab)
print("A**2=\\n" + A**2);

// Also operator '===' can also be used to compare if two matrix are the same at element-wise
let A1 = mat([[1,2],[3,4]]);
if (A1 === A) {
    print("A1 equals to A");
}
else {
    print("A1 does not equal to A");
}

// Also you can use both of them as an expression in Matlab-style
let C = ( A.T()* B ) + ( B * 4 - A + 1 ) * ( B^(-1) );
print("Matrix C (A'*B + (B*4 - A + 1) * (B^(-1)) is\\n" + C);
`;

demo_3_GPU_Acceleration = 
`//Create a 1000-by-1000 matrix
var x = random(1000,1000);

// do a 1000*1000 matrix multiplication without GPU acceleration
print("Without GPU acceleartion...");
tic();
var z1 = x*x;
toc();

//set mode as 'gpu', which will enable GPU acceleration
print("With GPU acceleration...");
tic();
x.mode = 'gpu'
var z2 = x*x;
toc();

`;

demo_4_build_in_functions = 
`/*
There are many built-in functions which support matrix, including     
sin, cos, abs, acos, acosh, sign, 
sqrt, trunc, floor, ceil, exp, log,
asin, asinh, atan, atanh, tan, tanh,
pow, round
*/

let A = mat([[1,2],[3,4]]);
print(sin(A));
print(log(A));  // log A with base e
print(log(A,2));  // log A with base 2 

//More functions are on the way...
`;
    demo_ = 
`//demo 1: create matrix and operator overload

var A = new Mat([[1,2], [3,4]]);
var B = new Mat([[1,2], [3,4]]);

// C = A + B*A + A'*4.2 + random(2,2)
var C = A + B*A + A.T() * 4.2 + new Mat().random(2,2);
print("Matrix C is \\n" + C);

// demo 2: matrix inverse
var d = new Mat([[1,2],[2,1]])
print("Inverse of matrix d is \\n")
print(d^(-1))

//demo 3: GPU acceleration of matrix multiply
var x = new Mat().random(1000,1000);

// do a 1000*1000 matrix multiplication without GPU acceleration
const t0 = performance.now();
var z1 = x*x;
const t1 = performance.now();
print(\`It takes $\{t1 - t0\} milliseconds for matrix multiplication without GPU.\`);

//set mode as 'gpu', which will enable GPU acceleration
const t2 = performance.now();
x.mode = 'gpu'
var z2 = x*x;
const t3 = performance.now();

print(\`It takes $\{t3 - t2\} milliseconds for matrix multiplication with GPU.\`);
`;
}


export default demoCode;