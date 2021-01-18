import { FRACTALS, ZOOM_OPS } from '@Constants';
import { INITIAL_ZOOM } from '@InitialValues';
import {
  getComplexNum,
  getCurrentFractal,
  setZoomLevel,
} from './fractalManager';
import { configNewLimits, restartLimit } from './limitsManager';

let zoomLevels = INITIAL_ZOOM;
export function restartZoom() {
  Object.values(FRACTALS).forEach(fractal => {
    zoomLevels[fractal] = 1;
    restartLimit(fractal);
  });

  setZoomLevel(zoomLevels);
}

export function handleZoom(zoomAction: ZOOM_OPS, center: coord): complex {
  const currentFractal = getCurrentFractal();
  let complexResp = getComplexNum();
  switch (zoomAction) {
    case ZOOM_OPS.ZOOM_IN: {
      zoomLevels[currentFractal]++;
      if (zoomLevels[currentFractal] === 0) {
        zoomLevels[currentFractal]++;
      }
      complexResp = configNewLimits(center, 0.5);
      break;
    }

    case ZOOM_OPS.ZOOM_OUT: {
      zoomLevels[currentFractal]--;
      if (zoomLevels[currentFractal] === 0) {
        zoomLevels[currentFractal]--;
      }
      complexResp = configNewLimits(center, 2);
      break;
    }

    case ZOOM_OPS.MOVE_POSITION: {
      complexResp = configNewLimits(center, 1);
      break;
    }

    case ZOOM_OPS.HOME:
    default: {
      zoomLevels[currentFractal] = 1;
      restartLimit(currentFractal);
      break;
    }
  }

  setZoomLevel(zoomLevels);
  return complexResp;
}
