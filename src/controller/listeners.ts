// This is some helpers to work with common HTML Events

export function onClick(node: HTMLElement, callback: Function) {
  node.addEventListener('click', ev => callback(ev));
}

export function onInput(node: HTMLElement, callback: Function) {
  node.addEventListener('input', ev => callback(ev));
}

export function onChange(node: HTMLElement, callback: Function) {
  node.addEventListener('change', ev => callback(ev));
}

export function onMessage(worker: Worker, callback: Function) {
  worker.addEventListener('message', ev => callback(ev.data));
}
