import { FRACTALS } from '@Constants';

const stringToColors = (color: string) =>
  color.split(' ').map(colorPos => {
    const [color, pos] = colorPos.split('_');
    return {
      colorHex: `#${color}`,
      position: +pos,
    };
  });

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
      if (
        !target.has('lmxm') ||
        !target.has('lmxM') ||
        !target.has('lmym') ||
        !target.has('lmyM') ||
        !target.has('ljxm') ||
        !target.has('ljxM') ||
        !target.has('ljym') ||
        !target.has('ljyM')
      )
        return null;

      return {
        [FRACTALS.MANDELBROT]: {
          x: [+target.get('lmxm'), +target.get('lmxM')],
          y: [+target.get('lmym'), +target.get('lmyM')],
        },
        [FRACTALS.JULIA]: {
          x: [+target.get('ljxm'), +target.get('ljxM')],
          y: [+target.get('ljym'), +target.get('ljyM')],
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
