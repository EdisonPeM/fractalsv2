import { METHODS } from '@Constants';
import { INITIAL_METHOD, INITIAL_SHOW_AXIS } from '@InitialValues';
import { e } from '@View/helpers';

import '../Assets/sass/options.scss';

export const hideAxisContainer = e('label');
hideAxisContainer.className = 'hide-axis';

const hideAxisLabel = e('span');
hideAxisLabel.textContent = 'Mostrar el Eje';

export const hideAxis = e('input');
hideAxis.type = 'checkbox';
hideAxis.defaultChecked = INITIAL_SHOW_AXIS;

hideAxisContainer.append(hideAxis);
hideAxisContainer.append(hideAxisLabel);

export const selectMethodContainer = e('div');
selectMethodContainer.className = 'select-method';

export const selectMethod = e('select');
const selectMethodLabel = e('label');
selectMethodLabel.textContent = 'Seleccione un Metodo';

selectMethodContainer.append(selectMethodLabel);
selectMethodContainer.append(selectMethod);

const optionsLabel = {
  [METHODS.SQUARE]: 'z = z^2 + c',
  [METHODS.CUBIC]: 'z = z^3 + c',
  [METHODS.FOUR]: 'z = z^4 + c',
  [METHODS.TRICORN]: 'z = conj(z)^2 + c',
  [METHODS.SHIP]: 'Buring Ship',
};

Object.values(METHODS).forEach(method => {
  const optionEl = e('option');
  optionEl.textContent = optionsLabel[method];
  optionEl.selected = method === INITIAL_METHOD;
  optionEl.value = method;
  selectMethod.append(optionEl);
});
