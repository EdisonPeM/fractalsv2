import { onChange, onClick, onInput } from './listeners';

import { blockView, unBlockView } from '@View';
import { juliaBtn, mandelbrotBtn } from '@View/Elements/runButtons';
import { parm_a, parm_b } from '@View/Elements/inputs';

import { draw, drawAxis, eraseAxis, onDone } from '@Model';
import { FRACTALS } from '@Constants';
import { hideAxis } from '@View/Elements/options';

let currentFractal = FRACTALS.MANDELBROT;
let renderInProcess = false;
let showAxis = true;

export function addListeners() {
  // Listeners on click buttons
  onClick(mandelbrotBtn, () => {
    currentFractal = FRACTALS.MANDELBROT;
    runDraw();
  });

  onClick(juliaBtn, () => {
    currentFractal = FRACTALS.JULIA;
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

function drawOnChange() {
  // Only when julia is current
  if (currentFractal === FRACTALS.JULIA) {
    runDraw();
  }
}

function changeAxis() {
  // Only when mandelbrot is current
  if (showAxis && currentFractal === FRACTALS.MANDELBROT) {
    const c: complex = {
      real: parm_a.valueAsNumber,
      img: parm_b.valueAsNumber,
    };
    drawAxis(currentFractal, c);
  }
}
