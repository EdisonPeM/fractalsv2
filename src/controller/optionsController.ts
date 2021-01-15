import { onChange } from './listeners';
import { restartZoomLevels } from './zoomController';
import { FRACTALS, METHODS } from '@Constants';

import { getCurrentFractal, runDraw } from '@Controller';
import { changeColors, changeMethod } from '@Model';
import { LIMITS } from '@Model/Managers/zoomManager';

import { updateParam_a, updateParam_b } from '@View/Elements/inputs';
import { onChangeColors } from '@View/Elements/modal';
import { selectMethod } from '@View/Elements/options';

export function addOptionListeners() {
  // Change Colors
  onChangeColors((newColors: string[]) => {
    changeColors(newColors);
    runDraw();
  });

  // Change Method
  onChange(selectMethod, () => {
    changeMethod(selectMethod.value as METHODS);

    updateParam_a(LIMITS[FRACTALS.MANDELBROT].x);
    updateParam_b(LIMITS[FRACTALS.MANDELBROT].y);

    restartZoomLevels();
    runDraw();
  });
}
