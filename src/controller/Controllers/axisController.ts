import { FRACTALS } from '@Constants';

import { runDraw } from '@Controller';
import { onChange } from '@Controller/listeners';

import { hideAxis } from '@View/Elements/options';
import { drawAxis, eraseAxis } from '@Model/Managers/drawManager';
import {
  getCurrentFractal,
  getShowAxis,
  setShowAxis,
} from '@Model/Managers/fractalManager';

export function addAxisListener() {
  // Event on hide / show axis
  onChange(hideAxis, () => {
    setShowAxis(hideAxis.checked);
    if (!hideAxis.checked) eraseAxis();
    runDraw();
  });
}

export function changeAxis() {
  // Only when mandelbrot is current
  const showAxis = getShowAxis();
  const currentFractal = getCurrentFractal();
  if (showAxis && currentFractal === FRACTALS.MANDELBROT) {
    drawAxis();
  }
}
