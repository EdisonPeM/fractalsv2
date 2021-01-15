import { onClick } from './listeners';
import { FRACTALS, ZOOM_OPS } from '@Constants';
import { getCurrentFractal, runDraw } from '@Controller';
import { handleZoom } from '@Model';

import { myCanva } from '@View/Elements/canvas';
import {
  parm_a,
  parm_b,
  updateParam_a,
  updateParam_b,
} from '@View/Elements/inputs';
import {
  zoomHome,
  zoomIn,
  zoomOut,
  zoomPosition,
  activeZoomControl,
} from '@View/Elements/zoomControls';

let zoomOp: ZOOM_OPS = ZOOM_OPS.NONE;
function setZoomOp(op: ZOOM_OPS) {
  if (zoomOp === op) {
    restartZoomOp();
  } else {
    zoomOp = op;
  }
}

let zoomLevels = {
  [FRACTALS.MANDELBROT]: 1,
  [FRACTALS.JULIA]: 1,
};
export function getZoomLevels() {
  return zoomLevels;
}
export function restartZoomLevels() {
  Object.values(FRACTALS).forEach(fractal => {
    zoomLevels[fractal] = 1;
  });
}

let zoomInAction = false;
let zoomOutAction = false;
export function addZoomListeners() {
  onClick(myCanva, (ev: MouseEvent) => {
    if (zoomOp !== ZOOM_OPS.NONE) {
      const { width, clientWidth, height, clientHeight } = myCanva;
      const clickCoor: coord = {
        x: (ev.offsetX * width) / clientWidth,
        y: height - (ev.offsetY * height) / clientHeight,
      };

      changeZoom(clickCoor);
    }
  });

  onClick(zoomIn, () => setZoomOp(ZOOM_OPS.ZOOM_IN));
  onClick(zoomOut, () => setZoomOp(ZOOM_OPS.ZOOM_OUT));
  onClick(zoomPosition, () => setZoomOp(ZOOM_OPS.MOVE_POSITION));
  onClick(zoomHome, () => {
    zoomOp = ZOOM_OPS.HOME;
    changeZoom({ x: 0, y: 0 });
  });

  // Add event on KeyPress
  document.addEventListener('keydown', e => {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
      zoomInAction = true;
    }

    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      zoomOutAction = true;
    }

    if (zoomInAction && !zoomOutAction) setZoomOp(ZOOM_OPS.ZOOM_IN);
    if (!zoomInAction && zoomOutAction) setZoomOp(ZOOM_OPS.ZOOM_OUT);
    if (zoomInAction && zoomOutAction) setZoomOp(ZOOM_OPS.MOVE_POSITION);
  });

  document.addEventListener('keyup', e => {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
      zoomInAction = false;
    }
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
      zoomOutAction = false;
    }

    if (!zoomInAction && !zoomOutAction) setZoomOp(ZOOM_OPS.NONE);
  });
}

function changeZoom(center: coord) {
  changeZoomLevel();

  const c: complex = {
    real: parm_a.valueAsNumber,
    img: parm_b.valueAsNumber,
  };

  // Handle Zoom in Model
  const currentFractal = getCurrentFractal();
  const results = handleZoom(currentFractal, zoomOp, center);

  // Update the inputs limits
  if (results && currentFractal === FRACTALS.MANDELBROT) {
    const { newLimit, newValue } = results;
    const newInputsValues = newValue ?? c;

    console.info(newInputsValues);
    updateParam_a(newLimit.x, newInputsValues.real);
    updateParam_b(newLimit.y, newInputsValues.img);
  }

  // Re Draw
  runDraw();
  restartZoomOp();
}

function restartZoomOp() {
  // Restart Mode and Styles
  zoomOp = ZOOM_OPS.NONE;
  activeZoomControl();
}

function changeZoomLevel() {
  const currentFractal = getCurrentFractal();
  switch (zoomOp) {
    case ZOOM_OPS.ZOOM_IN: {
      zoomLevels[currentFractal]++;
      if (zoomLevels[currentFractal] === 0) {
        zoomLevels[currentFractal]++;
      }
      break;
    }

    case ZOOM_OPS.ZOOM_OUT: {
      zoomLevels[currentFractal]--;
      if (zoomLevels[currentFractal] === 0) {
        zoomLevels[currentFractal]--;
      }
      break;
    }

    case ZOOM_OPS.HOME: {
      zoomLevels[currentFractal] = 1;
      break;
    }
  }
}
