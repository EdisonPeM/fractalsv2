import { FRACTALS } from '@Constants';
import {
  INITIAL_COLORS,
  INITIAL_FRACTAL,
  INITIAL_LIMITS,
  INITIAL_METHOD,
  INITIAL_SHOW_AXIS,
  INITIAL_VALUES,
  INITIAL_ZOOM,
} from '@InitialValues';

const colorsToString = (color: string) =>
  color
    .replace(/(\[{|}\]|\"|:|#)/g, '')
    .replace(/(colorHex|position)/g, '')
    .replace(/},{/g, ' ')
    .replace(/,/g, '_');

const limitToString = (nums: [number, number]): string =>
  nums.map((v: number) => +v.toFixed(10)).join('_');

export const fractalOptionsParams = {
  f: `${INITIAL_FRACTAL}`,
  pr: `${+INITIAL_VALUES.real.toFixed(10)}`,
  pi: `${+INITIAL_VALUES.img.toFixed(10)}`,
  a: `${+INITIAL_SHOW_AXIS}`,
  m: `${INITIAL_METHOD}`,
  zM: `${INITIAL_ZOOM[FRACTALS.MANDELBROT]}`,
  zJ: `${INITIAL_ZOOM[FRACTALS.JULIA]}`,
  lmx: limitToString(INITIAL_LIMITS[FRACTALS.MANDELBROT].x),
  lmy: limitToString(INITIAL_LIMITS[FRACTALS.MANDELBROT].y),
  ljx: limitToString(INITIAL_LIMITS[FRACTALS.JULIA].x),
  ljy: limitToString(INITIAL_LIMITS[FRACTALS.JULIA].y),
  c: colorsToString(JSON.stringify(INITIAL_COLORS)),
};

export const handler = {
  set(target: any, prop: any, value: any) {
    target[prop] = value;
    localStorage.setItem(prop, JSON.stringify(value));

    if (prop === 'fractal') {
      fractalOptionsParams['f'] = `${value}`;
    }

    if (prop === 'complex') {
      fractalOptionsParams['pr'] = `${+value.real.toFixed(10)}`;
      fractalOptionsParams['pi'] = `${+value.img.toFixed(10)}`;
    }

    if (prop === 'showAxis') {
      fractalOptionsParams['a'] = `${+value}`;
    }

    if (prop === 'method') {
      fractalOptionsParams['m'] = `${value}`;
    }

    if (prop === 'colors') {
      fractalOptionsParams['c'] = colorsToString(JSON.stringify(value));
    }

    if (prop === 'zoomLevels') {
      fractalOptionsParams['zM'] = `${value.M}`;
      fractalOptionsParams['zJ'] = `${value.J}`;
    }

    if (prop === 'limits') {
      fractalOptionsParams['lmx'] = limitToString(value[FRACTALS.MANDELBROT].x);
      fractalOptionsParams['lmy'] = limitToString(value[FRACTALS.MANDELBROT].y);
      fractalOptionsParams['ljx'] = limitToString(value[FRACTALS.JULIA].x);
      fractalOptionsParams['ljy'] = limitToString(value[FRACTALS.JULIA].y);
    }

    navigate(fractalOptionsParams);
    return true;
  },
};

function navigate(params: Record<string, any>) {
  const searchParams = new URLSearchParams(params);
  history.replaceState(null, '', `/?${searchParams.toString()}`);
}
