import { FRACTALS, METHODS } from '@Constants';
import { inverseHandler } from '@Model/Lib/ParserInverse';
import { colorPos } from 'gradient-generator-ui';

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
//                         Parse from URL                             //
// ------------------------------------------------------------------ //
const searchParams = new URLSearchParams(location.search);
const urlParams = new Proxy(searchParams, inverseHandler);

const getInitialValue = (initialKey: string, fallbak: any) =>
  urlParams[initialKey] ||
  JSON.parse(localStorage.getItem(initialKey) || JSON.stringify(fallbak));

// ------------------------------------------------------------------ //
//                         INITIAL VALUES                             //
// ------------------------------------------------------------------ //
export const INITIAL_FRACTAL: FRACTALS = getInitialValue(
  'fractal',
  FRACTALS.MANDELBROT
);

export const INITIAL_VALUES: complex = getInitialValue('complex', ORIGIN);

export const INITIAL_METHOD: METHODS = getInitialValue(
  'method',
  METHODS.SQUARE
);

export const INITIAL_SHOW_AXIS: boolean = getInitialValue('showAxis', true);

export const INITIAL_LIMITS: { [key in FRACTALS]: limit } = getInitialValue(
  'limits',
  DEFAULT_LIMITS
);

export const INITIAL_ZOOM: { [key in FRACTALS]: number } = getInitialValue(
  'zoomLevels',
  DEFAULT_ZOOM
);

export const INITIAL_COLORS: colorPos[] = getInitialValue('colors', []);
