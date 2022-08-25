# Hedgehog Library

This is a library of essential core functions for Hedgehog Lab, including:

- [math](./math/README.md), the core math library
- [plot](./plot/README.md), the core plotting and data visualization library
- [ml](./ml/README.md), the machine learning library
- [std](./std/README.md), the standard library for some core functions and utilities
- [datasets](./datasets/README.md), the datasets library
- [network](./network/README.md), the network library

Each of these libraries is documented in its own README.MD file.

## How to use this library?

**No installation is needed.** Just check the documentation for each library and use it directly in Hedgehog Lab at [https://hlab.app](https://hlab.app/).

For example, you can import and use the **LU Decomposition** function `lu(X)` from `math` library in this way:

```
// 1. Import it
*import math:lu

// 2. Use it
let L = lu([[2,3],[4,2]]).L;
```
## How do I contribute to this library?

Just fork this repository and make a pull request with your functions added.