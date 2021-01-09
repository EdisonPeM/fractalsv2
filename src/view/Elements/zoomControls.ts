import { e } from '../helpers';
import { controlButton } from '../Components/Button';

// Third Part Libraries
import { icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons/faSearchPlus';
import { faSearchMinus } from '@fortawesome/free-solid-svg-icons/faSearchMinus';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons/faArrowsAlt';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';

export const zoomControls = e('div');
zoomControls.className = 'zoom-controls';

export const zoomIn = controlButton();
export const zoomOut = controlButton();
export const zoomPosition = controlButton();
export const zoomHome = controlButton();

addIcon(zoomIn, faSearchPlus);
addIcon(zoomOut, faSearchMinus);
addIcon(zoomPosition, faArrowsAlt);
addIcon(zoomHome, faHome);

zoomControls.append(zoomIn);
zoomControls.append(zoomOut);
zoomControls.append(zoomPosition);
zoomControls.append(zoomHome);

function addIcon(parentNode: HTMLElement, iconDef: IconDefinition) {
  Array.from(icon(iconDef).node).forEach(node => parentNode.append(node));
}

// Zoom Level Watcher
export const zoomLevel = e('div');
zoomLevel.className = 'zoom-level';
