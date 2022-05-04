import { GPU } from 'gpu.js';
import * as mathjs from 'mathjs';

const gpu = new GPU();

export class Mat {
  // the raw data, the 2D array of matrix elements
  val: number[][];

  // number of rows and columns of matrix
  rows: number;
  cols: number;

  // mode: the mode of matrix computation. It could only be 'gpu', 'wasm' or ''
  mode: string;

  // number of digits to show at toString() member function
  // -1 (default value) means keeping all digits
  // 0 means keeping integer part only
  // N means keeping the first N digits
  digits: number;

  clear() {
    this.val = [];
    this.rows = 0;
    this.cols = 0;
    this.digits = 5;
    this.mode = '';
    return this;
  }
  constructor(input?: number[][] | number[] | number) {
    this.mode = '';
    this.digits = 5;
    this.val = [];
    this.rows = 0;
    this.cols = 0;
    if (typeof input === 'number') {
      this.val = [[input]];
      this.rows = 1;
      this.cols = 1;
      return this;
    }
    if (Array.isArray(input)) {
      //if input is an 2D array
      if (Array.isArray(input[0])) {
        this.init(input);
      }

      //else it is a 1D vector
      else {
        this.initVec(input);
      }
    }
  }
  dimensions(): number[] {
    return Array.from([this.rows, this.cols]);
  }
  isVector(): boolean {
    return this.rows <= 1;
  }

  //initialize with a 2D array
  init(input2DArray: any): Mat {
    this.clear();
    this.rows = input2DArray.length;
    if (this.rows > 0) {
      //find max column
      let max_col = 0;
      for (let j = 0; j < this.rows; j++) {
        if (input2DArray[j].length > max_col) {
          max_col = input2DArray[j].length;
        }
      }
      this.cols = max_col;
    } else {
      this.cols = 0;
    }
    for (let i = 0; i < input2DArray.length; i++) {
      //copy current row of column and fill the remaining space with 0
      const current_row = [...input2DArray[i]];
      if (this.cols > input2DArray[i].length) {
        current_row.push(...Array(this.cols - input2DArray[i].length).fill(0));
      }
      this.val.push(current_row);
    }
    return this;
  }

  dimCheck(row: number, col: number) {
    if (
      row >= this.rows ||
      row < 0 ||
      col > this.cols ||
      col < 0 ||
      Number.isInteger(row) === false ||
      Number.isInteger(col) === false
    ) {
      throw new Error('Invalid row or column');
    }
  }

  min(): number {
    return Math.min(...this.toArray());
  }
  max(): number {
    return Math.max(...this.toArray());
  }

  //initialize with 1D array (vector) into an N-by-1 matrix
  initVec(input1DArray: any): Mat {
    this.clear();
    this.rows = 1;
    this.cols = input1DArray.length;
    this.val.push([...input1DArray]);
    return this;
  }

  //generate a N-by-1 matrix by initializing a range vector [start:end:step].
  range(arg1: number, arg2: number | null = null, step = 1): Mat {
    const rangeVector = [];
    let start = 0,
      end = 0;
    if (arg2 === null) {
      start = 0;
      end = arg1;
    } // range from 0 to arg1
    else {
      start = arg1;
      end = arg2;
    } //range from arg1 to arg2
    if (start < end) {
      for (let iterator = start; iterator < end; iterator += step) {
        rangeVector.push(iterator);
      }
      return this.initVec(rangeVector);
    }
    for (let iterator = start; iterator > end; iterator += step) {
      //else
      rangeVector.push(iterator);
    }
    return this.initVec(rangeVector);
  }

  // return a clone of this matrix
  clone(): Mat {
    const returnMat = new Mat();
    returnMat.rows = this.rows;
    returnMat.cols = this.cols;
    returnMat.digits = this.digits;
    returnMat.mode = this.mode;
    for (let i = 0; i < this.val.length; i++) {
      returnMat.val.push([...this.val[i]]);
    }
    return returnMat;
  }

  // initialize a matrix by copying from another matrix
  copy(inputMat: Mat): Mat {
    this.init(inputMat.val);
    this.cols = inputMat.cols;
    this.rows = inputMat.rows;
    this.digits = inputMat.digits;
    this.mode = inputMat.mode;
    return this;
  }

  equals(inMat: Mat, EPSILON = 0.0001): boolean {
    if (this.cols !== inMat.cols || this.rows !== inMat.rows) return false;
    const sumOfDiff = this.minus(inMat).squareSum();
    return sumOfDiff <= EPSILON;
  }

  //initialze an row-by-col matrix with all elements are N
  Ns(row: number, col: number, N: number): Mat {
    this.clear();
    this.rows = row;
    this.cols = col;
    for (let i = 0; i < row; i++) {
      this.val.push(Array(col).fill(N));
    }
    return this;
  }

  //initialze a zero matrix
  zeros(row: number, col?: number): Mat {
    if (col) {
      return this.Ns(row, col, 0);
    }
    return this.Ns(row, row, 0);
  }

  //initialize a matrix with all elements === 1
  ones(row: number, col?: number): Mat {
    if (col) {
      return this.Ns(row, col, 1);
    }
    return this.Ns(row, row, 1);
  }

  // initiaze an N*N matrix with diag values
  diag(input1DArray: number[]): Mat {
    this.clear();
    this.zeros(input1DArray.length, input1DArray.length);
    for (let i = 0; i < input1DArray.length; i++) this.val[i][i] = input1DArray[i];
    return this;
  }

  // initialize eye matrix with diag elements === 1
  eye(row: number, col?: number): Mat {
    if (col) {
      this.clear();
      this.zeros(row, col);
      for (let i = 0; i < Math.min(row, col); i++) this.val[i][i] = 1;
      return this;
    }

    //else
    const diag_ones = Array(row).fill(1);
    return this.diag(diag_ones);
  }

  // initialize a random matrix
  random(row: number, col?: number): Mat {
    if (!col) {
      col = row;
    }
    this.clear();
    this.zeros(row, col);
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) this.val[row][col] = Math.random();
    }
    return this;
  }

  T(): Mat {
    // transpose
    const returnMatrix = new Mat().zeros(this.cols, this.rows);
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) returnMatrix.val[col][row] = this.val[row][col];
    }
    return returnMatrix;
  }

  transpose(): Mat {
    return this.T();
  }

  each(func: (element: number) => number): Mat {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) this.val[row][col] = func(this.val[row][col]);
    }
    return this;
  }

  //add, multiply, minus, divide with one scalar value
  addScalar(val: number): Mat {
    const returnMatrix = this.clone();
    returnMatrix.each(function (eachMatrixValue: number): number {
      return eachMatrixValue + val;
    });
    return returnMatrix;
  }
  multiplyScalar(val: number): Mat {
    const returnMatrix = this.clone();
    returnMatrix.each(function (eachMatrixValue: number): number {
      return eachMatrixValue * val;
    });
    return returnMatrix.clone();
  }
  minusScalar(val: number): Mat {
    return this.addScalar(val * -1);
  }
  divideScalar(val: number): Mat {
    return this.multiplyScalar(1.0 / val);
  }

  //matrix operations. All matrix operation member functions are NOT In Place
  add(rightMat: Mat): Mat {
    return add(this, rightMat);
  }
  minus(rightMat: Mat): Mat {
    return minus(this, rightMat);
  }
  multiply(rightMat: Mat): Mat {
    return multiply(this, rightMat);
  }
  dotMultiply(rightMat: Mat): Mat {
    return dotMultiply(this, rightMat);
  }
  divide(rightMat: Mat): Mat {
    return divide(this, rightMat);
  }

  // matrix plus operator overload
  // mat1 + A
  // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
  [Symbol.for('+')](rightOperand: Mat | number | number[] | number[][]): Mat {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      return add(this, new Mat(rightOperand));
    }

    //if right operand is a number, add the number as a scalar
    if (typeof rightOperand === 'number') {
      return this.addScalar(rightOperand);
    }
    //otherwise, add the right operand as a matrix
    return add(this, rightOperand);
  }

  // matrix minus operator overload
  // mat1 - A
  // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
  [Symbol.for('-')](rightOperand: Mat | number | number[] | number[][]): Mat {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      return minus(this, new Mat(rightOperand));
    }
    //if right operand is a number, minus the number as a scalar
    if (typeof rightOperand === 'number') {
      return this.minusScalar(rightOperand);
    }
    //otherwise, minus the right operand as a matrix
    return minus(this, rightOperand);
  }

  // matrix multiplication operator overload
  // (in Matlab: mat1 * A)
  // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
  [Symbol.for('*')](rightOperand: Mat | number | number[] | number[][]): Mat {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      const rightOperandMatrix = new Mat(rightOperand);
      return multiply(this, rightOperandMatrix);
    }

    //if right operand is a number, mul the number as a scalar
    if (typeof rightOperand === 'number') {
      return this.multiplyScalar(rightOperand);
    }
    //otherwise, multiply the right operand as a matrix
    return multiply(this, rightOperand);
  }

  // matrix element-wise multiply operator overload when right operand is matrix/2D Array/1D Array
  // ( in Matlab: matA .* matB)
  // or matrix element-wise power of N when right operand is number N
  // ( in Matlab: matA.^ N)
  [Symbol.for('**')](rightOperand: Mat | number | number[] | number[][]): Mat {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      const rightOperandMatrix = new Mat(rightOperand);

      //( in Matlab: matA .* matB)
      return dotMultiply(this, rightOperandMatrix);
    }

    // if right operand is a number, matrix element-wise power of N when right operand is number N
    // ( in Matlab: matA.^ N)
    if (typeof rightOperand === 'number') {
      const returnMatrix = this.clone();
      for (let i = 1; i < rightOperand; i++) {
        dotMultiplyInPlace(returnMatrix, this);
      }
      return returnMatrix;
    }
    //otherwise, dot multiply the right operand as a matrix
    return dotMultiply(this, rightOperand);
  }

  //matrix right division A/B = A * inv(B)
  [Symbol.for('/')](rightOperand: Mat | number | number[] | number[][]): Mat {
    //if right operand is a number/scalar
    if (typeof rightOperand === 'number') {
      return this.divideScalar(rightOperand);
    }

    //if right operand is a 1D or 2D array
    if (Array.isArray(rightOperand)) {
      const rightMatrix = new Mat(rightOperand);
      return divide(this, rightMatrix);
    }
    return divide(this, rightOperand);
  }

  // Mat ^ N, the power of a matrix
  // if N === -1, return the inverse matrix
  // otherwise return the result of matrix multiplying itself
  [Symbol.for('^')](rightOperand: number): Mat {
    if (this.rows !== this.cols) throw new Error('This matrix does not support ^ operator');
    //if right operand is -1, return the inverse matrix
    if (rightOperand === -1) {
      // matrix inverse with mathjs
      return new Mat(mathjs.inv(this.val));
    }

    if (!Number.isInteger(rightOperand) || rightOperand < 1)
      throw new Error('This right operand does not support ^ operator');

    const returnMatrix = this.clone();
    for (let i = 2; i <= rightOperand; i++) {
      multiplyInPlace(returnMatrix, this);
    }

    return returnMatrix;
  }

  // compare mat1 == mat2, which right operand mat2 could be a matrix object, 2D array, 1D array or a scalar number
  [Symbol.for('==')](
    rightOperand: Mat | number | number[] | number[][],
    EPSILON = 0.0001
  ): boolean {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      const rightOperandMatrix = new Mat(rightOperand);
      return this.equals(rightOperandMatrix);
    }

    //if right operand is a number, mul the number as a scalar
    else if (typeof rightOperand === 'number') {
      if (this.rows !== 1 || this.cols !== 1) {
        throw new Error('This matrix cannot be compared with a scalar');
      }
      return (this.val[0][0] - rightOperand) * (this.val[0][0] - rightOperand) < EPSILON;
    }
    //otherwise, minus the right operand as a matrix
    return this.equals(rightOperand);
  }

  //// compare mat1 === mat2, which right operand mat2 could be a matrix object, 2D array, 1D array or a scalar number
  [Symbol.for('===')](
    rightOperand: Mat | number | number[] | number[][] | any,
    EPSILON = 0.0001
  ): boolean {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      const rightOperandMatrix = new Mat(rightOperand);
      return this.equals(rightOperandMatrix);
    }

    //if right operand is a number, mul the number as a scalar
    else if (typeof rightOperand === 'number') {
      if (this.rows !== 1 || this.cols !== 1) {
        throw new Error('This matrix cannot be compared with a scalar');
      }
      return (this.val[0][0] - rightOperand) * (this.val[0][0] - rightOperand) < EPSILON;
    }
    //otherwise, minus the right operand as a matrix
    else if (rightOperand instanceof Mat) {
      return this.equals(rightOperand);
    }
    return false;
  }

  //// compare mat1 !== mat2, which right operand mat2 could be a matrix object, 2D array, 1D array or a scalar number
  [Symbol.for('!==')](
    rightOperand: Mat | number | number[] | number[][],
    EPSILON = 0.0001
  ): boolean {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      const rightOperandMatrix = new Mat(rightOperand);
      return !this.equals(rightOperandMatrix);
    }

    //if right operand is a number, mul the number as a scalar
    else if (typeof rightOperand === 'number') {
      if (this.rows !== 1 || this.cols !== 1) {
        throw new Error('This matrix cannot be compared with a scalar');
      }
      return !((this.val[0][0] - rightOperand) * (this.val[0][0] - rightOperand) < EPSILON);
    }
    //otherwise, minus the right operand as a matrix
    else if (rightOperand instanceof Mat) {
      return !this.equals(rightOperand);
    }
    return false;
  }

  //// compare mat1 != mat2, which right operand mat2 could be a matrix object, 2D array, 1D array or a scalar number
  [Symbol.for('!=')](
    rightOperand: Mat | number | number[] | number[][],
    EPSILON = 0.0001
  ): boolean {
    //if right operand is a raw array of number or 2D array, initialize the matrix first
    if (Array.isArray(rightOperand)) {
      const rightOperandMatrix = new Mat(rightOperand);
      return !this.equals(rightOperandMatrix);
    }

    //if right operand is a number, mul the number as a scalar
    else if (typeof rightOperand === 'number') {
      if (this.rows !== 1 || this.cols !== 1) {
        throw new Error('This matrix cannot be compared with a scalar');
      }
      return !((this.val[0][0] - rightOperand) * (this.val[0][0] - rightOperand) < EPSILON);
    }
    //otherwise, minus the right operand as a matrix
    else if (rightOperand instanceof Mat) {
      return !this.equals(rightOperand);
    }
    return false;
  }

  //setter and getter
  set(row: number, col: number, val: number): Mat {
    this.dimCheck(row, col);
    this.val[row][col] = val;
    return this;
  }
  get(row: number, col: number): number {
    this.dimCheck(row, col);
    return this.val[row][col];
  }
  at(row: number, col: number): number {
    this.dimCheck(row, col);
    return this.val[row][col];
  }

  //get a row vector (as an N-by-1 matrix) by index
  row(rowIndex: number): Mat {
    this.dimCheck(rowIndex, 0);
    return new Mat().initVec(this.val[rowIndex]);
  }

  //get a column vector (as an N-by-1 matrix) by index
  col(colIndex: number): Mat {
    this.dimCheck(0, colIndex);
    const columnVector = Array(this.rows).fill(0);
    for (let rowPt = 0; rowPt < this.rows; rowPt++) columnVector[rowPt] = this.val[rowPt][colIndex];
    return new Mat().initVec(columnVector);
  }

  //return a 2D array
  to2DArray(): number[][] {
    return this.clone().val;
  }

  //return a 1D array
  toArray(): number[] {
    return new Array<number>().concat(...this.val);
  }

  //reshape matrix
  reshape(row: number, col: number): Mat {
    const returnMatrix = new Mat().zeros(row, col);
    const thisArray = this.toArray();
    let arrayPt = 0;
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (arrayPt < thisArray.length) {
          returnMatrix.val[i][j] = thisArray[arrayPt];
          arrayPt++;
        } else {
          break;
        }
      }
      if (arrayPt >= thisArray.length) break;
    }
    return returnMatrix;
  }

  //resize matrix to a smaller matrix [rowStart , rowEnd), [colStart , colEnd)
  //All extra spaces will be filled with zero
  subMatrix(rowStart: number, rowEnd: number, colStart: number, colEnd: number): Mat {
    if (
      rowStart < 0 ||
      rowEnd > this.rows ||
      colStart < 0 ||
      colEnd > this.cols ||
      rowStart > rowEnd ||
      colStart > colEnd
    ) {
      throw new Error('Please check the dimensions of subMatrix');
    }

    const returnMatrix = new Mat().zeros(rowEnd - rowStart, colEnd - colStart);

    for (let i = rowStart; i < rowEnd; i++) {
      const row_index_of_return_matrix = i - rowStart;
      for (let j = colStart; j < colEnd; j++) {
        const col_index_of_return_matrix = j - colStart;
        returnMatrix.val[row_index_of_return_matrix][col_index_of_return_matrix] = this.val[i][j];
      }
    }
    return returnMatrix;
  }

  //resize the matrix to a larger or smaller matrix
  //and fill the extra spaces with defaultValue
  resize(row: number, col: number, defaultValue = 0): Mat {
    const returnMatrix = new Mat().Ns(row, col, defaultValue);
    const min_row = Math.min(row, this.rows);
    const min_col = Math.min(col, this.cols);
    for (let i = 0; i < min_row; i++) {
      for (let j = 0; j < min_col; j++) {
        returnMatrix.val[i][j] = this.val[i][j];
      }
    }
    return returnMatrix;
  }

  //get a few rows of matrix
  Rows(rowStart: number, rowEnd: number): Mat {
    return this.subMatrix(rowStart, rowEnd, 0, this.cols);
  }

  //get a few columns of matrix
  Cols(colStart: number, colEnd: number): Mat {
    return this.subMatrix(0, this.rows, colStart, colEnd);
  }

  //get a row of matrix in array format
  RowVector(row: number): number[] {
    return [...this.val[row]];
  }

  //get a column of matrix in array format
  ColVector(col: number): number[] {
    const ret = [];
    for (let i = 0; i < this.rows; i++) ret.push(this.val[i][col]);
    return ret;
  }

  //get a row of matrix in M-by-1 matrix format
  Row(row: number): Mat {
    return new Mat(this.RowVector(row));
  }

  //get a column of matrix in N-by-1 matrix format
  Col(col: number): Mat {
    return new Mat(this.ColVector(col));
  }

  squareSum(): number {
    let ret = 0;
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        const val = this.val[i][j];
        ret += val * val;
      }
    }
    return ret;
  }

  //set how many digits kept while display the matirx
  setDigits(x: number) {
    this.digits = x;
    return this;
  }

  /*serialize matrix to JavaScript 2D Array string, for example:
  [[1,2],
  [3,4]]
  (Users should directly copy the string as a JS 2D Array into their code)
  */

  toString(): string {
    const rowStringList = this.val.map((eachRow) => {
      return eachRow
        .map((eachValue) => {
          if (this.digits <= 0) return String(eachValue);
          else return String(eachValue.toPrecision(this.digits));
        })
        .reduce(
          (rowAccumulator, currentElementString) => rowAccumulator + ', ' + currentElementString
        );
    });

    let returnString = '';
    for (let rowIndex = 0; rowIndex < rowStringList.length; rowIndex += 1) {
      returnString +=
        '[' + rowStringList[rowIndex] + ']' + (rowIndex === rowStringList.length - 1 ? '' : ',\n');
    }
    return '[' + returnString + ']\n';
  }

  /*serialize matrix to 2D Array with Tab, for example:
  1 2
  3 4
  */
  toStringWithTab(): string {
    let returnString = '';
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // if keeps all digits
        if (this.digits <= 0) {
          if (j === 0) {
            returnString += String(this.val[i][j]);
          } else {
            returnString += '\t' + String(this.val[i][j]);
          }
        } else {
          if (j === 0) {
            returnString += this.val[i][j].toFixed(this.digits);
          } else {
            returnString += '\t' + this.val[i][j].toFixed(this.digits);
          }
        }
      }
      if (i !== this.rows - 1) returnString += '\n';
    }
    return returnString + '\n';
  }

  //return the format of matrix as a CSV string
  toCsv(): string {
    return mat2csv(this);
  }

  //return the string of current object in JSON format
  toJson(): string {
    return JSON.stringify(this);
  }

  //return the matrix in TeX format
  toTex(): string {
    let returnString = '\\begin{bmatrix} ';
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        // if keeps all digits
        if (this.digits === -1) {
          if (j === 0) {
            returnString += String(this.val[i][j]);
          } else {
            returnString += '  &  ' + String(this.val[i][j]);
          }
        } else {
          if (j === 0) {
            returnString += this.val[i][j].toFixed(this.digits);
          } else {
            returnString += '  &  ' + this.val[i][j].toFixed(this.digits);
          }
        }
      }
      if (i !== this.rows - 1) returnString += '  \\\\  ';
    }

    return returnString + ' \\end{bmatrix}';
  }

  //output the whole information to console
  log(): Mat {
    console.log(this);
    return this;
  } //output in console

  //append matrix x to the bottom
  //A =  [A]
  //     [x]
  appendInRow(x_: Mat): Mat {
    const x = x_.clone();
    if (x.cols !== this.cols) {
      throw new Error('Dimension does not match on  appendInRow()');
    }

    this.val.push(...x.val);
    this.rows += x.rows;

    return this;
  }

  //append matrix x to the right
  //A = [A|x]
  appendInColumn(x_: Mat): Mat {
    const x = x_.clone();
    if (x.rows !== this.rows) {
      throw new Error('Dimension does not match on  appendInColumn()');
    }

    for (let i = 0; i < this.rows; i++) {
      this.val[i].push(...x.val[i]);
    }
    this.cols += x.cols;

    return this;
  }
}

// below are matrix operators, including add, minus, multiply and dot multiply

//leftMatrix + rightMatrix, save the result into left matrix
function addInPlace(leftMatrix: Mat, rightMatrix: Mat): Mat {
  if (leftMatrix.rows !== rightMatrix.rows || leftMatrix.cols !== rightMatrix.cols)
    throw new Error('Dimension does not match for operation:add');
  const rows = leftMatrix.rows,
    cols = leftMatrix.cols;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      leftMatrix.val[i][j] += rightMatrix.val[i][j];
    }
  }
  return leftMatrix;
}

//leftMatrix + rightMatrix, save the result into a new matrix
function add(leftMat: Mat, rightMat: Mat): Mat {
  return addInPlace(leftMat.clone(), rightMat);
}

//leftMatrix - rightMatrix, save the result into left matrix
function minusInPlace(leftMatrix: Mat, rightMatrix: Mat): Mat {
  if (leftMatrix.rows !== rightMatrix.rows || leftMatrix.cols !== rightMatrix.cols)
    throw new Error('Dimension does not match for operation:minus');
  const rows = leftMatrix.rows,
    cols = leftMatrix.cols;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      leftMatrix.val[i][j] -= rightMatrix.val[i][j];
    }
  }
  return leftMatrix;
}

//leftMatrix - rightMatrix, save the result into a new matrix
function minus(leftMat: Mat, rightMat: Mat): Mat {
  return minusInPlace(leftMat.clone(), rightMat);
}

// leftMat * rightMat and return a new matrix
function multiply(leftMat: Mat, rightMat: Mat): Mat {
  if (leftMat.cols !== rightMat.rows)
    throw new Error('Dimension does not match for operation:muitiply');

  if (leftMat.mode === 'gpu' || rightMat.mode === 'gpu') return multiply_gpu(leftMat, rightMat);

  const m = leftMat.rows,
    n = leftMat.cols,
    p = rightMat.cols;
  const returnMatrix = new Mat().zeros(m, p);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < p; j++) {
      let val = 0;
      for (let it = 0; it < n; it++) val += leftMat.val[i][it] * rightMat.val[it][j];
      returnMatrix.val[i][j] = val;
    }
  }
  return returnMatrix;
}

// leftMat * rightMat and save the result to left matrix
function multiplyInPlace(leftMat: Mat, rightMat: Mat): Mat {
  const resultMatrix = multiply(leftMat, rightMat);
  leftMat.copy(resultMatrix);
  return leftMat;
}

// leftMat * rightMat in GPU
function multiply_gpu(leftMat: Mat, rightMat: Mat): Mat {
  console.log('GPU is used for matrix multiplication acceleration.');
  //const gpu = new gpu();
  const m = leftMat.rows,
    n = leftMat.cols,
    p = rightMat.cols;

  //here is a tricky thing: if we want to set the for-loop as the column number of left
  //matrix n, it will throw an exception because the oprand 'n' cannot be passed
  //into the backend. So we create the javascript function and compose the raw function
  //string before passing it into the create kernal function of gpu.js
  const mulfunction_part_1 = `function (a, b) {
    let sum = 0;
    for (let i = 0; i < `;

  const mulfunction_part_2 = `; i++) {
        sum += a[this.thread.y][i] * b[i][this.thread.x];
    }
    return sum;
}`;

  const mulfunction_string = mulfunction_part_1 + n.toString() + mulfunction_part_2;

  // FIXME: evil as any
  const multiplyMatrix = gpu.createKernel(mulfunction_string as any).setOutput([m, p]);

  const c = multiplyMatrix(leftMat.val, rightMat.val);
  const returnMat = new Mat();
  returnMat.val = c as number[][];
  returnMat.rows = m;
  returnMat.cols = p;
  return returnMat;
}

// leftMat .* rightMat, each element in leftMat multiply corresponding element in rightMat
function dotMultiplyInPlace(leftMat: Mat, rightMat: Mat): Mat {
  if (leftMat.rows !== rightMat.rows || leftMat.cols !== rightMat.cols)
    throw new Error('Dimension does not match for operation:dot muitiply');
  for (let i = 0; i < leftMat.rows; i++) {
    for (let j = 0; j < leftMat.cols; j++) {
      leftMat.val[i][j] *= rightMat.val[i][j];
    }
  }
  return leftMat;
}

function dotMultiply(leftMat: Mat, rightMat: Mat): Mat {
  return dotMultiplyInPlace(leftMat.clone(), rightMat);
}

// leftMat ./ rightMat
function dotDivideInplace(leftMat: Mat, rightMat: Mat): Mat {
  if (leftMat.rows !== rightMat.rows || leftMat.cols !== rightMat.cols)
    throw new Error('Dimension does not match for operation: divide');
  for (let i = 0; i < leftMat.rows; i++) {
    for (let j = 0; j < leftMat.cols; j++) {
      leftMat.val[i][j] /= rightMat.val[i][j];
    }
  }
  return leftMat.clone();
}

function dotDivide(leftMat: Mat, rightMat: Mat): Mat {
  return dotDivideInplace(leftMat.clone(), rightMat);
}

// leftMat / rightMat = leftMat * inv(rightMat)
function divideInPlace(leftMat: Mat, rightMat: Mat): Mat {
  return multiplyInPlace(leftMat, new Mat(mathjs.inv(rightMat.val)));
}

function divide(leftMat: Mat, rightMat: Mat): Mat {
  return divideInPlace(leftMat.clone(), rightMat);
}

//Matrix to CSV
export function mat2csv(A: Mat): string {
  let returnCSV = '';
  for (let i = 0; i < A.rows; i++) {
    for (let j = 0; j < A.cols; j++) {
      if (j === 0) {
        returnCSV += String(A.val[i][j]);
      } else {
        returnCSV += ',' + String(A.val[i][j]);
      }
    }
    returnCSV += '\n';
  }

  return returnCSV;
}

//CSV to Matrix
export function csv2mat(strCSV: string): Mat {
  const A = new Mat();
  try {
    if (csv2mat.length === 0) return A;
    const split_result = strCSV.split('\n');
    const linesOfCSVString = split_result.filter((x) => x.length > 0);
    const rows = linesOfCSVString.length;
    const cols = linesOfCSVString[0].split(',').length;
    A.zeros(rows, cols);

    //process each line
    for (let row = 0; row < rows; row++) {
      const eachRowString = linesOfCSVString[row];
      const listOfElement = eachRowString.split(',');
      if (listOfElement.length !== cols)
        throw new Error(
          'Current row ' + row.toString() + ' does not have same element as first row'
        );
      for (let col = 0; col < cols; col++) {
        A.val[row][col] = Number(listOfElement[col]);
      }
    }
  } catch (err) {
    throw new Error('Cannot parse matrix from csv file. Exception: ' + err);
  }

  return A;
}

//Matrix to Json
export function mat2json(A: Mat): string {
  return JSON.stringify(A);
}

//Json to Matrix
export function json2mat(json_str: string): Mat {
  const A = new Mat();
  const obj = JSON.parse(json_str);
  A.init(obj.val);
  if (A.rows === obj.rows && A.cols === obj.cols) {
    return A;
  }
  throw new Error('Fail to read matrix from json');
}

// Class Scalar is ONLY USED FOR OPERATOR OVERLOAD
export class Scalar {
  val: number;
  constructor(val: number) {
    this.val = val;
  }

  //operator add
  // scalar + rightMatrix
  [Symbol.for('+')](rightOperand: Mat): Mat {
    return rightOperand.addScalar(this.val);
  }

  // operator minus
  // scalar - rightMatrix
  [Symbol.for('-')](rightOperand: Mat): Mat {
    return rightOperand.multiplyScalar(-1).addScalar(this.val);
  }

  // operator multiply
  // scalar * rightMatrix === rightMatrix .* scalar
  [Symbol.for('*')](rightOperand: Mat | number | number[] | number[][]): Mat {
    if (rightOperand instanceof Mat) {
      return rightOperand.multiplyScalar(this.val);
    }
    return new Mat(rightOperand).multiplyScalar(this.val);
  }

  // operator "==="
  [Symbol.for('===')](rightOperand: Mat | number[] | number | number[][]): boolean {
    if (rightOperand instanceof Mat) {
      return rightOperand.equals(new Mat(this.val));
    }
    return new Mat(rightOperand).equals(new Mat(this.val));
  }

  // operator "=="
  [Symbol.for('==')](rightOperand: Mat | number[] | number | number[][]): boolean {
    if (rightOperand instanceof Mat) {
      return rightOperand.equals(new Mat(this.val));
    }
    return new Mat(rightOperand).equals(new Mat(this.val));
  }

  // operator "!=="
  [Symbol.for('!==')](rightOperand: Mat | number[] | number | number[][]): boolean {
    if (rightOperand instanceof Mat) {
      return !rightOperand.equals(new Mat(this.val));
    }
    const reuslt = new Mat(rightOperand).equals(new Mat(this.val));
    return !reuslt;
  }

  [Symbol.for('!=')](rightOperand: Mat | number[] | number | number[][]): boolean {
    if (rightOperand instanceof Mat) {
      return !rightOperand.equals(new Mat(this.val));
    }
    const reuslt = new Mat(rightOperand).equals(new Mat(this.val));
    return !reuslt;
  }
}
