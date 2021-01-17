import { compareAndSave } from './cache';
import {
  sendWorkerMessage,
  onWorkerMessage,
  threads,
} from './Managers/workersManager';
import { drawFragment, saveDrawing } from './Managers/drawManager';
import {
  getCurrentFractal,
  getComplexNum,
  getMethod,
} from './Managers/fractalManager';

import { done } from '@Controller';
import { myCanva } from '@View/Elements/canvas';
import { getFractalColors } from './Managers/colorManager';
import { getLimits } from './Managers/zoomManager';
import { FRACTALS, METHODS } from '@Constants';

// ------------------------------------------------------------------ //
//                       Worker Listener                              //
// ------------------------------------------------------------------ //
let workersFinished = 0;
export function initWorkers() {
  onWorkerMessage((payload: any) => {
    const { imgData, min } = payload;
    drawFragment(imgData, min);

    workersFinished++;
    if (workersFinished === threads) {
      saveDrawing();
      done();
    }
  });
}

// ------------------------------------------------------------------ //
//                          Run function                              //
// ------------------------------------------------------------------ //
export function run() {
  const fractal: FRACTALS = getCurrentFractal();
  const complexNum: complex = getComplexNum();

  const fractalChanged = compareAndSave('fractal', fractal);
  const realChanged = compareAndSave('c.real', complexNum.real);
  const imgChanged = compareAndSave('c.img', complexNum.img);

  if (!fractalChanged && !realChanged && !imgChanged) return done();

  const { width, height } = myCanva;
  const colors: colorRGB[] = getFractalColors();
  const limits: limit = getLimits(fractal);
  const method: METHODS = getMethod();

  workersFinished = 0;
  sendWorkerMessage({
    width,
    height,
    threads,
    method,
    colors,
    fractal,
    limits,
    complexNum,
  });
}
