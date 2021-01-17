import { FRACTALS } from '@Constants';
import { addZoomListeners, getZoomLevels } from './zoomController';
import { addInputsListeners, changeAxis } from './fractalController';
import { addOptionListeners } from './optionsController';

import { blockView, unBlockView } from '@View';
import { parm_a, parm_b } from '@View/Elements/inputs';
import { showZoomLevel } from '@View/Elements/zoomControls';

import { draw, onDone } from '@Model';

// Handler of Fractal mode
const storagedFractal = localStorage.getItem('currentFractal') as FRACTALS;
let currentFractal = storagedFractal || FRACTALS.MANDELBROT;
export function setCurrentFractal(fractal: FRACTALS) {
  localStorage.setItem('currentFractal', fractal);
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

  // Options Listener
  addOptionListeners();

  // Listener on done
  onDone(() => {
    changeAxis();

    renderInProcess = false;
    // console.timeEnd('Painted in');
    setTimeout(unBlockView); // enqueue (2)
  });
}

export function runDraw() {
  const zoomLevels = getZoomLevels();
  showZoomLevel(zoomLevels[currentFractal]);

  const c: complex = {
    real: parm_a.valueAsNumber,
    img: parm_b.valueAsNumber,
  };

  if (!renderInProcess) {
    renderInProcess = true;
    // console.time('Painted in');
    setTimeout(() => {
      if (!renderInProcess) blockView();
    }); // enqueue (1)

    draw(currentFractal, c);
  }
}
