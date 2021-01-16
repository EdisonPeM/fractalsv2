import { initView } from '@View';
import { addListeners, runDraw } from '@Controller';
import { initWorkers } from '@Model';

(function main() {
  initView();
  addListeners();
  initWorkers();

  // Run the first time
  runDraw();
})();

// Register the serviceWorker
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}
