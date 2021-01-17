// import { runDraw } from '@Controller';

import { runDraw } from '@Controller';
import { onClick } from '@Controller/listeners';
import { setFractalColors } from '@Model/Managers/colorManager';
import { setColorsBase } from '@Model/Managers/fractalManager';
import {
  mainElement,
  closeModalBtn,
  openModalbtn,
  addBtn,
  acceptBtn,
  closeModal,
  modal,
} from '@View/Elements/modal';

// import { changeColors } from '@Model';

import { GradientGenerator, GeneratorManager } from 'gradient-generator-ui';
import 'gradient-generator-ui/dist/gradient-generator.css';

const myGen = new GradientGenerator({ mainElement });
const manager = new GeneratorManager({ generator: myGen, keepChanges: false });

let isModalOpen = false;
export function addColorsListener() {
  onClick(openModalbtn, () => {
    isModalOpen = true;
  });

  onClick(closeModalBtn, () => rejectNewColors());
  onClick(acceptBtn, () => acceptNewColors());
  onClick(addBtn, () => {
    manager.activateAddMode();
  });

  onClick(modal, (ev: MouseEvent) => {
    if (ev.target === modal) rejectNewColors();
  });

  setFractalColors(myGen.generateColors());
}

// ------------------------------------------------------------------ //
//                              Functions                             //
// ------------------------------------------------------------------ //
function acceptNewColors() {
  manager.saveColors();
  setColorsBase(myGen.getGradientColors());
  setFractalColors(myGen.generateColors());

  isModalOpen = false;
  closeModal();

  runDraw();
}

function rejectNewColors() {
  manager.restoreColors();
  isModalOpen = false;
  closeModal();
}

// ------------------------------------------------------------------ //
//                      Keys Shortcuts Support                        //
// ------------------------------------------------------------------ //
document.addEventListener('keydown', e => {
  if (!isModalOpen) return;

  if (e.code === 'Escape') rejectNewColors();
  if (e.code === 'Enter') acceptNewColors();
  if (e.code === 'KeyN') manager.activateAddMode();
});
