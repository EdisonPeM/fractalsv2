import { Button } from '@View/Components/Button';
import { addIcon, e } from '@View/helpers';
import { GradientGenerator, GeneratorManager } from 'gradient-generator-ui';

import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';

import 'gradient-generator-ui/dist/gradient-generator.css';
import '../Assets/sass/modal.scss';

// ------------------------------------------------------------------ //
//                              Modal Element                         //
// ------------------------------------------------------------------ //
export const modal = e('div');
modal.className = 'modal';

// Open Modal Button
export const openModalbtn = Button('Cambiar Colores ');
openModalbtn.classList.add('btn-colors');
openModalbtn.addEventListener('click', () => openModal());
addIcon(openModalbtn, faPalette);

// Modal Content
const modalContent = e('div');
modalContent.className = 'modal-content';
modal.append(modalContent);

// Close Modal Button
const closeModalBtn = e('button');
closeModalBtn.className = 'modal-close';
closeModalBtn.innerHTML = '&times;';
closeModalBtn.addEventListener('click', () => rejectNewColors());

// ------------------------------------------------------------------ //
//                           Colors Generator                         //
// ------------------------------------------------------------------ //
const mainElement = e('div') as HTMLElement;
const myGen = new GradientGenerator({ mainElement });
const manager = new GeneratorManager({ generator: myGen, keepChanges: false });

export function getGeneratedColors(): string[] {
  return myGen.generateColors();
}

const observers: Function[] = [];
export function onChangeColors(cb: Function) {
  observers.push(cb);
}

// Control Buttons
const addBtn = Button('+');
addBtn.classList.add('modal-add-btn');
addBtn.classList.add('btn-colors');
addBtn.addEventListener('click', () => manager.activateAddMode());

const acceptBtn = Button('ok');
acceptBtn.classList.add('modal-accept-btn');
acceptBtn.addEventListener('click', () => acceptNewColors());

// Append Elements to the modal
modalContent.append(closeModalBtn);
modalContent.append(mainElement);
modalContent.append(addBtn);
modalContent.append(acceptBtn);

// ------------------------------------------------------------------ //
//                                Events                              //
// ------------------------------------------------------------------ //
let isModalOpen = false;
function openModal() {
  isModalOpen = true;
  modal.style.opacity = '1';
  modal.style.top = '0';
}

function closeModal() {
  isModalOpen = false;
  modal.style.top = '100%';
  modal.style.opacity = '0';
}

function acceptNewColors() {
  const colors = myGen.generateColors();
  observers.forEach(cb => cb(colors));
  manager.saveColors();
  closeModal();
}

function rejectNewColors() {
  manager.restoreColors();
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
