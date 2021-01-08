import { e } from '../helpers';
import { Button } from '../Components/Button';
import { myCanva } from './canvas';

export const downloadBtn = Button('Descargar Fractal');
downloadBtn.addEventListener('click', () => {
  const link = e('a');
  link.download = 'fractal.png';
  link.href = myCanva.toDataURL();
  link.click();
});
