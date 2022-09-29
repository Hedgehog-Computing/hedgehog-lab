// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import nerdamer from 'nerdamer/all';

import { Mat, Scalar } from '../lib/matrix';
import * as _Tensor from '../lib/tensor';
import * as _Mat from '../lib/matrix';
import { Tensor } from '../lib/tensor';
import { Table } from '../lib/table';
import _MathLib from '../lib/mathlib';
import { Sym } from '../lib/symbolic';
import { OutputItem } from '../output/output-item';
import { rawInputsToTex } from '../utilites/process-raw-inputs';

import * as React from 'react';

/*
Third party libraries
*/

// synchrounous fetch
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('sync-fetch');

// gpu.js
import { GPU } from 'gpu.js';

// math.js
import * as mathjs from 'mathjs';

// ml.js

// tensorflow.js
import * as tf from '@tensorflow/tfjs';

// opencv.js

// d3.js

//tvm.js

export { Sym, Mat, Scalar, _Mat, nerdamer, GPU, mathjs, tf, React, Tensor, Table };

/* 
   import all mljs library and export 
   (https://github.com/mljs/ml)
*/

import * as mlPCA from 'ml-pca';
import * as mlMatrix from 'ml-matrix';
import * as mlHclust from 'ml-hclust';
import * as mlSimpleLinearRegression from 'ml-regression-simple-linear';
export { mlPCA, mlMatrix, mlHclust, mlSimpleLinearRegression };

/**
 * wrapper of constructing a Mat object
 */
export function mat(input?: number[][] | number[] | number): Mat {
  return new Mat(input);
}

/**
 * wrapper of constructing a Tensor object
 */
export function tensor(input?: any): Tensor {
  return new Tensor(input);
}

/**
 * wrapper for Sym class
 */
export function sym(varName: string): Sym {
  return new Sym(varName);
}

/**
 * wrapper for Scalar class
 */
export function scalar(val: number): Scalar {
  return new Scalar(val);
}

// other functions for symbolic computation

/**
 * diff from nerdamer.
 *
 * x: sym object for input expression,
 */
export function diff(input: Sym, varName?: Sym, times = 1): Sym {
  if (varName) {
    return new Sym(nerdamer.diff(input.toString(), varName.toString(), times).text());
  }
  return new Sym(nerdamer.diff(input.toString(), times).text());
}

/**
 * integrate from nerdamer
 */
export function integrate(input: Sym, varName?: Sym): Sym {
  if (varName) {
    return new Sym(nerdamer.integrate(input.toString(), varName.toString()).text());
  }
  return new Sym(nerdamer.integrate(input.toString()).text());
}

//below are some functions that convert Matrix into other format and vice versa

//CSV to Matrix
export function csv2mat(strCSV: string): Mat {
  return _Mat.csv2mat(strCSV);
}
export function mat2csv(A: Mat): string {
  return _Mat.mat2csv(A);
}

//Json to Matrix
export function json2mat(json_str: string): Mat {
  return _Mat.json2mat(json_str);
}
export function mat2json(A: Mat): string {
  return _Mat.mat2json(A);
}

export function tensor2json(A: Tensor): string {
  return _Tensor.tensor2json(A);
}

export function json2tensor(A: string): Tensor {
  return _Tensor.json2tensor(A);
}

//Math Lib functions
export function sin(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('sin(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.sin(A);
  }
  return _MathLib.sin(A);
}
export function cos(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('cos(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.cos(A);
  }
  return _MathLib.cos(A);
}
export function abs(A: Mat | number[][] | number[] | number): Mat | Tensor | number {
  if (typeof A === 'number') {
    return Math.abs(A);
  }
  return _MathLib.abs(A);
}
export function acos(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('acos(' + A.expression + ')');
  }
  if (typeof A === 'number') {  
    return Math.acos(A);
  }
  return _MathLib.acos(A);
}
export function acosh(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('acosh(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.acosh(A);
  }
  return _MathLib.acosh(A);
}
export function exp(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('exp(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.exp(A);
  }
  return _MathLib.exp(A);
}
export function log(
  A: Mat | number[][] | number[] | number | Sym,
  base?: number
): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('log(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.log(A);
  }
  return _MathLib.log(A, base);
}
export function asin(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('asin(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.asin(A);
  }
  return _MathLib.asin(A);
}
export function asinh(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('asinh(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.asinh(A);
  }
  return _MathLib.asinh(A);
}
export function atan(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('atan(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.atan(A);
  }
  return _MathLib.atan(A);
}
export function atanh(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('atanh(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.atanh(A);
  }
  return _MathLib.atanh(A);
}
export function tan(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('tan(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.tan(A);
  }
  return _MathLib.tan(A);
}
export function tanh(A: Mat | number[][] | number[] | number | Sym): Mat | Sym | number | Tensor {
  if (A instanceof Sym) {
    return sym('tanh(' + A.expression + ')');
  }
  if (typeof A === 'number') {
    return Math.tanh(A);
  }
  return _MathLib.tanh(A);
}
export function pow(A: Mat | number[][] | number[] | number, y: number): Mat | number | Tensor {
  if (typeof A === 'number') {
    return Math.pow(A, y);
  }
  return _MathLib.pow(A, y);
}
//matrix constructors
export function Ns(row: number, col: number, N: number): Mat {
  return mat().Ns(row, col, N);
}
export function ones(row: number, col?: number): Mat {
  return mat().ones(row, col);
}
export function zeros(row: number, col?: number): Mat {
  return mat().zeros(row, col);
}
export function diag(input_array: number[]): Mat {
  return mat().diag(input_array);
}
export function eye(row: number, col?: number): Mat {
  return mat().eye(row, col);
}
export function random(row: number, col?: number): Mat {
  return mat().random(row, col);
}
export function range(start: number, end = null, step = 1): Mat {
  return mat().range(start, end, step);
}

//tic and toc
let timestamp = 0;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function tic() {
  timestamp = performance.now();
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function toc() {
  print(`Elapsed time: ${performance.now() - timestamp} milliseconds.`);
}

//below is the execution part

const _OUTPUT_ITEMS_LIST_: OutputItem[] = [];

export { _OUTPUT_ITEMS_LIST_ };

// print function is a function for user to output information
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function print(data: any) {
  _OUTPUT_ITEMS_LIST_.push({ itemType: 'TEXT', text: data.toString() });
}

//draw function is a function for user to draw figures using plotly.js
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function draw(data: any, layout?: any) {
  _OUTPUT_ITEMS_LIST_.push({ itemType: 'DRAWING', data, layout });
}

// plot2D is a wrapper for draw() function for scatter plot on 2D only
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function plot2D(x_: any, y_: any) {
  if (x_ instanceof Mat && y_ instanceof Mat) {
    draw([
      {
        x: x_.toArray(),
        y: y_.toArray(),
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'blue', size: '2' }
      }
    ]);
    return;
  }
  draw([
    {
      x: x_,
      y: y_,
      type: 'scatter',
      mode: 'markers',
      marker: { color: 'blue', size: '2' }
    }
  ]);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function plot2DLine(x_: any, y_: any) {
  if (x_ instanceof Mat && y_ instanceof Mat) {
    draw([
      {
        x: x_.toArray(),
        y: y_.toArray(),
        type: 'scatter',
        mode: 'lines+markers',
        marker: { color: 'blue', size: '4' }
      }
    ]);
    return;
  }
  draw([
    {
      x: x_,
      y: y_,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'blue', size: '4' }
    }
  ]);
}

// plot3D is a wrapper for draw() function for scatter plot on 3D only
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function plot3D(x_: any, y_: any, z_: any) {
  if (x_ instanceof Mat && y_ instanceof Mat && z_ instanceof Mat) {
    draw(
      [
        {
          x: x_.toArray(),
          y: y_.toArray(),
          z: z_.toArray(),
          mode: 'markers',
          marker: { color: 'blue', size: 2 },
          opacity: 0.5,
          type: 'scatter3d'
        }
      ],
      {}
    );
    return;
  }
  draw(
    [
      {
        x: x_,
        y: y_,
        z: z_,
        mode: 'markers',
        marker: { color: 'blue', size: 2 },
        opacity: 0.5,
        type: 'scatter3d'
      }
    ],
    {}
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function plot3DMesh(x_: any, y_: any, z_: any) {
  if (x_ instanceof Mat && y_ instanceof Mat && z_ instanceof Mat) {
    draw(
      [
        {
          x: x_.toArray(),
          y: y_.toArray(),
          z: z_.toArray(),
          mode: 'markers',
          marker: { color: 'blue', size: 2 },
          opacity: 0.5,
          type: 'mesh3d'
        }
      ],
      {}
    );
    return;
  }
  draw(
    [
      {
        x: x_,
        y: y_,
        z: z_,
        mode: 'markers',
        marker: { color: 'blue', size: 2 },
        opacity: 0.5,
        type: 'mesh3d'
      }
    ],
    {}
  );
}

/**
 * Render a table (2-D array of string with/without headers) in React
 */
export function showTable(currentTable: Table) {
  const table: Table = currentTable;
  _OUTPUT_ITEMS_LIST_.push({ itemType: 'TABLE', table: table });
}

// show Tex in MathJax
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function tex(...inputs: any[]) {
  const inputTex: string = rawInputsToTex(...inputs);
  _OUTPUT_ITEMS_LIST_.push({ itemType: 'TEX', text: inputTex });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function formulaTex(...inputs: any[]) {
  const inputTex: string = rawInputsToTex(...inputs);
  _OUTPUT_ITEMS_LIST_.push({ itemType: 'FORMULA', text: inputTex });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function markdown(...inputs: any[]) {
  const inputMarkdown: string = rawInputsToTex(...inputs);
  _OUTPUT_ITEMS_LIST_.push({ itemType: 'MARKDOWN', text: inputMarkdown });
}

/*
Synchrnous get function.
Input: string, URL
Output: string, text of URL
*/
export function get(input: string): string {
  return fetch(input).text();
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function echart(input: any): void {
  _OUTPUT_ITEMS_LIST_.push({ itemType: 'ECHART', option: input });
}
