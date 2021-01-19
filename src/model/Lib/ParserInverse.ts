import { FRACTALS } from '@Constants';

const stringToColors = (color: string) =>
  color.split(' ').map(colorPos => {
    const [color, pos] = colorPos.split('_');
    return {
      colorHex: `#${color}`,
      position: +pos,
    };
  });

const stringToLimits = (str: string): number[] => str.split('_').map(v => +v);

export const inverseHandler = {
  get(target: any, prop: any) {
    if (prop === 'fractal') {
      return target.get('f');
    }

    if (prop === 'complex') {
      if (!target.has('pr') || !target.has('pi')) return null;
      return {
        real: +target.get('pr'),
        img: +target.get('pi'),
      };
    }

    if (prop === 'showAxis') {
      return Boolean(target.get('a'));
    }

    if (prop === 'method') {
      return target.get('m');
    }

    if (prop === 'zoomLevels') {
      if (!target.has('zM') || !target.has('zJ')) return null;
      return {
        [FRACTALS.MANDELBROT]: +target.get('zM'),
        [FRACTALS.JULIA]: +target.get('zJ'),
      };
    }

    if (prop === 'limits') {
      const limitsParams = ['lmx', 'lmy', 'ljx', 'ljy'];
      if (limitsParams.map(k => target.has(k)).includes(false)) return null;

      return {
        [FRACTALS.MANDELBROT]: {
          x: stringToLimits(target.get('lmx')),
          y: stringToLimits(target.get('lmy')),
        },
        [FRACTALS.JULIA]: {
          x: stringToLimits(target.get('ljx')),
          y: stringToLimits(target.get('ljy')),
        },
      };
    }

    if (prop === 'colors') {
      if (!target.has('c')) return null;
      return stringToColors(target.get('c'));
    }

    return null;
  },
};
