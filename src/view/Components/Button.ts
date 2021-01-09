import { e } from '../helpers';

import '../Assets/sass/buttons.scss';

export const Button = (textContent: string) => {
  const button = e('button');
  button.className = 'btn';
  button.textContent = textContent;

  return button;
};

export const controlButton = () => {
  const button = e('button');
  button.className = 'control';

  return button;
};
