import { e } from '@View/helpers';

import '../Assets/sass/options.scss';

export const hideAxisWrap = e('label');
hideAxisWrap.className = 'hide-axis';

const hideAxisLabel = e('span');
hideAxisLabel.textContent = 'Mostrar el Eje';

export const hideAxis = e('input');
hideAxis.type = 'checkbox';
hideAxis.defaultChecked = true;

hideAxisWrap.append(hideAxis);
hideAxisWrap.append(hideAxisLabel);
