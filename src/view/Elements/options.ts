import { METHODS } from '@Constants';
import { e } from '@View/helpers';

import '../Assets/sass/options.scss';

export const hideAxisContainer = e('label');
hideAxisContainer.className = 'hide-axis';

const hideAxisLabel = e('span');
hideAxisLabel.textContent = 'Mostrar el Eje';

export const hideAxis = e('input');
hideAxis.type = 'checkbox';

hideAxisContainer.append(hideAxis);
hideAxisContainer.append(hideAxisLabel);

export const selectMethodContainer = e('div');
selectMethodContainer.className = 'select-method';

export const selectMethod = e('select');
const selectMethodLabel = e('label');
selectMethodLabel.textContent = 'Seleccione un Metodo';

selectMethodContainer.append(selectMethodLabel);
selectMethodContainer.append(selectMethod);

Object.values(METHODS).forEach(method => {
  const optionEl = e('option');
  optionEl.textContent = method;
  optionEl.value = method;
  selectMethod.append(optionEl);
});
