import { Button } from '@View/Components/Button';
import { e } from '@View/helpers';
import { GradientGenerator, GeneratorManager } from 'gradient-generator-ui';

import 'gradient-generator-ui/dist/gradient-generator.css';
import '../Assets/sass/modal.scss';

export const modal = e('div');
modal.className = 'modal';

export const openModalbtn = Button('Cambiar colores');
openModalbtn.addEventListener('click', () => openModal());

const modalContent = e('div');
modalContent.className = 'modal-content';
modal.append(modalContent);

const closeModalBtn = e('button');
closeModalBtn.className = 'modal-close';
closeModalBtn.innerHTML = '&times;';
closeModalBtn.addEventListener('click', () => rejectNewColors());

const mainElement = e('div') as HTMLElement;

export const myGen = new GradientGenerator({ mainElement });
const manager = new GeneratorManager({ generator: myGen, keepChanges: false });

const observers: Function[] = [];
export function onChangeColors(cb: Function) {
  observers.push(cb);
}

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

let isModalOpen = false;
//Eventos
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

document.addEventListener('keydown', e => {
  if (isModalOpen && e.code === 'Escape') {
    rejectNewColors();
  }

  if (isModalOpen && e.code === 'Enter') {
    acceptNewColors();
  }

  if (isModalOpen && e.code === 'KeyN') {
    manager.activateAddMode();
  }
});
