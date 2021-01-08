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
