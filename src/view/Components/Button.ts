import { addIcon, e } from '../helpers';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

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

export const shareButton = (
  subClass: string,
  icon: IconDefinition,
  urlShare: string = location.href
) => {
  const link = e('a');
  link.className = `btn-share`;
  link.title = `Compartir con ${subClass}`;
  link.target = '_blank';
  link.href = urlShare;

  addIcon(link, icon);
  return link;
};
