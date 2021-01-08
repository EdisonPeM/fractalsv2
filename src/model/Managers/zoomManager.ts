import { FRACTALS, INPUTS_LIMITS } from '@Constants';

// Change Limits to do zoom in-out
export const LIMITS: { [key in FRACTALS]: limit } = {
  [FRACTALS.MANDELBROT]: INPUTS_LIMITS,
  [FRACTALS.JULIA]: {
    x: [-1.5, 1.5],
    y: [-1.5, 1.5],
  },
};
