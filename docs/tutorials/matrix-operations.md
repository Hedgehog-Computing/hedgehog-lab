# Matrix operations

## Basic Matrix Operations

There are a few basic operations in linear algebra.

### Matrix addition $$A+B$$

For an $$m \times n$$ matrix $$A$$ and an $$m \times n$$ matrix $$B$$, the matrix addition $$C=A+B$$ is defined as an $$m \times n$$ matrix such that

$$
C_{i,j} = A_{i,j}+B_{i,j}
$$

### Matrix product $$AB$$

For an $$m \times n$$ matrix $$A$$ and an $$n \times p$$ matrix $$B$$, the matrix product $$C=AB$$ is defined as an $$m \times p$$ matrix such that

$$
C_{i,j} = \sum^n_{k=1}A_{ik}B_{kj}
$$

for $$i=1,2,...,m$$ and $$j=1,2,...,p$$

### Matrix transposition $$A^{T}$$

For an $$m \times n$$ matrix $$A$$, the matrix transpose $$A^{T}$$ is defined as an $$n \times m$$ matrix such that

$$
A^{T}_{i,j} = A_{j,i}
$$

for $$i=1,2,...,n$$ and $$j=1,2,...,m$$

### Scalar multiplication $$cA$$

For an $$m \times n$$ matrix $$A$$ and a scalar number $$c$$, the scalar multiplication $$X=cA$$ is defined as an $$m \times n$$ matrix such that

$$
X_{i,j} = c*A_{i,j}
$$

for $$i=1,2,...,m$$ and $$j=1,2,...,p$$

### Matrix Inverse $$A^{-1}$$

For an $$n \times n$$ square matrix $$A$$, the inverse of matrix $$A^{-1}$$ is defined as an $$n \times n$$ matrix such that

$$
AA^{-1} = I
$$

where I is an $$n \times n$$ identity matrix.

### Matrix division $$A/B$$

There is no mathematical definition of matrix division. But for numeric computing, people usually define right-matrix division in this way: for an $$n \times n$$ square matrix $$A$$ and another $$n \times n$$ square matrix $$B$$, if matrix $$B$$ is invertible, matrix division $$X = A/B$$ is usually calculated as:

$$
X=AB^{-1}
$$

Here is an example code for all operations above:
<iframe src="https://hedgehog-lab.github.io/?your_url=https%3A%2F%2Fraw.githubusercontent.com%2Flidangzzz%2FHedgehog-Lab-Tutorial-Codebase%2Fmain%2FBasic-Matrix-Operations.hss&auto_run=true" allowfullscreen width="1000" height="300"></iframe>

## Cholesky Decomposition

Cholesky is a widely used matrix decomposition algorithm for positive-definite and symmetric matrix. 

For a real matrix $$A$$, a Cholesky Decomposition is in this form:

$$
A=LL^{T}
$$

Here is an example:

<iframe src="https://hedgehog-lab.github.io/?your_url=https://raw.githubusercontent.com/lidangzzz/Hedgehog-Lab-Tutorial-Codebase/main/Cholesky.hss&auto_run=true" allowfullscreen width="1000" height="400"></iframe>

<iframe src="https://hedgehog-lab.github.io/?code=print('hello%20world')%3B&auto_run=true" allowfullscreen width="1000" height="200"></iframe>


## Eigenvalue and eigenvector

## LU Decomposition

## QR Decomposition

