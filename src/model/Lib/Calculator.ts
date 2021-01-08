import { absComplex } from './Formulas';

const R = 10;
const M = R ** 2;

// Typing
type params = {
  N: number; // Cant max of colors
  fn: Function;
  cn: complex; // Constant
  z0: complex; // Iterable complex
};

// Main function to iterate the fn method
export function calculate({ fn, N, cn, z0 }: params) {
  // complex to iterate
  let zn = z0;
  let r = absComplex(zn);
  let n = 0;

  // Iterations
  while (r < M && n < N) {
    zn = fn(zn, cn);
    r = absComplex(zn);
    n++;
  }

  // Fixed Colors overflow
  return n < N ? n : 0;
}
