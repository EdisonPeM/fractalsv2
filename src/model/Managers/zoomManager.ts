import { FRACTALS, GENERAL_LIMITS, INITIAL_LIMITS, METHODS } from '@Constants';
import { myCanva } from '@View/Elements/canvas';
import { clone } from '../Lib/utils';

const JULIA_DEFAULT: limit = {
  x: [-1.5, 1.5],
  y: [-1.5, 1.5],
};

const defaultLimits: { [key in FRACTALS]: limit } = {
  [FRACTALS.MANDELBROT]: INITIAL_LIMITS,
  [FRACTALS.JULIA]: JULIA_DEFAULT,
};

// Change Limits to do zoom in-out
export const LIMITS = clone(defaultLimits);
export function configLimits(method: METHODS) {
  if (method === METHODS.SQUARE) {
    LIMITS[FRACTALS.MANDELBROT] = INITIAL_LIMITS;
    defaultLimits[FRACTALS.MANDELBROT] = INITIAL_LIMITS;
  } else {
    LIMITS[FRACTALS.MANDELBROT] = GENERAL_LIMITS;
    defaultLimits[FRACTALS.MANDELBROT] = GENERAL_LIMITS;
  }

  return LIMITS;
}

export function zoom(
  fractal: FRACTALS,
  center: coord,
  scale: number = 1
): { newLimit: limit; newValue: complex | null } {
  if (scale === 0) {
    LIMITS[fractal] = defaultLimits[fractal];
    return {
      newLimit: LIMITS[fractal],
      newValue: null,
    };
  }

  const [minX, maxX] = LIMITS[fractal].x;
  const [minY, maxY] = LIMITS[fractal].y;

  const Dx = maxX - minX;
  const Dy = maxY - minY;

  const xn = minX + (center.x * Dx) / myCanva.width;
  const yn = minY + (center.y * Dy) / myCanva.height;

  const tx = (Dx * scale) / 2;
  const ty = (Dy * scale) / 2;

  LIMITS[fractal] = {
    x: [xn - tx, xn + tx],
    y: [yn - ty, yn + ty],
  };

  return {
    newLimit: LIMITS[fractal],
    newValue: {
      real: xn,
      img: yn,
    },
  };
}
