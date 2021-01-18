import { addFractalsListeners } from './Controllers/fractalController';
import { addInputsListeners } from './Controllers/inputsController';
import { addMethodListener } from './Controllers/methodController';
import { addAxisListener, changeAxis } from './Controllers/axisController';
import { addColorsListener } from './Controllers/colorsController';
import {
  addZoomListeners,
  updateZoomLevel,
} from './Controllers/zoomController';

import { blockView, unBlockView } from '@View';
import { run } from '@Model';

export function addListeners() {
  // Listeners on Buttons
  addFractalsListeners();

  // Listeners on Inputs
  addInputsListeners();

  // Listener on Hide / Show Axis
  addAxisListener();

  // Listener on Change Method
  addMethodListener();

  // Listener on Change colors
  addColorsListener();

  // Listener on Zoom
  addZoomListeners();
}

let renderInProcess = false;
export function runDraw() {
  if (!renderInProcess) {
    renderInProcess = true;
    // console.time('Painted in');
    setTimeout(() => {
      if (!renderInProcess) blockView();
    }); // enqueue (1)

    // Show Zoom Level
    updateZoomLevel();

    // Run Logic
    run();
  }
}

export function done() {
  changeAxis();

  renderInProcess = false;
  // console.timeEnd('Painted in');
  setTimeout(unBlockView); // enqueue (2)
}
