import { Mat } from './matrix';
import { Tensor } from './tensor';

function to_matrix(A: Mat | number[][] | number[] | number): Mat {
  if (A instanceof Mat) {
    return A.clone();
  }
  return new Mat(A);
}

function sin(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.sin);
}

function cos(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.cos);
}

function abs(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.abs);
}

function acos(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.acos);
}

function acosh(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.acosh);
}

function asin(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.asin);
}

function asinh(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.asinh);
}

function atan(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.atan);
}

function atanh(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.atanh);
}

function tan(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.tan);
}

function tanh(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.tanh);
}

function pow(x: Mat | number[][] | number[] | number, y: number): Mat {
  return to_matrix(x).each((eachElement) => Math.pow(eachElement, y));
}

function exp(A: Mat | number[][] | number[] | number): Mat {
  return to_matrix(A).each(Math.exp);
}

function log(A: Mat | number[][] | number[] | number, base?: number): Mat {
  if (base) {
    return to_matrix(A).each((element) => Math.log(element) / Math.log(base));
  }
  return to_matrix(A).each(Math.log);
}

export default {
  sin,
  cos,
  abs,
  acos,
  acosh,
  exp,
  log,
  asin,
  asinh,
  atan,
  atanh,
  tan,
  tanh,
  pow
};
