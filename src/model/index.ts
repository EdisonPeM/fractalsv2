import Painter from './Lib/Painter';
import { myCanva } from '@View/Elements/canvas';

import { compareAndSave, saveInCache } from './cache';
import { ACTIONS, FRACTALS, METHODS, ZOOM_OPS } from '@Constants';

import {
  sendWorkerMessage,
  onWorkerMessage,
  threads,
} from './Managers/workersManager';
import { configLimits, LIMITS, zoom } from './Managers/zoomManager';
import { getColors, defaultColors } from './Managers/colorManager';

// Add Event Listeners with Observer Pattern
const observers: Array<Function> = [];
export function onDone(cb: Function) {
  observers.push(cb);
}
function done(payload: any = true) {
  observers.forEach(cb => cb(payload));
}

// Canva manipulator
const myPainer: Painter = new Painter(myCanva);

let workersFinished = 0;
export function initWorkers() {
  sendWorkerMessage({
    action: ACTIONS.INIT,
    payload: {
      threads,
      method: METHODS.SQUARE,
      width: myCanva.width,
      height: myCanva.height,
      colors: getColors(defaultColors),
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

export function changeColors(colors: string[]) {
  saveInCache('fractal', null);
  sendWorkerMessage({
    action: ACTIONS.CHANGE_COLORS,
    payload: {
      colors: getColors(colors),
    },
  });
}

export function changeMethod(method: METHODS): limit {
  saveInCache('fractal', null);
  sendWorkerMessage({
    action: ACTIONS.CHANGE_METHOD,
    payload: {
      method,
    },
  });

  return configLimits(method);
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

export function handleZoom(
  fractalOnZoom: FRACTALS,
  zoomAction: ZOOM_OPS,
  center: coord
) {
  // calculate the mapping of the coord
  saveInCache('fractal', null);
  switch (zoomAction) {
    case ZOOM_OPS.ZOOM_IN: {
      return zoom(fractalOnZoom, center, 0.5);
    }

    case ZOOM_OPS.ZOOM_OUT: {
      return zoom(fractalOnZoom, center, 2);
    }

    case ZOOM_OPS.MOVE_POSITION: {
      return zoom(fractalOnZoom, center, 1);
    }

    case ZOOM_OPS.HOME: {
      return zoom(fractalOnZoom, center, 0);
    }

    default:
      return null;
  }
}
