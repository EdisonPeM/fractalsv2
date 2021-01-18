import { FRACTALS, METHODS } from '@Constants';

// ------------------------------------------------------------------ //
//                         DEFAULT VALUES                             //
// ------------------------------------------------------------------ //
export const DEFAULT_LIMITS: { [key in FRACTALS]: limit } = {
  [FRACTALS.MANDELBROT]: {
    x: [-2.5, 1],
    y: [-1.75, 1.75],
  },
  [FRACTALS.JULIA]: {
    x: [-1.5, 1.5],
    y: [-1.5, 1.5],
  },
};

const DEFAULT_ZOOM: { [key in FRACTALS]: number } = {
  [FRACTALS.MANDELBROT]: 1,
  [FRACTALS.JULIA]: 1,
};

export const ORIGIN: complex = {
  real: 0,
  img: 0,
};

// ------------------------------------------------------------------ //
//                         INITIAL VALUES                             //
// ------------------------------------------------------------------ //
export const INITIAL_FRACTAL = JSON.parse(
  localStorage.getItem('fractal') || JSON.stringify(FRACTALS.MANDELBROT)
);

export const INITIAL_VALUES: complex = JSON.parse(
  localStorage.getItem('params') || JSON.stringify(ORIGIN)
);

export const INITIAL_METHOD = JSON.parse(
  localStorage.getItem('method') || JSON.stringify(METHODS.SQUARE)
);

export const INITIAL_SHOW_AXIS = JSON.parse(
  localStorage.getItem('showAxis') || 'true'
);

export const INITIAL_LIMITS: { [key in FRACTALS]: limit } = JSON.parse(
  localStorage.getItem('limits') || JSON.stringify(DEFAULT_LIMITS)
);

export const INITIAL_ZOOM: { [key in FRACTALS]: number } = JSON.parse(
  localStorage.getItem('zoomLevels') || JSON.stringify(DEFAULT_ZOOM)
);

export const INITIAL_COLORS = JSON.parse(
  localStorage.getItem('colors') || JSON.stringify([])
);
