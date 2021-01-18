import { FRACTALS, METHODS } from '@Constants';
import {
  INITIAL_LIMITS,
  INITIAL_METHOD,
  INITIAL_SHOW_AXIS,
  INITIAL_VALUES,
  INITIAL_ZOOM,
  INITIAL_FRACTAL,
} from '@InitialValues';
import { removeFromCache } from '@Model/cache';
import { handler } from '@Model/Lib/ParserOptions';
import { colorPos } from 'gradient-generator-ui';

const fractalOptions = {
  fractal: INITIAL_FRACTAL,
  complex: INITIAL_VALUES,
  showAxis: INITIAL_SHOW_AXIS,
  method: INITIAL_METHOD,
  zoomLevels: INITIAL_ZOOM,
  limits: INITIAL_LIMITS,
  colors: [],
};

const optionsProxy = new Proxy(fractalOptions, handler);
// ------------------------------------------------------------------ //
//                        Current Fractal                             //
// ------------------------------------------------------------------ //
export function setCurrentFractal(fractal: FRACTALS) {
  optionsProxy.fractal = fractal;
}

export function getCurrentFractal(): FRACTALS {
  return optionsProxy.fractal;
}

// ------------------------------------------------------------------ //
//                         Inputs Values                              //
// ------------------------------------------------------------------ //
export function setComplexNum(c: complex) {
  optionsProxy.complex = c;
}

export function getComplexNum(): complex {
  return optionsProxy.complex;
}

// ------------------------------------------------------------------ //
//                            show Axis                               //
// ------------------------------------------------------------------ //
export function setShowAxis(showAxis: boolean) {
  optionsProxy.showAxis = showAxis;
}

export function getShowAxis(): boolean {
  return optionsProxy.showAxis;
}

// ------------------------------------------------------------------ //
//                         Current Method                             //
// ------------------------------------------------------------------ //
export function setMethod(method: METHODS) {
  removeFromCache('fractal');
  optionsProxy.method = method;
}

export function getMethod(): METHODS {
  return optionsProxy.method;
}

// ------------------------------------------------------------------ //
//                           Zoom Level                               //
// ------------------------------------------------------------------ //
export function setZoomLevel(zoomLevels: { [key in FRACTALS]: number }) {
  removeFromCache('fractal');
  optionsProxy.zoomLevels = zoomLevels;
}

export function getZoomLevel(): number {
  return optionsProxy.zoomLevels[optionsProxy.fractal];
}

// ------------------------------------------------------------------ //
//                           Zoom Limits                              //
// ------------------------------------------------------------------ //
export function setFractalLimits(limits: { [key in FRACTALS]: limit }) {
  removeFromCache('fractal');
  optionsProxy.limits = limits;
}

export function getFractalLimits(): limit {
  return optionsProxy.limits[optionsProxy.fractal];
}

// ------------------------------------------------------------------ //
//                      Colors Base Object                            //
// ------------------------------------------------------------------ //
export function setColorsBase(colors: colorPos[]) {
  removeFromCache('fractal');
  optionsProxy.colors = colors;
}

export function getColorsBase(): colorPos[] {
  return optionsProxy.colors;
}
