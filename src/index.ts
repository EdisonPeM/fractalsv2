import { initView } from '@View';
import { addListeners, runDraw } from '@Controller';
import { initWorkers } from '@Model';
import { registerSW } from './serviceWorkerRegistration';

(function main() {
  initView();
  addListeners();
  initWorkers();

  // Run the first time
  runDraw();

  // Add SW
  registerSW();
})();
