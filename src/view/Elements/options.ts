import { METHODS } from '@Constants';
import { e } from '@View/helpers';

import '../Assets/sass/options.scss';

export const hideAxisWrap = e('label');
hideAxisWrap.className = 'hide-axis';

const hideAxisLabel = e('span');
hideAxisLabel.textContent = 'Mostrar el Eje';

export const hideAxis = e('input');
hideAxis.type = 'checkbox';
hideAxis.defaultChecked = Boolean(+(localStorage.getItem('hideAxis') || 1));
hideAxis.addEventListener('change', () => {
  localStorage.setItem('hideAxis', +hideAxis.checked + '');
});

hideAxisWrap.append(hideAxis);
hideAxisWrap.append(hideAxisLabel);

export const selectMethodWrap = e('div');
selectMethodWrap.className = 'select-method';

export const selectMethod = e('select');
const selectMethodLabel = e('label');
selectMethodLabel.textContent = 'Seleccione un Metodo';
selectMethod.addEventListener('change', () => {
  localStorage.setItem('method', selectMethod.value);
});

selectMethodWrap.append(selectMethodLabel);
selectMethodWrap.append(selectMethod);

Object.values(METHODS).forEach(method => {
  const optionEl = e('option');
  optionEl.textContent = method;
  optionEl.value = method;
  optionEl.defaultSelected =
    method === (localStorage.getItem('method') as METHODS);
  selectMethod.append(optionEl);
});
