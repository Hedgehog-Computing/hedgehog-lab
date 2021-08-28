// The class for tensor, n-dimensional array

export class Tensor {
  // val is an n-d array
  val: any[];
  // ndim is the number of dimensions.
  ndim: number;
  // shape is the array of number that contains the length of each dimension
  shape: number[];

  //constructor of tensor classes
  constructor(input?: any[] | number) {
    this.val = [];
    this.ndim = 0;
    this.shape = [];
    if (typeof input === 'number') {
      this.val = [input];
    } else if (input !== undefined) {
      this.val = input;
    }
    this.initializeDimensions();
  }

  /* initializeDimensions() function will check:
      1. The length of each dimension;
      2. Initialize the shape[] array of current tensor
  */
  initializeDimensions() {
    const result: number[] = [];
    let currentDimensionPt = 0;
    let pt = this.val;
    while (pt instanceof Array) {
      currentDimensionPt += 1;
      result.push(pt.length);
      pt = pt[0];
    }
    this.shape = result;
    this.ndim = result.length;
  }

  // return the list of each dimension
  dimensions(): number[] {
    return this.shape;
  }

  /* return the string of this tensor in which each 2D array is 
     formatted as a 2D matrix
     for example:
     [[[...],
      [...]],
      ...
     ]
  */
  toString(): string {
    return JSON.stringify(this.val).split('],').join('],\n').split(']],').join(']],\n');
  }

  /* return the string of this tensor in matrix format,
     which looks like the stringify 2D array
     for example:  [[[...],[...]],[[...],[...]]]
  */
  toStringDenseMode(): string {
    return JSON.stringify(this.val);
  }

  log(): Tensor {
    console.log(this);
    return this;
  }

  /* 
      Deep clone current tensor into another Tensor object 
      Todo: implement a more efficient way to clone
  */
  clone(): Tensor {
    return JSON.parse(JSON.stringify(this));
  }

  // Deep copy tensor A into this object
  copy(A: Tensor): Tensor {
    const result = A.clone();
    this.val = result.val;
    this.ndim = result.ndim;
    this.shape = result.shape;
    return this;
  }

  // TODO: Initialize a zero tensor in "shape"
  zerosAsShape(shape: number[]): Tensor {
    const returnTensor = new Tensor();
    const currentSubTensor = [];
    return returnTensor;
  }

  /*
  Todo: zeros function
  */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  zeros(
    a0?: number,
    a1?: number,
    a2?: number,
    a3?: number,
    a4?: number,
    a5?: number,
    a6?: number,
    a7?: number,
    a8?: number,
    a9?: number,
    a10?: number,
    a11?: number,
    a12?: number,
    a13?: number,
    a14?: number,
    a15?: number
  ): Tensor {
    const returnTensor = new Tensor();
    const shape: number[] = [];
    for (let i = 0; i < 16; i++) {
      // eslint-disable-next-line prefer-rest-params
      if (arguments[i] !== undefined) {
        if (arguments[i] === 0) {
          throw 'The dimension of the initialized zeros tensor cannot be zero.';
        }
        // eslint-disable-next-line prefer-rest-params
        shape.push(arguments[i]);
      }
    }
    return returnTensor;
  }

  /*
  Todo list:
  1. Constructor for certain types of tensor, such as ones, random
  2. Operators for tensors
  3. GPU operators for tensors
  */
}

export function tensor2json(A: Tensor): string {
  return JSON.stringify(A);
}

export function json2tensor(json_str: string): Tensor {
  const obj = JSON.parse(json_str);
  return new Tensor(obj.val);
}
