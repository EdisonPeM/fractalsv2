import { FRACTALS, ZOOM_OPS } from '@Constants';
import { runDraw } from '@Controller';
import { onClick } from '@Controller/listeners';

import {
  getCurrentFractal,
  getFractalLimits,
  getZoomLevel,
  setComplexNum,
} from '@Model/Managers/fractalManager';
import { handleZoom } from '@Model/Managers/zoomManager';

import { myCanva } from '@View/Elements/canvas';
import { updateParamImg, updateParamReal } from '@View/Elements/inputs';
import {
  zoomHome,
  zoomIn,
  zoomOut,
  zoomPosition,
  activeZoomControl,
  showZoomLevel,
} from '@View/Elements/zoomControls';

// ------------------------------------------------------------------ //
//                           Zoom Options                             //
// ------------------------------------------------------------------ //
let zoomOp: ZOOM_OPS = ZOOM_OPS.NONE;
function setZoomOp(op: ZOOM_OPS) {
  if (zoomOp === op) {
    restartZoomOp();
  } else {
    zoomOp = op;
  }
}

function restartZoomOp() {
  zoomOp = ZOOM_OPS.NONE;
  activeZoomControl();
}

// ------------------------------------------------------------------ //
//                             Listeners                              //
// ------------------------------------------------------------------ //
export function addZoomListeners() {
  onClick(myCanva, (ev: MouseEvent) => {
    if (zoomOp !== ZOOM_OPS.NONE) {
      const { clientWidth, clientHeight } = myCanva;
      const clickCoor: coord = {
        x: ev.offsetX / clientWidth,
        y: 1 - ev.offsetY / clientHeight,
      };

      changeZoom(clickCoor);
    }
  });

  onClick(zoomIn, () => setZoomOp(ZOOM_OPS.ZOOM_IN));
  onClick(zoomOut, () => setZoomOp(ZOOM_OPS.ZOOM_OUT));
  onClick(zoomPosition, () => setZoomOp(ZOOM_OPS.MOVE_POSITION));
  onClick(zoomHome, () => {
    restartZoomOp();
    changeZoom({ x: 0, y: 0 });
  });
}

// ------------------------------------------------------------------ //
//              Config Inputs values, Limits and Zoom                 //
// ------------------------------------------------------------------ //
export function configInputs(newInputsValues: complex) {
  const newLimit = getFractalLimits();
  updateParamReal(newLimit.x, newInputsValues.real);
  updateParamImg(newLimit.y, newInputsValues.img);
}

export function updateZoomLevel() {
  const level = getZoomLevel();
  showZoomLevel(level);
}

// ------------------------------------------------------------------ //
//                       Handle Zoom Option                           //
// ------------------------------------------------------------------ //
function changeZoom(coord: coord) {
  const newInputsValues = handleZoom(zoomOp, coord);

  // Update the inputs limits
  const currentFractal = getCurrentFractal();
  if (currentFractal === FRACTALS.MANDELBROT) {
    setComplexNum(newInputsValues);
    configInputs(newInputsValues);
  }

  // Re Draw
  updateZoomLevel();
  runDraw();
}

// ------------------------------------------------------------------ //
//                      Keys Shortcuts Support                        //
// ------------------------------------------------------------------ //
// let zoomInAction = false;
// let zoomOutAction = false;
// Add event on KeyPress
//   document.addEventListener('keydown', e => {
//     if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
//       zoomInAction = true;
//     }

//     if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
//       zoomOutAction = true;
//     }

//     if (zoomInAction && !zoomOutAction) setZoomOp(ZOOM_OPS.ZOOM_IN);
//     if (!zoomInAction && zoomOutAction) setZoomOp(ZOOM_OPS.ZOOM_OUT);
//     if (zoomInAction && zoomOutAction) setZoomOp(ZOOM_OPS.MOVE_POSITION);
//   });

//   document.addEventListener('keyup', e => {
//     if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
//       zoomInAction = false;
//     }
//     if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
//       zoomOutAction = false;
//     }

//     if (!zoomInAction && !zoomOutAction) setZoomOp(ZOOM_OPS.NONE);
//   });
// }
