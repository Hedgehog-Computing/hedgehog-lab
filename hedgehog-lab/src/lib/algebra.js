import _Mat from './matrix';
import {lup, qr, } from 'mathjs';

class Mat extends _Mat.Mat {};


// Cholesky 
class Chol{
    L:Mat;
    constructor(A:Mat){
        if (A.rows != A.cols || A.rows == 0 || A.cols == 0) throw new Error("Wrong dimension of matrix A.");

        //dimension n
        let n = A.rows;
    
        //matrix L
        let L = new Mat().zeros(n, n);
    
        //iteration
        for (let i = 0; i < n; i++) {
            for (let k = 0; k < i + 1; k++) {
                let sum = 0;
                for (let j = 0; j < k; j++) {
                    sum += L.val[i][j] * L.val[k][j];
                }
    
                if (i == k) {
                    L.val[i][k] = Math.sqrt(A.val[i][i] - sum);
                }
    
                else {
                    L.val[i][k] = 1.0 / L.val[k][k] * (A.val[i][k] - sum);
                }
            }
        }
    
        this.L = L;
    }
}

// LU
class LU{

}



export {Chol}