import { $, e } from './helpers';

import { btnsContainer } from './Elements/runButtons';
import {
  output,
  paramRealContainer,
  paramImgContainer,
} from './Elements/inputs';
import { canvaContainer, showSpinner } from './Elements/canvas';
import { hideAxisContainer, selectMethodContainer } from './Elements/options';
import { downloadBtn } from './Elements/downloadButton';
import { modal, openModalbtn } from './Elements/modal';
import { shareButtonsContainer } from './Elements/shareButtons';

// Add Styles
import './Assets/sass/index.scss';

// Main function to config the view
export function initView() {
  const App = $('#app');
  if (!App) return;

  // Main Canva containers
  const canvaGrid = e('div');
  canvaGrid.className = 'canva-container'; // GRID
  canvaGrid.append(paramRealContainer); // up Left
  canvaGrid.append(e('div')); // down Left
  canvaGrid.append(canvaContainer); // down Left
  canvaGrid.append(paramImgContainer); // down Right

  // Add all components to the main view
  App.append(btnsContainer);
  App.append(e('hr'));
  App.append(output);
  App.append(canvaGrid);
  App.append(selectMethodContainer);
  App.append(hideAxisContainer);
  App.append(e('br'));
  App.append(downloadBtn);
  App.append(openModalbtn);
  App.append(shareButtonsContainer);
  App.append(modal);
}

export const blockView = () => showSpinner(true);
export const unBlockView = () => showSpinner(false);
