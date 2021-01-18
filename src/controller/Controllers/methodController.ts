import { METHODS } from '@Constants';

import { runDraw } from '@Controller';
import { onChange } from '@Controller/listeners';
import { configInputs, updateZoomLevel } from './zoomController';

import { selectMethod } from '@View/Elements/options';

import { getComplexNum, setMethod } from '@Model/Managers/fractalManager';
import { configDefaultLimits } from '@Model/Managers/limitsManager';
import { restartZoom } from '@Model/Managers/zoomManager';

export function addMethodListener() {
  // Change Method
  onChange(selectMethod, () => {
    const method = selectMethod.value as METHODS;

    setMethod(method);
    configDefaultLimits(method);

    const currentComplex = getComplexNum();
    configInputs(currentComplex);

    restartZoom();
    updateZoomLevel();

    runDraw();
  });
}
