import { e } from '../helpers';
import { InputParam } from '../Components/InputParam';
import { INITIAL_LIMITS } from '@Constants';

import '../Assets/sass/inputs.scss';

const storagedParmAValue = localStorage.getItem('parm_a') || 0;
const storagedParmBValue = localStorage.getItem('parm_b') || 0;
export const parm_a = InputParam(...INITIAL_LIMITS.x, +storagedParmAValue);
export const parm_b = InputParam(...INITIAL_LIMITS.y, +storagedParmBValue);

parm_a.tabIndex = 1;
parm_b.tabIndex = 1;

// Resize params
function setRangeSize() {
  parm_b.style.width = parm_a.getClientRects()[0].width + 'px';
}

document.addEventListener('DOMContentLoaded', setRangeSize);
window.addEventListener('resize', setRangeSize);

export function disabledInputs(disabled: boolean) {
  parm_a.disabled = disabled;
  parm_b.disabled = disabled;
}

// -------------------- //
//        Output        //
// -------------------- //
export const output = e('div');
output.className = 'output';

function updateOutput() {
  const output_a = parm_a.valueAsNumber.toFixed(3);
  const output_b = parm_b.valueAsNumber.toFixed(3);

  localStorage.setItem('parm_a', parm_a.value);
  localStorage.setItem('parm_b', parm_b.value);

  output.innerText = `c = (${output_a}) + (${output_b})i`;
}

parm_a.addEventListener('input', updateOutput);
parm_b.addEventListener('input', updateOutput);
updateOutput();

// ---------------------- //
//      Containers        //
// ---------------------- //
export const container_parm_a = e('div');
container_parm_a.className = 'range';
container_parm_a.append(parm_a);

export const container_parm_b = e('div');
container_parm_b.className = 'range vertical-range';
container_parm_b.append(parm_b);

// Update Labels on Change
function updateLabelParam_a() {
  parm_a.title = (+parm_a.value).toFixed(3);
  container_parm_a.dataset.min = (+parm_a.min).toFixed(3);
  container_parm_a.dataset.max = (+parm_a.max).toFixed(3);
}

function updateLabelParam_b() {
  parm_b.title = (+parm_b.value).toFixed(3);
  container_parm_b.dataset.min = (+parm_b.min).toFixed(3);
  container_parm_b.dataset.max = (+parm_b.max).toFixed(3);
}

parm_a.addEventListener('change', updateLabelParam_a);
parm_b.addEventListener('change', updateLabelParam_b);

updateLabelParam_a();
updateLabelParam_b();

// Restart Values after Zoom Operations
export function updateParam_a(limits: [number, number], value?: number) {
  if (value) {
    parm_a.value = value.toString();
    localStorage.setItem('parm_a', parm_a.value);
  }

  const [min, max] = limits;
  parm_a.min = min.toString();
  parm_a.max = max.toString();
  parm_a.step = ((max - min) / 1000).toString();

  updateLabelParam_a();
  updateOutput();
}

export function updateParam_b(limits: [number, number], value?: number) {
  if (value) {
    parm_b.value = value.toString();
    localStorage.setItem('parm_b', parm_b.value);
  }

  const [min, max] = limits;
  parm_b.min = min.toString();
  parm_b.max = max.toString();
  parm_b.step = ((max - min) / 1000).toString();

  updateLabelParam_b();
  updateOutput();
}
