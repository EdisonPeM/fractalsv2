import { FRACTALS } from '@Constants';

import { onInput } from '@Controller/listeners';
import { runDraw } from '@Controller';
import { changeAxis } from './axisController';

import { paramReal, paramImg } from '@View/Elements/inputs';
import {
  getCurrentFractal,
  setComplexNum,
} from '@Model/Managers/fractalManager';

export function addInputsListeners() {
  // EXPERIMENTAL
  onInput(paramReal, drawOnChange);
  onInput(paramImg, drawOnChange);

  // Listeners on Input
  onInput(paramReal, changeAxis);
  onInput(paramImg, changeAxis);
}

function drawOnChange() {
  setComplexNum({
    real: paramReal.valueAsNumber,
    img: paramImg.valueAsNumber,
  });

  // Only when julia is current
  const currentFractal = getCurrentFractal();
  if (currentFractal === FRACTALS.JULIA) {
    runDraw();
  }
}
