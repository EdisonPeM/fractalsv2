import { icon, IconDefinition } from '@fortawesome/fontawesome-svg-core';

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);
export const e = document.createElement.bind(document);

export function addIcon(parentNode: HTMLElement, iconDef: IconDefinition) {
  Array.from(icon(iconDef).node).forEach(node => {
    node.classList.add('fa-fw');
    parentNode.append(node);
  });
}
