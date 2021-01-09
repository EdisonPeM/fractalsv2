import { FRACTALS } from '@Constants';
import { onChange, onClick, onInput } from './listeners';
import { getCurrentFractal, runDraw, setCurrentFractal } from '@Controller';

import { parm_a, parm_b } from '@View/Elements/inputs';
import { hideAxis } from '@View/Elements/options';
import { juliaBtn, mandelbrotBtn } from '@View/Elements/runButtons';

import { drawAxis, eraseAxis } from '@Model';

let showAxis = true;
export function addInputsListeners() {
  onClick(mandelbrotBtn, () => {
    setCurrentFractal(FRACTALS.MANDELBROT);
    runDraw();
  });

  onClick(juliaBtn, () => {
    setCurrentFractal(FRACTALS.JULIA);
    runDraw();
  });

  // Listeners on change inputs
  onChange(parm_a, drawOnChange);
  onChange(parm_b, drawOnChange);

  // Listeners on Input
  onInput(parm_a, changeAxis);
  onInput(parm_b, changeAxis);

  // Event on hide / show axis
  onChange(hideAxis, () => {
    showAxis = hideAxis.checked;
    if (!showAxis) eraseAxis();
    runDraw();
  });
}

function drawOnChange() {
  // Only when julia is current
  const currentFractal = getCurrentFractal();
  if (currentFractal === FRACTALS.JULIA) {
    runDraw();
  }
}

export function changeAxis() {
  // Only when mandelbrot is current
  const currentFractal = getCurrentFractal();
  if (showAxis && currentFractal === FRACTALS.MANDELBROT) {
    const c: complex = {
      real: parm_a.valueAsNumber,
      img: parm_b.valueAsNumber,
    };
    drawAxis(currentFractal, c);
  }
}
