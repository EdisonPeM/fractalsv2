import { FRACTALS } from '@Constants';
import { addZoomListeners } from './zoomController';
import { addInputsListeners, changeAxis } from './fractalController';

import { blockView, unBlockView } from '@View';
import { parm_a, parm_b } from '@View/Elements/inputs';

import { draw, onDone } from '@Model';

// Handler of Fractal mode
let currentFractal = FRACTALS.MANDELBROT;
export function setCurrentFractal(fractal: FRACTALS) {
  currentFractal = fractal;
}
export function getCurrentFractal(): FRACTALS {
  return currentFractal;
}

let renderInProcess = false;
export function addListeners() {
  // Listeners on inputs
  addInputsListeners();

  // Zoom Events
  addZoomListeners();

  // Listener on done
  onDone(() => {
    changeAxis();

    renderInProcess = false;
    console.timeEnd('Painted in');
    setTimeout(unBlockView); // enqueue (2)
  });
}

export function runDraw() {
  const c: complex = {
    real: parm_a.valueAsNumber,
    img: parm_b.valueAsNumber,
  };

  if (!renderInProcess) {
    renderInProcess = true;
    console.time('Painted in');
    setTimeout(blockView); // enqueue (1)

    draw(currentFractal, c);
  }
}
