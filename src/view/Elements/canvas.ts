import { e } from '../helpers';

import '../Assets/sass/canvas.scss';

// main Canva
export const myCanva = e('canvas');
myCanva.width = 1024;
myCanva.height = 1024;

const spinner = e('div');
spinner.className = 'spinner';
spinner.style.display = 'none';
spinner.innerHTML = `<div class="loader"></div>`;

export function showSpinner(show: boolean) {
  spinner.style.display = show ? '' : 'none';
}

export const canvaDiv = e('div');
canvaDiv.className = 'canva';

canvaDiv.append(myCanva);
canvaDiv.append(spinner);
