import { FRACTALS, METHODS } from '@Constants';
import { INITIAL_LIMITS, INITIAL_ZOOM } from '@InitialValues';
import { removeFromCache } from '@Model/cache';
import { colorPos } from 'gradient-generator-ui';

// Origin
const originComplex: complex = {
  real: 0,
  img: 0,
};

const fractalOptions = {
  fractal: FRACTALS.MANDELBROT,
  complexNum: originComplex,
  showAxis: true,
  method: METHODS.SQUARE,
  zoomLevels: INITIAL_ZOOM,
  colors: [] as colorPos[],
  limits: INITIAL_LIMITS,
};

// ------------------------------------------------------------------ //
//                        Current Fractal                             //
// ------------------------------------------------------------------ //
export function setCurrentFractal(fractal: FRACTALS) {
  fractalOptions.fractal = fractal;
}

export function getCurrentFractal(): FRACTALS {
  return fractalOptions.fractal;
}

// ------------------------------------------------------------------ //
//                         Inputs Values                              //
// ------------------------------------------------------------------ //
export function setComplexNum(c: complex) {
  fractalOptions.complexNum = c;
}

export function getComplexNum(): complex {
  return fractalOptions.complexNum;
}

// ------------------------------------------------------------------ //
//                            show Axis                               //
// ------------------------------------------------------------------ //
export function setShowAxis(showAxis: boolean) {
  fractalOptions.showAxis = showAxis;
}

export function getShowAxis(): boolean {
  return fractalOptions.showAxis;
}

// ------------------------------------------------------------------ //
//                         Current Method                             //
// ------------------------------------------------------------------ //
export function setMethod(method: METHODS) {
  removeFromCache('fractal');
  fractalOptions.method = method;
}

export function getMethod(): METHODS {
  return fractalOptions.method;
}

// ------------------------------------------------------------------ //
//                           Zoom Level                               //
// ------------------------------------------------------------------ //
export function setZoomLevel(zoomLevels: { [key in FRACTALS]: number }) {
  removeFromCache('fractal');
  fractalOptions.zoomLevels = zoomLevels;
}

export function getZoomLevel(): number {
  return fractalOptions.zoomLevels[fractalOptions.fractal];
}

// ------------------------------------------------------------------ //
//                           Zoom Limits                              //
// ------------------------------------------------------------------ //
export function setFractalLimits(limits: { [key in FRACTALS]: limit }) {
  removeFromCache('fractal');
  fractalOptions.limits = limits;
}

export function getFractalLimits(): limit {
  return fractalOptions.limits[fractalOptions.fractal];
}

// ------------------------------------------------------------------ //
//                      Colors Base Object                            //
// ------------------------------------------------------------------ //
export function setColorsBase(colors: colorPos[]) {
  removeFromCache('fractal');
  fractalOptions.colors = colors;
}

export function getColorsBase(): colorPos[] {
  return fractalOptions.colors;
}
