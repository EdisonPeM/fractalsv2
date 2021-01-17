import { e } from '../helpers';
import { InputParam } from '../Components/InputParam';
import { INITIAL_LIMITS } from '@Constants';

import '../Assets/sass/inputs.scss';

// ------------------------------------------------------------------ //
//                           Input Param Real                         //
// ------------------------------------------------------------------ //
export const paramReal = InputParam(...INITIAL_LIMITS.x);

// Container
export const paramRealContainer = e('div');
paramRealContainer.className = 'range';
paramRealContainer.append(paramReal);

// Update Labels on Change
paramReal.addEventListener('change', () =>
  updateLabelParam(paramReal, paramRealContainer)
);
updateLabelParam(paramReal, paramRealContainer);

// Update Limits and value of Input
export const updateParamReal = updateParam(paramReal, paramRealContainer);

// ------------------------------------------------------------------ //
//                           Input Param Img                          //
// ------------------------------------------------------------------ //
export const paramImg = InputParam(...INITIAL_LIMITS.y);

// Container
export const paramImgContainer = e('div');
paramImgContainer.className = 'range vertical-range';
paramImgContainer.append(paramImg);

// Update Labels on Change
paramImg.addEventListener('change', () =>
  updateLabelParam(paramImg, paramImgContainer)
);
updateLabelParam(paramImg, paramImgContainer);

// Update Limits and value of Input
export const updateParamImg = updateParam(paramImg, paramImgContainer);

// Fix Size paramImg on Resize
function setRangeSize() {
  const clientRects = paramReal.getClientRects();
  if (clientRects.length > 0) {
    paramImg.style.width = clientRects[0].width + 'px';
  }
}
window.addEventListener('resize', setRangeSize);
document.addEventListener('DOMContentLoaded', setRangeSize);

// ------------------------------------------------------------------ //
//                                Output                              //
// ------------------------------------------------------------------ //
export const output = e('div');
output.className = 'output';

// Listener
function updateOutput() {
  const outputReal = paramReal.valueAsNumber.toFixed(3);
  const outputImg = paramImg.valueAsNumber.toFixed(3);
  output.innerText = `c = (${outputReal}) + (${outputImg})i`;
}

paramReal.addEventListener('input', updateOutput);
paramImg.addEventListener('input', updateOutput);
updateOutput();

// ------------------------------------------------------------------ //
//                                EVENTS                              //
// ------------------------------------------------------------------ //
// Update Labels on Change
function updateLabelParam(
  paramInput: HTMLInputElement,
  paramContainer: HTMLDivElement
) {
  paramInput.title = (+paramInput.value).toFixed(3);
  paramContainer.dataset.min = (+paramInput.min).toFixed(3);
  paramContainer.dataset.max = (+paramInput.max).toFixed(3);
}

// Update Limits and value of Input
function updateParam(
  paramInput: HTMLInputElement,
  paramContainer: HTMLDivElement
) {
  return function (limits: [number, number], value?: number) {
    if (value) paramInput.value = value.toString();

    const [min, max] = limits;
    paramInput.min = min.toString();
    paramInput.max = max.toString();
    paramInput.step = ((max - min) / 1000).toString();

    updateLabelParam(paramInput, paramContainer);
    updateOutput();
  };
}

export function getComplexInput(): complex {
  return {
    real: paramReal.valueAsNumber,
    img: paramImg.valueAsNumber,
  };
}
