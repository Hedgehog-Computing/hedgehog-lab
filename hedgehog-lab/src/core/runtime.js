import _Mat from './lib/matrix';
import _MathLib from './lib/mathlib';
import _Sym from './lib/symbolic';
import { Chol as _Chol, QR as _QR, LU as _LU } from './lib/algebra';
import OutputItem from './output/output-item';
var nerdamer = require('nerdamer');
require('nerdamer/Algebra.js');
require('nerdamer/Calculus.js');
require('nerdamer/Solve.js');
require('nerdamer/Extra.js');

/*

This is the core runtime for compiled hedgehog script,
all the built-in functions and classes must be defined in this file
to make sure that user can call it at function executeOutput()

*/

var Mat = _Mat.Mat;
var Sym = _Sym;
var Scalar = _Mat.Scalar;
// below is a wrapper of constructing a Mat object
function mat(input?: number[][] | number[] | number): Mat {
  return new Mat(input);
}

//wrapper for Sym class
function sym(varName: string): Sym {
  return new Sym(varName);
}

//wrapper for Scalar class
function scalar(val: number): Scalar {
  return new Scalar(val);
}

//other functions for symbolic computation

//diff from nerdamer.
//x: sym object for input expression,
function diff(input: Sym, varName?: Sym, times = 1): Sym {
  if (varName) {
    return new Sym(
      nerdamer.diff(input.toString(), varName.toString(), times).text()
    );
  }
  return new Sym(nerdamer.diff(input.toString(), times).text());
}

//integrate from nerdamer
function integrate(input: Sym, varName?: Sym): Sym {
  if (varName) {
    return new Sym(
      nerdamer.integrate(input.toString(), varName.toString()).text()
    );
  }
  return new Sym(nerdamer.integrate(input.toString()).text());
}

//below are some functions that convert Matrix into other format and vice versa

//CSV to Matrix
function csv2mat(strCSV: string): Mat {
  return _Mat.csv2mat(strCSV);
}
function mat2csv(A: Mat): string {
  return _Mat.mat2csv(A);
}

//Json to Matrix
function json2mat(json_str: string): Mat {
  return _Mat.json2mat(json_str);
}
function mat2json(A: Mat): string {
  return _Mat.mat2json(A);
}

//Math Lib functions
function sin(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('sin(' + A.expression + ')');
  }
  return _MathLib.sin(A);
}
function cos(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('cos(' + A.expression + ')');
  }
  return _MathLib.cos(A);
}
function abs(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.abs(A);
}
function acos(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('acos(' + A.expression + ')');
  }
  return _MathLib.acos(A);
}
function acosh(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('acosh(' + A.expression + ')');
  }
  return _MathLib.acosh(A);
}
function sign(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.sign(A);
}
function sqrt(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.sqrt(A);
}
function trunc(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.trunc(A);
}
function floor(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.floor(A);
}
function ceil(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.ceil(A);
}
function exp(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('exp(' + A.expression + ')');
  }
  return _MathLib.exp(A);
}
function log(
  A: Mat | number[][] | number[] | number | Sym,
  base?: number
): Mat {
  if (A instanceof Sym) {
    return sym('log(' + A.expression + ')');
  }
  return _MathLib.log(A, base);
}
function asin(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('asin(' + A.expression + ')');
  }
  return _MathLib.asin(A);
}
function asinh(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('asinh(' + A.expression + ')');
  }
  return _MathLib.asinh(A);
}
function atan(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('atan(' + A.expression + ')');
  }
  return _MathLib.atan(A);
}
function atanh(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('atanh(' + A.expression + ')');
  }
  return _MathLib.atanh(A);
}
function tan(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('tan(' + A.expression + ')');
  }
  return _MathLib.tan(A);
}
function tanh(A: Mat | number[][] | number[] | number | Sym): Mat {
  if (A instanceof Sym) {
    return sym('tanh(' + A.expression + ')');
  }
  return _MathLib.tanh(A);
}
function pow(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.pow(A);
}
function round(A: Mat | number[][] | number[] | number): Mat {
  return _MathLib.round(A);
}

//matrix constructors
function Ns(row: Number, col: number, N: number): Mat {
  return mat().Ns(N);
}
function ones(row: number, col: ?number): Mat {
  return mat().ones(row, col);
}
function zeros(row: number, col?: number): Mat {
  return mat().zeros(row, col);
}
function diag(input_array: number[]): Mat {
  return mat().diag(input_array);
}
function eye(row: number, col?: number): Mat {
  return mat().eye(row, col);
}
function random(row: number, col?: number): Mat {
  return mat().random(row, col);
}
function range(start: number, end = null, step = 1): Mat {
  return mat().range(start, end, step);
}

//linear algebra
class Chol extends _Chol {}
function chol(A: Mat): Chol {
  return new Chol(A);
}

class QR extends _QR {}
function qr(A: Mat): QR {
  return new QR(A);
}

class LU extends _LU {}
function lu(A: Mat): LU {
  return new LU(A);
}

//tic and toc
let timestamp = 0;
function tic() {
  timestamp = performance.now();
}
function toc() {
  print(`Elapsed time: ${performance.now() - timestamp} milliseconds.`);
}

//below is the execution part

// _GLOBAL_RESULTS_ is a list of strings from user output
var _GLOBAL_RESULTS_ = [];

var _OUTPUT_ITEMS_LIST_ = [];

// print function is a function for user to output information
function print(a: any) {
  _GLOBAL_RESULTS_.push(a);
  let objItem = new OutputItem();
  objItem.outputType = 'print';
  objItem.text = a;
  _OUTPUT_ITEMS_LIST_.push(objItem);
}

//draw function is a function for user to draw figures using plotly.js
function draw(data: any, layout: any) {
  let objItem = new OutputItem();
  objItem.outputType = 'draw';
  objItem.data = data;
  objItem.layout = layout;
  _OUTPUT_ITEMS_LIST_.push(objItem);
}

// plot2D is a wrapper for draw() function for scatter plot on 2D only
function plot2D(x_: any, y_: any) {
  draw([
    {
      x: x_,
      y: y_,
      type: 'scatter',
      mode: 'markers',
      marker: { color: 'blue', size: '2' },
    },
  ]);
}

function plot2DLine(x_: any, y_: any) {
  draw([
    {
      x: x_,
      y: y_,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue', size: '4' },
    },
  ]);
}

// plot3D is a wrapper for draw() function for scatter plot on 3D only
function plot3D(x_: any, y_: any, z_: any) {
  draw(
    [
      {
        x: x_,
        y: y_,
        z: z_,
        mode: 'markers',
        marker: { color: 'blue', size: 2 },
        opacity: 0.5,
        type: 'scatter3d',
      },
    ],
    {}
  );
}

function plot3DMesh(x_: any, y_: any, z_: any) {
  draw(
    [
      {
        x: x_,
        y: y_,
        z: z_,
        mode: 'markers',
        marker: { color: 'blue', size: 2 },
        opacity: 0.5,
        type: 'mesh3d',
      },
    ],
    {}
  );
}

// show Tex in MathJax
function tex(inputTex: string) {
  let objItem = new OutputItem();
  objItem.outputType = 'tex';
  objItem.text = inputTex;
  _OUTPUT_ITEMS_LIST_.push(objItem);
}

function formulaTex(inputTex: string) {
  let objItem = new OutputItem();
  objItem.outputType = 'formulaTex';
  objItem.text = inputTex;
  _OUTPUT_ITEMS_LIST_.push(objItem);
}

function markdown(inputMarkdown: string) {
  let objItem = new OutputItem();
  objItem.outputType = 'markdown';
  objItem.text = inputMarkdown;
  _OUTPUT_ITEMS_LIST_.push(objItem);
}

function executeOutput(your_code: string): any {
  let code_to_be_executed = your_code + '\n _OUTPUT_ITEMS_LIST_';

  var final_results = eval(code_to_be_executed);
  console.log('Execution results:');
  console.log(final_results);
  var return_list = [...final_results];
  _GLOBAL_RESULTS_ = [];
  _OUTPUT_ITEMS_LIST_ = [];
  return return_list;
}

export { executeOutput };
