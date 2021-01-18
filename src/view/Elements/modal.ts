import { Button } from '@View/Components/Button';
import { addIcon, e } from '@View/helpers';

import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';

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
export const closeModalBtn = e('button');
closeModalBtn.className = 'modal-close';
closeModalBtn.innerHTML = '&times;';
closeModalBtn.addEventListener('click', () => closeModal());

// ------------------------------------------------------------------ //
//                           Colors Generator                         //
// ------------------------------------------------------------------ //
export const mainElement = e('div') as HTMLElement;

// Control Buttons
export const addBtn = Button('+');
addBtn.classList.add('modal-add-btn');
addBtn.classList.add('btn-colors');

export const acceptBtn = Button('ok');
acceptBtn.classList.add('modal-accept-btn');
acceptBtn.addEventListener('click', () => closeModal());

// Append Elements to the modal
modalContent.append(closeModalBtn);
modalContent.append(mainElement);
modalContent.append(addBtn);
modalContent.append(acceptBtn);

// ------------------------------------------------------------------ //
//                                Events                              //
// ------------------------------------------------------------------ //
export function openModal() {
  modal.style.opacity = '1';
  modal.style.top = '0';
}

export function closeModal() {
  modal.style.top = '100%';
  modal.style.opacity = '0';
}
