import { e } from '../helpers';

import { zoomControls, zoomLevel } from './zoomControls';
import '../Assets/sass/canvas.scss';

// main Canva
export const myCanva = e('canvas');
myCanva.width = 512;
myCanva.height = 512;

const spinner = e('div');
spinner.className = 'spinner';
spinner.style.display = 'none';
spinner.innerHTML = `<div class="loader"></div>`;

export function showSpinner(show: boolean) {
  spinner.style.display = show ? '' : 'none';
}

export const canvaContainer = e('div');
canvaContainer.className = 'canva';

// Add Elements
canvaContainer.append(myCanva);
canvaContainer.append(zoomControls);
canvaContainer.append(zoomLevel);
canvaContainer.append(spinner);
