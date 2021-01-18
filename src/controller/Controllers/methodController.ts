import { FRACTALS, METHODS } from '@Constants';

import { runDraw } from '@Controller';
import { onChange } from '@Controller/listeners';
import { configInputs } from './zoomController';

import { selectMethod } from '@View/Elements/options';

import { getComplexNum, setMethod } from '@Model/Managers/fractalManager';
import {
  configDefaultLimits,
  restartLimit,
} from '@Model/Managers/limitsManager';
import { restartZoom } from '@Model/Managers/zoomManager';

export function addMethodListener() {
  // Change Method
  onChange(selectMethod, () => {
    const method = selectMethod.value as METHODS;

    setMethod(method);
    configDefaultLimits(method);

    restartLimit(FRACTALS.MANDELBROT);
    restartLimit(FRACTALS.JULIA);

    const currentComplex = getComplexNum();
    configInputs(currentComplex);

    restartZoom();
    runDraw();
  });
}
