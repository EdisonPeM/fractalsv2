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

const fractalOptionsParams = {
  f: `${INITIAL_FRACTAL}`,
  pr: `${+INITIAL_VALUES.real.toFixed(10)}`,
  pi: `${+INITIAL_VALUES.img.toFixed(10)}`,
  a: `${+INITIAL_SHOW_AXIS}`,
  m: `${INITIAL_METHOD}`,
  zM: `${INITIAL_ZOOM.M}`,
  zJ: `${INITIAL_ZOOM.J}`,
  lmxm: `${+INITIAL_LIMITS.M.x[0].toFixed(10)}`,
  lmxM: `${+INITIAL_LIMITS.M.x[1].toFixed(10)}`,
  lmym: `${+INITIAL_LIMITS.M.y[0].toFixed(10)}`,
  lmyM: `${+INITIAL_LIMITS.M.y[1].toFixed(10)}`,
  ljxm: `${+INITIAL_LIMITS.J.x[0].toFixed(10)}`,
  ljxM: `${+INITIAL_LIMITS.J.x[1].toFixed(10)}`,
  ljym: `${+INITIAL_LIMITS.J.y[0].toFixed(10)}`,
  ljyM: `${+INITIAL_LIMITS.J.y[1].toFixed(10)}`,
  c: colorsToString(JSON.stringify(INITIAL_COLORS)),
};

export const handler = {
  set(target: any, prop: any, value: any) {
    target[prop] = value;

    if (prop === 'fractal') {
      localStorage.setItem('fractal', JSON.stringify(value));
      fractalOptionsParams['f'] = `(${value})`;
    }

    if (prop === 'complex') {
      localStorage.setItem('params', JSON.stringify(value));
      fractalOptionsParams['pr'] = `${+value.real.toFixed(10)}`;
      fractalOptionsParams['pi'] = `${+value.img.toFixed(10)}`;
    }

    if (prop === 'showAxis') {
      localStorage.setItem('showAxis', JSON.stringify(value));
      fractalOptionsParams['a'] = `${+value}`;
    }

    if (prop === 'method') {
      localStorage.setItem('method', JSON.stringify(value));
      fractalOptionsParams['m'] = `${value}`;
    }

    if (prop === 'colors') {
      localStorage.setItem('colors', JSON.stringify(value));
      fractalOptionsParams['c'] = colorsToString(JSON.stringify(value));
    }

    if (prop === 'zoomLevels') {
      localStorage.setItem('zoomLevels', JSON.stringify(value));
      fractalOptionsParams['zM'] = `${value.M}`;
      fractalOptionsParams['zJ'] = `${value.J}`;
    }

    if (prop === 'limits') {
      localStorage.setItem('limits', JSON.stringify(value));
      const [lmxm, lmxM] = value.M.x;
      const [lmym, lmyM] = value.M.y;
      fractalOptionsParams['lmxm'] = `${+lmxm.toFixed(10)}`;
      fractalOptionsParams['lmxM'] = `${+lmxM.toFixed(10)}`;
      fractalOptionsParams['lmym'] = `${+lmym.toFixed(10)}`;
      fractalOptionsParams['lmyM'] = `${+lmyM.toFixed(10)}`;

      const [ljxm, ljxM] = value.J.x;
      const [ljym, ljyM] = value.J.y;
      fractalOptionsParams['ljxm'] = `${+ljxm.toFixed(10)}`;
      fractalOptionsParams['ljxM'] = `${+ljxM.toFixed(10)}`;
      fractalOptionsParams['ljym'] = `${+ljym.toFixed(10)}`;
      fractalOptionsParams['ljyM'] = `${+ljyM.toFixed(10)}`;
    }

    // navigate(fractalOptionsParams);
    return true;
  },
};

function navigate(params: Record<string, any>) {
  const searchParams = new URLSearchParams(params);
  history.replaceState(null, '', `/?${searchParams.toString()}`);
}
