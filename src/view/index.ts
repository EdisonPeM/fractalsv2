import { $, e } from './helpers';

import {
  output,
  container_parm_a,
  container_parm_b,
  // disabledInputs,
} from './Elements/inputs';
import { runBtns } from './Elements/runButtons';
import { canvaDiv, showSpinner } from './Elements/canvas';
import { downloadBtn } from './Elements/downloadButton';
import { hideAxisWrap, selectMethodWrap } from './Elements/options';
import { modal, openModalbtn } from './Elements/modal';

// Add Styles
import './Assets/sass/index.scss';

// Main function to config the view
export function initView() {
  const App = $('#app');

  // Main Canva containers
  const canvaContainer = e('div');
  canvaContainer.className = 'canva-container'; // GRID
  canvaContainer.append(container_parm_a); // up Left
  canvaContainer.append(e('div')); // down Left
  canvaContainer.append(canvaDiv); // down Left
  canvaContainer.append(container_parm_b); // down Right

  // Add all components to the main view
  if (App) {
    App.append(runBtns);
    App.append(e('hr'));
    App.append(output);
    App.append(canvaContainer);
    //
    App.append(selectMethodWrap);
    App.append(hideAxisWrap);
    App.append(e('br'));
    App.append(downloadBtn);
    App.append(openModalbtn);
    App.append(modal);
  }
}

export function blockView() {
  showSpinner(true);
  // disabledInputs(true);
}

export function unBlockView() {
  showSpinner(false);
  // disabledInputs(false);
}
