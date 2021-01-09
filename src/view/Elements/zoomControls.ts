import { e } from '../helpers';
import { controlButton } from '../Components/Button';
import { myCanva } from './canvas';

// Third Part Libraries
import { icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons/faSearchPlus';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons/faSearchMinus';
// import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons/faCrosshairs';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';

import '../Assets/sass/zoomControls.scss';

export const zoomControls = e('div');
zoomControls.className = 'zoom-controls';

export const zoomIn = controlButton();
addIcon(zoomIn, faSearchPlus);
zoomIn.title = 'Zoom in';

export const zoomOut = controlButton();
addIcon(zoomOut, faSearchMinus);
zoomOut.title = 'Zoom Out';

export const zoomPosition = controlButton();
addIcon(zoomPosition, faCrosshairs);
zoomPosition.title = 'Change Fractal Position';

export const zoomHome = controlButton();
addIcon(zoomHome, faHome);
zoomHome.title = 'Reset Default Zoom';

function addIcon(parentNode: HTMLElement, iconDef: IconDefinition) {
  Array.from(icon(iconDef).node).forEach(node => {
    node.classList.add('fa-fw');
    parentNode.append(node);
  });
}

// Event to change canvas styles
zoomIn.addEventListener('click', function () {
  activeZoomControl(this);
});
zoomOut.addEventListener('click', function () {
  activeZoomControl(this);
});
zoomPosition.addEventListener('click', function () {
  activeZoomControl(this);
});
zoomHome.addEventListener('click', () => {
  activeZoomControl();
});

export function activeZoomControl(control?: HTMLElement) {
  zoomIn.classList.remove('active');
  zoomOut.classList.remove('active');
  zoomPosition.classList.remove('active');
  zoomHome.classList.remove('active');
  myCanva.className = '';

  if (control) {
    myCanva.className = 'crosshair';
    control.classList.add('active');
  }
}

let zoomInAction = false;
let zoomOutAction = false;
document.addEventListener('keydown', e => {
  if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
    zoomInAction = true;
  }

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    zoomOutAction = true;
  }

  if (zoomInAction && !zoomOutAction) activeZoomControl(zoomIn);
  if (!zoomInAction && zoomOutAction) activeZoomControl(zoomOut);
  if (zoomInAction && zoomOutAction) activeZoomControl(zoomPosition);
});

document.addEventListener('keyup', e => {
  if (e.code === 'ControlLeft' || e.code === 'ControlRight') {
    zoomInAction = false;
  }
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    zoomOutAction = false;
  }

  if (!zoomInAction && !zoomOutAction) activeZoomControl();
});

// Container of Zoom Controls
zoomControls.append(zoomIn);
zoomControls.append(zoomOut);
zoomControls.append(zoomPosition);
zoomControls.append(zoomHome);

// Zoom Level Watcher
export const zoomLevel = e('div');
zoomLevel.className = 'zoom-level';

export function showZoomLevel(level: number) {
  zoomLevel.textContent = `Zoom x${level}`;
}
showZoomLevel(1);
