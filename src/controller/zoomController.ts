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
import { onClick } from './listeners';

let zoomOp: ZOOM_OPS = ZOOM_OPS.NONE;

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

  onClick(zoomIn, () => {
    if (zoomOp === ZOOM_OPS.ZOOM_IN) {
      restartZoomOp();
    } else {
      zoomOp = ZOOM_OPS.ZOOM_IN;
    }
  });

  onClick(zoomOut, () => {
    if (zoomOp === ZOOM_OPS.ZOOM_OUT) {
      restartZoomOp();
    } else {
      zoomOp = ZOOM_OPS.ZOOM_OUT;
    }
  });

  onClick(zoomPosition, () => {
    if (zoomOp === ZOOM_OPS.MOVE_POSITION) {
      restartZoomOp();
    } else {
      zoomOp = ZOOM_OPS.MOVE_POSITION;
    }
  });

  onClick(zoomHome, () => {
    zoomOp = ZOOM_OPS.HOME;
    changeZoom({ x: 0, y: 0 });
  });
}

function changeZoom(center: coord) {
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
    updateParam_a(newInputsValues.real, newLimit.x);
    updateParam_b(newInputsValues.img, newLimit.y);
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
