import { FRACTALS } from '@Constants';
import { getLimits } from './zoomManager';
import Painter from '../Lib/Painter';

import { myCanva } from '@View/Elements/canvas';
import { getComplexNum, getCurrentFractal } from './fractalManager';

const myPainer: Painter = new Painter(myCanva);

export function drawFragment(imgData: ImageData, min: number) {
  myPainer.drawFragment(imgData, min);
}

export function drawAxis() {
  const fractal: FRACTALS = getCurrentFractal();
  const c: complex = getComplexNum();

  const limits = getLimits(fractal);
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

export function saveDrawing() {
  myPainer.saveInCache();
}
