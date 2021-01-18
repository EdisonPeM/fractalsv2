import { FRACTALS } from '@Constants';

import { runDraw } from '@Controller';
import { onClick } from '@Controller/listeners';

import { juliaBtn, mandelbrotBtn } from '@View/Elements/runButtons';
import { setCurrentFractal } from '@Model/Managers/fractalManager';
import { updateZoomLevel } from './zoomController';

export function addFractalsListeners() {
  onClick(mandelbrotBtn, () => {
    setCurrentFractal(FRACTALS.MANDELBROT);
    updateZoomLevel();
    runDraw();
  });

  onClick(juliaBtn, () => {
    setCurrentFractal(FRACTALS.JULIA);
    updateZoomLevel();
    runDraw();
  });
}
