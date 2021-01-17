import { METHODS, FRACTALS } from '@Constants';
import { FORMULAS } from './Lib/Formulas';
import { calculate } from './Lib/Calculator';

const ctx: Worker = self as any;

type payload = {
  id: number;
  width: number;
  height: number;
  threads: number;
  method: METHODS;
  colors: colorRGB[];
  fractal: FRACTALS;
  limits: limit;
  complexNum: complex;
};

// Origin
const originComplex: complex = {
  real: 0,
  img: 0,
};

ctx.onmessage = ({ data }: { data: payload }) => {
  const {
    id,
    width,
    height,
    threads,
    method,
    colors,
    fractal,
    limits,
    complexNum,
  } = data;

  // Configs vars to calculate
  const fn = FORMULAS[method];
  const N = colors.length;

  // Calculate parts
  const dh = height / threads;
  const minH = id * dh;
  const maxH = (id + 1) * dh;

  const minW = 0;
  const maxW = width;

  // Create the image Data
  const imgData = new ImageData(maxW - minW, maxH - minH);
  let imgIndx = 0;

  // Set Colors
  let colorRgb: colorRGB = colors[0];
  let colorIndx = 0;

  // Algorithm
  const [minX, maxX] = limits.x;
  const [minY, maxY] = limits.y;
  const Dx = maxX - minX;
  const Dy = maxY - minY;

  // Iterable complex number by fractal
  let iterableComplex: complex;
  let cn: complex = complexNum;
  let z0: complex = originComplex;

  for (let j = minH; j < maxH; j++) {
    for (let i = minW; i < maxW; i++) {
      iterableComplex = {
        real: minX + (i * Dx) / width,
        img: maxY - (j * Dy) / height,
      };

      if (fractal === FRACTALS.MANDELBROT) {
        cn = iterableComplex;
      } else {
        z0 = iterableComplex;
      }

      colorIndx = calculate({ fn, N, cn, z0 });
      colorRgb = colors[colorIndx];
      imgData.data[imgIndx++] = colorRgb.red;
      imgData.data[imgIndx++] = colorRgb.green;
      imgData.data[imgIndx++] = colorRgb.blue;
      imgData.data[imgIndx++] = 255; // Alpha
    }
  }

  ctx.postMessage({
    imgData,
    min: minH,
    max: maxH,
  });
};

export default null as any;
