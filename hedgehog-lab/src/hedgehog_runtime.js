const { GPU } = require('gpu.js');
const gpu = new GPU();





class Mat {

    //the 2D array of matrix elements
    val: number[][]; 
    
    //row and column of matrix
    rows: number; cols: number; 
    
    // mode: the mode of matrix computation. It could only be 'gpu', 'wasm' or ''
    mode:string;
    clear() { this.val = []; this.rows = 0; this.cols = 0; return this; }
    constructor(input?: number[][] | number[]| number) {
        this.mode = '';
        this.val = []; this.rows = 0; this.cols = 0;
        if (typeof input == 'number'){
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
    dimensions(): number[] { return Array.from([this.rows, this.cols]); }
    isVector(): boolean { return this.rows <= 1;}

    //initialize with a 2D array
    init(input2DArray: any): Mat {
        this.clear(); this.rows = input2DArray.length;
        if (this.rows > 0) this.cols = input2DArray[0].length; else this.cols = 0;
        for (var i = 0; i < input2DArray.length; i++) { this.val.push([...input2DArray[i]]); }
        return this;
    }

    dimCheck(row: number, col: number) {
        if (row >= this.rows || row < 0 || col > this.cols || col < 0 || Number.isInteger(row) == false || Number.isInteger(col) == false) {
            throw new Error("Invalid row or column");
        }
    }

    //initialize with 1D array (vector) into an N-by-1 matrix
    initVec(input1DArray: any): Mat {
        this.clear(); this.rows = 1; this.cols = input1DArray.length; this.val.push([...input1DArray]);
        return this;
    }

    //generate a N-by-1 matrix by initializing a range vector [start:end:step]. 
    range(arg1: number, arg2 = null, step = 1): Mat {
        var rangeVector = [];
        var start = 0, end = 0;
        if (arg2==null) { start = 0; end = arg1; } // range from 0 to arg1 
        else { start = arg1; end = arg2; } //range from arg1 to arg2
        if (start < end) {
            for (var iterator = start; iterator < end; iterator += step) {
                rangeVector.push(iterator);
            }
            return this.initVec(rangeVector);
        }   
        for (var iterator = start; iterator > end; iterator += step) {  //else
            rangeVector.push(iterator);
        } return this.initVec(rangeVector);
    }

    // return a clone of this matrix
    clone(): Mat {
        var returnMat = new Mat(); returnMat.rows = this.rows; returnMat.cols = this.cols;
        for (var i = 0; i < this.val.length; i++) returnMat.val.push([...this.val[i]]);
        return returnMat;
    }

    // initialize a matrix by copying from another matrix
    copy(inputMat: Mat): Mat { this.init(inputMat.val); this.cols = inputMat.cols; this.rows = inputMat.rows; return this; }

    equals(inMat: Mat, EPSILON=0.0001): boolean {
        if (this.cols != inMat.cols || this.rows != inMat.rows) return false;
        var sumOfDiff = this.minus(inMat).squareSum();
        return (sumOfDiff<= EPSILON);
    }

    //initialze an row-by-col matrix with all elements are N
    Ns(row: number, col: number, N: number): Mat {
        this.clear(); this.rows = row; this.cols = col;
        for (var i = 0; i < row; i++) { this.val.push(Array(col).fill(N)); }
        return this;
    }

    //initialze a zero matrix
    zeros(row: number, col: number): Mat { return this.Ns(row, col, 0); }
    ones(row: number, col: number): Mat { return this.Ns(row, col, 1); }

    // initiaze an N*N matrix with diag values
    diag(input1DArray: number[]): Mat {
        this.clear(); this.zeros(input1DArray.length, input1DArray.length);
        for (var i = 0; i < input1DArray.length; i++) this.val[i][i] = input1DArray[i];
        return this;
    }
    identity(N: number): Mat {
        var diag_ones = Array(N).fill(1);
        return this.diag(diag_ones);
    }

    // initialize a random matrix
    random(row: number, col: number): Mat {
        this.clear(); this.zeros(row, col);
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) this.val[row][col] = Math.random();
        }
        return this;
    }

    T(): Mat { // transpose
        var returnMatrix = new Mat().zeros(this.cols, this.rows);
        for (var row = 0; row < this.rows; row++) { for (var col = 0; col < this.cols; col++) returnMatrix.val[col][row] = this.val[row][col]; }
        return returnMatrix;
    }

    transpose(): Mat { return this.T(); }

    each(func: Function): Mat {
        for (var row = 0; row < this.rows; row++) {
            for (var col = 0; col < this.cols; col++) this.val[row][col] = func(this.val[row][col]);
        }
        return this;
    }

    //add, multiply, minus, divide with one scalar value
    adds(val: number): Mat { 
        var returnMatrix = this.clone(); 
        returnMatrix.each(function (eachMatrixValue: number): number { return eachMatrixValue + val; }); 
        return returnMatrix; 
    }
    muls(val: number): Mat { 
        var returnMatrix = this.clone(); 
        returnMatrix.each(function (eachMatrixValue: number): number { return eachMatrixValue * val; });
        return returnMatrix.clone();
    }
    minuss(val: number): Mat { return this.adds(val * (-1)); }
    divs(val: number): Mat { return this.muls(1.0 / val); }

    //matrix operations. All matrix operation member functions are NOT In Place
    add(rightMat: Mat): Mat { return add(this, rightMat); }
    minus(rightMat: Mat): Mat { return minus(this, rightMat); }
    mul(rightMat: Mat): Mat {  return mul(this, rightMat); }



    // matrix plus operator overload
    // mat1 + A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    [Symbol.for('+')] (rightOperand: Mat | number | number[] | number[][]): Mat {
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            return add(this, new Mat(rightOperand));
        } 
        
        //if right operand is a number, add the number as a scalar
        if (typeof rightOperand == 'number'){
            return this.adds(rightOperand);
        }
        //otherwise, add the right operand as a matrix
        return add(this, rightOperand);
    }

    // matrix minus operator overload
    // mat1 - A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    [Symbol.for('-')] (rightOperand: Mat | number| number[] | number[][]): Mat {
        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            return minus(this, new Mat(rightOperand));
        } 
        //if right operand is a number, minus the number as a scalar
        if (typeof rightOperand == 'number'){
            return this.minuss(rightOperand);
        }
        //otherwise, minus the right operand as a matrix
        return minus(this, rightOperand);
    }

    // matrix multiply operator overload
    // mat1 * A
    // the right operand A could be a matrix, a 2D array, a 1D array or a scalar number
    [Symbol.for('*')] (rightOperand: Mat | number| number[] | number[][]): Mat {

        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            var rightOperandMatrix = new Mat(rightOperand);
            return mul(this, rightOperandMatrix);
        } 

        //if right operand is a number, mul the number as a scalar
        if (typeof rightOperand == 'number'){
            return this.muls(rightOperand);
        }
        //otherwise, multiply the right operand as a matrix
        return mul(this, rightOperand);
    }

    // Mat ^ N, the power of a matrix
    // if N == -1, return the inverse matrix
    // otherwise return the result of matrix multiplying itself 
    [Symbol.for('^')] (rightOperand: number): Mat {

        if (this.rows != this.cols) throw new Error("This matrix does not support ^ operator");
        //if right operand is -1, return the inverse matrix
        if (rightOperand == -1){

            //todo: we need to implement a matrix inverse algorithm in this library without dependencies such as mathjs
            return this;  
        }
        
        if (!Number.isInteger(rightOperand) || rightOperand<1) throw new Error("This right operand does not support ^ operator");

        var returnMatrix = this.clone();
        for (var i =2;i<= rightOperand; i++){
            mulInPlace(returnMatrix, this);
        }

        return returnMatrix;
    }

    // compare mat1 == mat2, which right operand mat2 could be a matrix object, 2D array, 1D array or a scalar number
    [Symbol.for('==')] (rightOperand: Mat | number| number[] | number[][], EPSILON=0.0001): boolean {

        //if right operand is a raw array of number or 2D array, initialize the matrix first
        if (Array.isArray(rightOperand)){
            var rightOperandMatrix = new Mat(rightOperand);
            return this.equals(rightOperandMatrix);
        } 

        //if right operand is a number, mul the number as a scalar
        else if (typeof rightOperand == 'number'){
            if (this.rows != 1 || this.cols != 1)
            {
                throw new Error("This matrix cannot be compared with a scalar");
            }
            return (this.val[0][0] - rightOperand)*(this.val[0][0] - rightOperand) < EPSILON;
        }
        //otherwise, minus the right operand as a matrix
        return this.equals(rightOperand);
    }
    

    //setter and getter
    set(row: number, col: number, val: number): Mat { this.dimCheck(row, col); this.val[row][col] = val; return this; }
    get(row: number, col: number): number { this.dimCheck(row, col); return this.val[row][col]; }
    at(row: number, col: number): number { this.dimCheck(row, col); return this.val[row][col]; }

    //get a row vector (as an N-by-1 matrix) by index
    row(rowIndex: number): Mat { this.dimCheck(rowIndex, 0); return new Mat().initVec(this.val[rowIndex]); }

    //get a column vector (as an N-by-1 matrix) by index
    col(colIndex: number): Mat {
        this.dimCheck(0, colIndex); var columnVector = Array(this.rows).fill(0);
        for (var rowPt = 0; rowPt < this.rows; rowPt++) columnVector[rowPt] = this.val[rowPt][colIndex];
        return new Mat().initVec(columnVector);
    }

    //return a 2D array
    to2DArray(): number[][] { return this.clone().val; }

    //return a 1D array
    toArray(): number[] { return [].concat(...this.val); }

    //reshape matrix
    reshape(row: number, col: number): Mat {
        var returnMatrix = new Mat().zeros(row, col); var thisArray = this.toArray(); var arrayPt = 0;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                if (arrayPt < thisArray.length) { returnMatrix.val[i][j] = thisArray[arrayPt]; arrayPt++; }
                else { break; }
            }
            if (arrayPt >= thisArray.length) break;
        }
        return returnMatrix;
    }

    //resize matrix to a smaller matrix [rowStart , rowEnd), [colStart , colEnd)
    //All extra spaces will be filled with zero
    subMatrix(rowStart: number, rowEnd: number, colStart: number, colEnd: number): Mat {

        if (rowStart < 0 || rowEnd > this.rows || colStart < 0 || colEnd > this.cols || rowStart > rowEnd || colStart > colEnd) {
            throw new Error("Please check the dimensions of subMatrix");
        }

        
        var returnMatrix = new Mat().zeros(rowEnd - rowStart, colEnd - colStart);

        for (var i = rowStart; i < rowEnd; i++) {
            var row_index_of_return_matrix = i - rowStart;
            for (var j = colStart; j < colEnd; j++) {
                var col_index_of_return_matrix = j - colStart;
                returnMatrix.val[row_index_of_return_matrix][col_index_of_return_matrix] = this.val[i][j];
            }
        }
        return returnMatrix;
    }


    //get a few rows of matrix
    getRows(rowStart: number, rowEnd: number): Mat {
        return this.subMatrix(rowStart, rowEnd, 0, this.cols);
    }

    //get a few columns of matrix
    getCols(colStart: number, colEnd: number): Mat {
        return this.subMatrix(0, this.rows, colStart, colEnd);
    }

    //resize the matrix to a larger or smaller matrix
    //and fill the extra spaces with defaultValue
    resize(row: number, col: number, defaultValue = 0): Mat {
        var returnMatrix = new Mat().Ns(row, col, defaultValue);
        var min_row = Math.min(row, this.rows);
        var min_col = Math.min(col, this.cols);
        for (var i = 0; i < min_row; i++) {
            for (var j = 0; j < min_col; j++) {
                returnMatrix.val[i][j] = this.val[i][j];
            }
        }
        return returnMatrix;
    }

    rowVector(row: number): number[] {
        return [...this.val[row]];
    }

    columnVector(col: number): number[] {
        var ret = [];
        for (var i = 0; i < this.rows; i++) ret.push(this.val[i][col]);
        return ret;
    }


    squareSum(): number {
        var ret = 0;
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.cols; j++) {
                var val = this.val[i][j];
                ret += val * val;
            }
        }
        return ret;
    }

    //return the format of matrix as a CSV string
    toString():string{ return mat2csv(this); }
    toCSV():string { return mat2csv(this) ; }

    //output the whole information to console
    log(): Mat { console.log(this); return this; }  //output in console

    //append matrix x to the bottom
    //A =  [A]
    //     [x]
    appendInRow(x_:Mat): Mat{
        var x = x_.clone();
        if (x.cols != this.cols){
            throw new Error('Dimension does not match on  appendInRow()');
        }

        this.val.push(...x.val);
        this.rows +=x.rows;

        return this;
    }

    //append matrix x to the right
    //A = [A|x]
    appendInColumn(x_:Mat):Mat{
        var x = x_.clone();
        if (x.rows != this.rows){
            throw new Error('Dimension does not match on  appendInColumn()');
        }

        for (var i=0;i<this.rows;i++){
            this.val[i].push(...x.val[i]);
        }
        this.cols += x.cols;

        return this;
    }
}


// below is a wrapper of constructing a Mat object
function mat(input?: number[][] | number[]| number): Mat {return new Mat(input);}





// below are matrix operators, including add, minus, multiply and dot multiply

//leftMatrix + rightMatrix, save the result into left matrix
function addInPlace(leftMatrix: Mat, rightMatrix: Mat): Mat {
    if (leftMatrix.rows != rightMatrix.rows || leftMatrix.cols != rightMatrix.cols) throw new Error("Dimesion does not match for operation:add");
    var rows = leftMatrix.rows, cols = leftMatrix.cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
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
    if (leftMatrix.rows != rightMatrix.rows || leftMatrix.cols != rightMatrix.cols) throw new Error("Dimesion does not match for operation:minus");
    var rows = leftMatrix.rows, cols = leftMatrix.cols;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
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
function mul(leftMat: Mat, rightMat: Mat): Mat {
    if (leftMat.cols != rightMat.rows) throw new Error("Dimesion does not match for operation:muitiply");

    if (leftMat.mode == 'gpu' || rightMat.mode == 'gpu') return mul_gpu(leftMat, rightMat);

    var m = leftMat.rows, n = leftMat.cols, p = rightMat.cols;
    var returnMatrix = new Mat().zeros(m, p);
    for (var i = 0; i < m; i++) {
        for (var j = 0; j < p; j++) {
            var val = 0;
            for (var it = 0; it < n; it++) val += leftMat.val[i][it] * rightMat.val[it][j];
            returnMatrix.val[i][j] = val;
        }
    }
    return returnMatrix;
}



// leftMat * rightMat and save the result to left matrix
function mulInPlace(leftMat: Mat, rightMat: Mat): Mat {
    var resultMatrix = mul(leftMat, rightMat);
    leftMat.copy(resultMatrix);
    return leftMat;
}

// leftMat * rightMat in GPU
function mul_gpu(leftMat: mat, rightMat: mat): mat {

    console.log("GPU is used for matrix multiplication acceleration.");
    //const gpu = new gpu();
    const m = leftMat.rows, n = leftMat.cols, p = rightMat.cols;


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

    const multiplyMatrix = gpu.createKernel(mulfunction_string).setOutput([m,p]);


    const c = multiplyMatrix(leftMat.val, rightMat.val);
    var returnMat = new mat();
    returnMat.val = c;
    returnMat.rows = m; returnMat.cols = p;
    return returnMat;
}


// leftMat .* rightMat, each element in leftMat multiply corresponding element in rightMat
function dotMulInPlace(leftMat: Mat, rightMat: Mat): Mat {
    if (leftMat.rows != rightMat.rows || leftMat.cols != rightMat.cols) throw new Error("Dimesion does not match for operation:dot muitiply");
    for (var i = 0; i < leftMat.rows; i++) {
        for (var j = 0; j < leftMat.cols; j++) {
            leftMat.val[i][j] *= rightMat.val[i][j]; 
        }
    }
    return leftMat;
}

function dotMul(leftMat: Mat, rightMat: Mat): Mat {
    return dotMulInPlace(leftMat.clone(), rightMat);
}



//below are some functions that convert Matrix into other format and vice versa

//Matrix to CSV
function mat2csv(A: Mat): string{
    var returnCSV = "";
    for (var i = 0; i < A.rows; i++) {
        for (var j = 0; j < A.cols; j++) {
            if (j == 0) { returnCSV += String(A.val[i][j]); }
            else { returnCSV += (',' + String(A.val[i][j])); }
        }
        returnCSV += '\n';
    }

    return returnCSV;
}

//CSV to Matrix
function csv2mat(strCSV: string): Mat {
    var A = new Mat();
    try {
        if (csv2mat.length == 0) return A;
        var split_result = strCSV.split('\n');
        var linesOfCSVString = split_result.filter(x => x.length > 0);
        var rows = linesOfCSVString.length;
        var cols = linesOfCSVString[0].split(',').length;
        A.zeros(rows, cols);

        //process each line
        for (var row = 0; row < rows; row++) {
            var eachRowString = linesOfCSVString[row];
            var listOfElement = eachRowString.split(',');
            if (listOfElement.length != cols) throw new Error("Current row " + row.toString() + " does not have same element as first row");
            for (var col = 0; col < cols; col++) {
                A.val[row][col] = Number(listOfElement[col]);
            }
        }
    }
    catch (err) {
        throw new Error("Cannot parse matrix from csv file. Exception: " + err);
    }


    return A;
}

//Matrix to Json
function mat2json(A: Mat): string {
    return JSON.stringify(A);
}

//Json to Matrix
function json2mat(json_str: string): Mat {
    var A = new Mat();
    var obj = JSON.parse(json_str);
    A.init(obj.val);
    if (A.rows == obj.rows && A.cols == obj.cols) {
        return A;
    }
    throw new Error("Fail to read matrix from json");
}

var _GLOBAL_RESULTS_ = [];
function print(a) { _GLOBAL_RESULTS_.push(a); }

function execute(your_code:string):string{
    var final_results  = eval(your_code + "\n _GLOBAL_RESULTS_");
    var final_results_in_string = "";
    final_results.forEach(element => {
        final_results_in_string += '\n' + element;
    });

    _GLOBAL_RESULTS_ = [];
    return final_results_in_string;
}

export default execute;