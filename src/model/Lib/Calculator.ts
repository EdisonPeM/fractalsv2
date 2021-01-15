import { absComplex } from './Formulas';

const R = 5;
const M = R * R;

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
  let n = 0;
  let r = absComplex(zn);

  // Iterations
  while (r < M && n < N) {
    zn = fn(zn, cn);
    r = absComplex(zn);
    n++;
  }

  // Fixed Colors overflow
  return n < N ? n : 0;
}
