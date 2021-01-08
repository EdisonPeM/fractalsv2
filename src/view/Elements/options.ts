import { e } from '@View/helpers';

import '../Assets/sass/options.scss';

export const hideAxisWrap = e('label');
hideAxisWrap.className = 'hide-axis';

const hideAxisLabel = e('span');
hideAxisLabel.textContent = 'Ocultar Eje';

export const hideAxis = e('input');
hideAxis.type = 'checkbox';
hideAxis.defaultChecked = true;

hideAxisWrap.append(hideAxis);
hideAxisWrap.append(hideAxisLabel);

// EVENTS
hideAxis.addEventListener('change', () => {
  hideAxisLabel.textContent = `${hideAxis.checked ? 'Ocultar' : 'Mostrar'} Eje`;
});
