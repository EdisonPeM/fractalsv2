import { FRACTALS, METHODS } from '@Constants';
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
  zoomLevel: 1,
  colors: [] as colorPos[],
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
export function setZoomLevel(zoomLevel: number) {
  removeFromCache('fractal');
  fractalOptions.zoomLevel = zoomLevel;
}

export function getZoomLevel(): number {
  return fractalOptions.zoomLevel;
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
