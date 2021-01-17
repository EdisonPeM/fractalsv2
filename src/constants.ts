// Type of fractals
export enum FRACTALS {
  MANDELBROT = 'MANDELBROT',
  JULIA = 'JULIA',
}

// methods Availables
export enum METHODS {
  SQUARE = 'z = z^2 + c',
  CUBIC = 'z = z^3 + c',
  FOUR = 'z = z^4 + c',
  TRICORN = 'z = conj(z)^2 + c',
  SHIP = 'Buring Ship',
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
export const INITIAL_LIMITS: limit = {
  x: [-2.5, 1],
  y: [-1.75, 1.75],
};
