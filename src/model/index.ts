import Painter from './Lib/Painter';
import { myCanva } from '@View/Elements/canvas';

import { compareAndSave } from './cache';
import { ACTIONS, FRACTALS, METHODS } from '@Constants';

import {
  sendWorkerMessage,
  onWorkerMessage,
  threads,
} from './Managers/workersManager';
import { LIMITS } from './Managers/zoomManager';
import { colorsRGB } from './Managers/colorManager';

// Add Event Listeners with Observer Pattern
const observers: Array<Function> = [];
export function onDone(cb: Function) {
  observers.push(cb);
}
function done(payload: any = true) {
  observers.forEach(cb => cb(payload));
}

/// --------------------------------------------------------------------
// Canva manipulator
const myPainer: Painter = new Painter(myCanva);

// ----------------------------------------------------------
let workersFinished = 0;

export function initWorkers() {
  sendWorkerMessage({
    action: ACTIONS.INIT,
    payload: {
      threads,
      method: METHODS.SQUARE,
      width: myCanva.width,
      height: myCanva.height,
      colors: colorsRGB,
    },
  });

  onWorkerMessage((payload: any) => {
    const { imgData, min } = payload;
    myPainer.drawFragment(imgData, min);

    workersFinished++;
    if (workersFinished === threads) {
      myPainer.saveInCache();
      done();
    }
  });
}

// Main function
export function draw(fractal: FRACTALS, c: complex) {
  const fractalChanged = compareAndSave('fractal', fractal);
  const realChanged = compareAndSave('c.real', c.real);
  const imgChanged = compareAndSave('c.img', c.img);
  if (!fractalChanged && !realChanged && !imgChanged) return done();

  myPainer.clear();
  workersFinished = 0;
  sendWorkerMessage({
    action: ACTIONS.CALCULATE,
    payload: {
      fractal,
      limits: LIMITS[fractal],
      complexNum: c,
    },
  });
}

export function drawAxis(fractal: FRACTALS, c: complex) {
  const limits = LIMITS[fractal];
  const [minX, maxX] = limits.x;
  const [minY, maxY] = limits.y;

  const posX = c.real - minX;
  const posY = c.img - minY;
  const Dx = maxX - minX;
  const Dy = maxY - minY;

  myPainer.drawAxis(posX, posY, Dx, Dy);
}

export function eraseAxis() {
  myPainer.drawAxis(0, 0, 0, 0);
}
