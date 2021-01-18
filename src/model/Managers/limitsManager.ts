import { DEFAULT_LIMITS, INITIAL_LIMITS, INITIAL_METHOD } from '@InitialValues';
import { FRACTALS, METHODS } from '@Constants';

import { clone } from '@Model/Lib/utils';
import { getCurrentFractal, setFractalLimits } from './fractalManager';

// ------------------------------------------------------------------ //
//                                                                    //
// ------------------------------------------------------------------ //
const defaultLimits = clone(DEFAULT_LIMITS);
const currentLimits = clone(INITIAL_LIMITS);
export function setLimit(fractal: FRACTALS, limits: limit) {
  currentLimits[fractal] = limits;
  setFractalLimits(currentLimits);
}

export function restartLimit(fractal: FRACTALS) {
  setLimit(fractal, defaultLimits[fractal]);
}
// ------------------------------------------------------------------ //
//                                                                    //
// ------------------------------------------------------------------ //
export function configNewLimits(center: coord, scale: number = 1): complex {
  const fractal = getCurrentFractal();
  const limits = currentLimits[fractal];

  const [minX, maxX] = limits.x;
  const [minY, maxY] = limits.y;

  const Dx = maxX - minX;
  const Dy = maxY - minY;

  const xn = minX + center.x * Dx;
  const yn = minY + center.y * Dy;

  const tx = (Dx * scale) / 2;
  const ty = (Dy * scale) / 2;

  setLimit(fractal, {
    x: [xn - tx, xn + tx],
    y: [yn - ty, yn + ty],
  });

  return {
    real: xn,
    img: yn,
  };
}

// ------------------------------------------------------------------ //
//                                                                    //
// ------------------------------------------------------------------ //
export function configDefaultLimits(method: METHODS) {
  if (method === METHODS.SQUARE) {
    defaultLimits[FRACTALS.MANDELBROT] = DEFAULT_LIMITS[FRACTALS.MANDELBROT];
  } else {
    defaultLimits[FRACTALS.MANDELBROT] = {
      x: [-1.75, 1.75],
      y: [-1.75, 1.75],
    };
  }
}
configDefaultLimits(INITIAL_METHOD);
