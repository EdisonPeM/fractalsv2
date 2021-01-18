import { INITIAL_LIMITS } from '@InitialValues';
import { FRACTALS, METHODS } from '@Constants';

import { clone } from '@Model/Lib/utils';
import { getCurrentFractal, setFractalLimits } from './fractalManager';

// ------------------------------------------------------------------ //
//                                                                    //
// ------------------------------------------------------------------ //
const defaultLimits = clone(INITIAL_LIMITS);
const currentLimits = clone(defaultLimits);
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
    defaultLimits[FRACTALS.MANDELBROT] = INITIAL_LIMITS[FRACTALS.MANDELBROT];
  } else {
    defaultLimits[FRACTALS.MANDELBROT] = {
      x: [-1.75, 1.75],
      y: [-1.75, 1.75],
    };
  }

  Object.values(FRACTALS).forEach(fractal => {
    currentLimits[fractal] = defaultLimits[fractal];
  });

  setFractalLimits(currentLimits);
}
