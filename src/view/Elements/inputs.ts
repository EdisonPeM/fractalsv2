import { e } from '../helpers';
import { InputParam } from '../Components/InputParam';
import { INPUTS_LIMITS } from '@Constants';

import '../Assets/sass/inputs.scss';

export const parm_a = InputParam(...INPUTS_LIMITS.x);
export const parm_b = InputParam(...INPUTS_LIMITS.y);

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
  parm_a.title = parm_a.value;
  container_parm_a.dataset.min = parm_a.min;
  container_parm_a.dataset.max = parm_a.max;
}

function updateLabelParam_b() {
  parm_b.title = parm_b.value;
  container_parm_b.dataset.min = parm_b.min;
  container_parm_b.dataset.max = parm_b.max;
}

parm_a.addEventListener('change', updateLabelParam_a);
parm_b.addEventListener('change', updateLabelParam_b);

updateLabelParam_a();
updateLabelParam_b();

// Restart Values after Zoom Operations
export function updateParam_a(value: number, limits: [number, number]) {
  parm_a.value = value.toFixed(3);
  parm_a.min = limits[0].toFixed(3);
  parm_a.max = limits[1].toFixed(3);
  updateLabelParam_a();
  updateOutput();
}

export function updateParam_b(value: number, limits: [number, number]) {
  parm_b.value = value.toFixed(3);
  parm_b.min = limits[0].toFixed(3);
  parm_b.max = limits[1].toFixed(3);
  updateLabelParam_b();
  updateOutput();
}
