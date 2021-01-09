// Type of fractals
export enum FRACTALS {
  MANDELBROT = 'MANDELBROT',
  JULIA = 'JULIA',
}

// methods Availables
export enum METHODS {
  SQUARE = 'SQUARE',
  CUBIC = 'CUBIC',
  FOUR = 'FOUR',
  TRICORN = 'TRICORN',
  SHIP = 'SHIP',
}

// Worker Actions
export enum ACTIONS {
  INIT = 'INIT',
  CALCULATE = 'CALCULATE',
  CHANGE_METHOD = 'CHANGE_METHOD',
  CHANGE_COLORS = 'CHANGE_COLORS',
}

// Zoom and position options
export enum ZOOM_OPS {
  NONE = 'NONE',
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
  MOVE_POSITION = 'MOVE_POSITION',
  HOME = 'HOME',
}

// Basic Inputs Limits
export const INPUTS_LIMITS: limit = {
  x: [-2.5, 1],
  y: [-1.75, 1.75],
};
