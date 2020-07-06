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
print("Without GPU acceleration...");
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

// Show the output matrix in fixed-point format with 5 digits
A.digits = 5;

print(sin(A));
print(log(A));  // log A with base e
print(log(A,2));  // log A with base 2 

//More functions are on the way...
`;


demo_5_insert_tex = 
`let A = mat([[7,2],[2,1]]);

// a short introduction
tex("\\\\text{Cholesky decomposition is a classical matrix decomposition algorithm in this form:}")
formulaTex("A=LL^{T},")


// let's  calculate the cholesky now
let L = chol(A).L;

// and keep 5 digits 
L.digits = 5
tex("\\\\text{where A is a positive-definite and symmetric matrix.} \\\\\\\\ \\\\text{For example, we have } A = " + A.toTex() + "\\\\text{, and the decomposed matrix L is }" + L.toTex())
`

demo_6_graphics = 
`// generate 2D points as vectors of x and y 
let x = range(-10,10,0.1);
let y = sin(x) + random(1,x.cols);
let x_vec = x.toArray(); 
let y_vec = y.toArray();

// plot x and y as scatter 
plot2D(x_vec,y_vec);  

// ploy x and y as line
plot2DLine(x_vec,y_vec);   

// generate 3D points as vectors of x, y and z
let size = 30;
x = zeros(size);
for (let i=0;i<size;i++) {for (let j=0;j<size;j++){x.val[i][j] = i-size/2;}}
y = x.T();
let z = x**2 + y**2;
x_vec = x.toArray(); 
y_vec = y.toArray();
let z_vec = z.toArray(); 

// plot x,y,z as scatter in 3D
plot3D(x_vec,y_vec, z_vec);

// mesh of x,y,z 
plot3DMesh(x_vec,y_vec,z_vec);

/* For more advanced features and different kinds of charts, 
   please check the official website plotly.js https://plotly.com/javascript/
   and use built-in function draw(data, layout) instead. Here is an example
*/


var trace1 = {
  x: [1, 2,3,4,5],
  y: [1, 2,2.5,3,3.1],
  type: 'scatter',
  name: '(1,1)'
};

var trace2 = {
  x: [1, 2,3,4,5],
  y: [1, 2,2.1,7,10],
  type: 'scatter',
  name: '(1,2)',
  xaxis: 'x2',
  yaxis: 'y2'
};

var trace3 = {
  x: [1, 2,3,4,5],
  y: [1, 2,2.1,7,10],
  type: 'scatter',
  name: '(1,2)',
  xaxis: 'x3',
  yaxis: 'y3'
};

var trace4 = {
  x: [1, 2,3,4,5,6,7,8,9,10],
  y: [1, 2,-1,-2,1,5,7,9,11],
  type: 'scatter',
  name: '(1,2)',
  xaxis: 'x4',
  yaxis: 'y4'
};

var data = [trace1, trace2, trace3, trace4];

var layout = {
  title: 'Multiple Custom Sized Subplots',
  xaxis: {
    domain: [0, 0.45],
    anchor: 'y1'
  },
  yaxis: {
    domain: [0.5, 1],
    anchor: 'x1'
  },
  xaxis2: {
    domain: [0.55, 1],
    anchor: 'y2'
  },
  yaxis2: {
    domain: [0.8, 1],
    anchor: 'x2'
  },
  xaxis3: {
    domain: [0.55, 1],
    anchor: 'y3'
  },
  yaxis3: {
    domain: [0.5, 0.75],
    anchor: 'x3'
  },
  xaxis4: {
    domain: [0, 1],
    anchor: 'y4'
  },
  yaxis4: {
    domain: [0, 0.45],
    anchor: 'x4'
  }
};

// with data and layout, we can directly pass them to draw() function
draw(data,layout);

`

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