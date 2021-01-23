import { registerDownload } from '../../googleAnalytics';

import { addIcon, e } from '../helpers';
import { Button } from '../Components/Button';
import { myCanva } from './canvas';

import { faFileDownload } from '@fortawesome/free-solid-svg-icons/faFileDownload';

export const downloadBtn = Button('Descargar ');
downloadBtn.addEventListener('click', () => {
  registerDownload();
  const link = e('a');
  link.download = 'fractal.png';
  link.href = myCanva.toDataURL();
  link.click();
});

addIcon(downloadBtn, faFileDownload);
