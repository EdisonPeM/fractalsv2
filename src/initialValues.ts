import { FRACTALS } from '@Constants';

export const INITIAL_LIMITS: { [key in FRACTALS]: limit } = {
  [FRACTALS.MANDELBROT]: {
    x: [-2.5, 1],
    y: [-1.75, 1.75],
  },
  [FRACTALS.JULIA]: {
    x: [-1.5, 1.5],
    y: [-1.5, 1.5],
  },
};

export const INITIAL_ZOOM: { [key in FRACTALS]: number } = {
  [FRACTALS.MANDELBROT]: 1,
  [FRACTALS.JULIA]: 1,
};
