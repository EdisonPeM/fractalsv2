import { ACTIONS, METHODS, FRACTALS } from '@Constants';
import { FORMULAS } from './Lib/Formulas';
import { calculate } from './Lib/Calculator';

const ctx: Worker = self as any;

const params = {
  threads: 1,
  colors: [],
  width: 1024,
  height: 1024,
  method: METHODS.SQUARE,
};

ctx.onmessage = ({ data: { action, payload } }: any) => {
  switch (action) {
    case ACTIONS.INIT: {
      const { threads, colors, method, width, height } = payload;

      params.threads = threads;
      params.colors = colors;
      params.method = method;
      params.width = width;
      params.height = height;
      break;
    }

    case ACTIONS.CALCULATE: {
      runAlgorith(payload);
      break;
    }

    case ACTIONS.CHANGE_METHOD: {
      const { method } = payload;
      params.method = method;
      break;
    }

    // Update when colors changed
    case ACTIONS.CHANGE_COLORS: {
      const { colors } = payload;
      params.colors = colors;
      break;
    }

    default:
      break;
  }
};

// Origin
const originComplex: complex = {
  real: 0,
  img: 0,
};

function runAlgorith(payload: any) {
  const { id, fractal, limits, complexNum } = payload;
  const { width, height, threads, method, colors } = params;

  // Configs vars to calculate
  const fn = FORMULAS[method];
  const N = colors.length;

  // Calculate parts
  const dh = height / threads;
  const minH = id * dh;
  const maxH = (id + 1) * dh;

  const dw = width / threads;
  const minW = 0; //id * dw;
  const maxW = width; //(id + 1) * dw;

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
}

export default null as any;
