export const handler = {
  set(target: any, prop: any, value: any) {
    target[prop] = value;

    if (prop === 'fractal') {
      localStorage.setItem('fractal', JSON.stringify(value));
    }

    if (prop === 'complex') {
      localStorage.setItem('params', JSON.stringify(value));
    }

    if (prop === 'showAxis') {
      localStorage.setItem('showAxis', JSON.stringify(value));
    }

    if (prop === 'method') {
      localStorage.setItem('method', JSON.stringify(value));
    }

    if (prop === 'colors') {
      localStorage.setItem('colors', JSON.stringify(value));
    }

    if (prop === 'zoomLevels') {
      localStorage.setItem('zoomLevels', JSON.stringify(value));
    }

    if (prop === 'limits') {
      localStorage.setItem('limits', JSON.stringify(value));
    }

    return true;
  },
};
