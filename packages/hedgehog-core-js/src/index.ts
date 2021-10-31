export const fib = (i: number): number => {
  return i === 0 || i === 1 ? i : fib(i - 1) + fib(i - 2);
};
