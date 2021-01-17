import { FRACTALS, GENERAL_LIMITS, INITIAL_LIMITS, METHODS } from '@Constants';
import { myCanva } from '@View/Elements/canvas';
import { clone } from '@Model/Lib/utils';

const JULIA_DEFAULT: limit = {
  x: [-1.5, 1.5],
  y: [-1.5, 1.5],
};

const defaultLimits: { [key in FRACTALS]: limit } = {
  [FRACTALS.MANDELBROT]: INITIAL_LIMITS,
  [FRACTALS.JULIA]: JULIA_DEFAULT,
};

const getHandler = (key: string) => ({
  get(target: any, fractal: FRACTALS) {
    const storagedProp = localStorage.getItem(key + fractal);
    if (storagedProp) {
      return JSON.parse(storagedProp);
    }
    return target[fractal];
  },
  set(target: any, fractal: FRACTALS, value: limit) {
    localStorage.setItem(key + fractal, JSON.stringify(value));
    target[fractal] = value;
    return true;
  },
});

const defaultLimitsProxy = new Proxy(
  defaultLimits,
  getHandler('DefaultLimit-')
);
export const LIMITS = new Proxy(clone(defaultLimits), getHandler('Limit-'));

export function configLimits(method: METHODS) {
  if (method === METHODS.SQUARE) {
    defaultLimitsProxy[FRACTALS.MANDELBROT] = INITIAL_LIMITS;
  } else {
    defaultLimitsProxy[FRACTALS.MANDELBROT] = GENERAL_LIMITS;
  }

  Object.values(FRACTALS).forEach(fractal => {
    LIMITS[fractal] = defaultLimitsProxy[fractal];
  });
}

export function zoom(
  fractal: FRACTALS,
  center: coord,
  scale: number = 1
): { newLimit: limit; newValue: complex | null } {
  if (scale === 0) {
    LIMITS[fractal] = defaultLimitsProxy[fractal];
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
