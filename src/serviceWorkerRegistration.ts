export function registerSW() {
  // Register the serviceWorker
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          '/service-worker.js'
        );

        const updateSW = (installingWorker: ServiceWorker) => {
          if (installingWorker.state !== 'installed') return;
          if (navigator.serviceWorker.controller) {
            console.log(
              '[SW] New content is available and will be used when all tabs for this page are closed.'
            );

            const waitingServiceWorker = registration.waiting;
            if (waitingServiceWorker) {
              waitingServiceWorker.onstatechange = () => {
                if (waitingServiceWorker.state === 'activated') {
                  window.location.reload();
                }
              };
              waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          } else {
            console.log('[SW] Content is cached for offline use.');
          }
        };

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) return;
          installingWorker.onstatechange = () => updateSW(installingWorker);
        };
      } catch (error) {}
    });
  }
}
