declare global {
  interface Window {
    gtag: Function;
  }
}

export const registerShare = (method: string) => {
  const gtag = window.gtag;
  gtag('event', 'share', { method });
};

export const registerDownload = () => {
  const gtag = window.gtag;
  gtag('event', 'download', {
    content_type: 'fractal',
    item_id: location.search,
  });
};
