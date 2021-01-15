import { METHODS } from '@Constants';

export function absComplex(z: complex): number {
  return z.real * z.real + z.img * z.img;
}

export function square(z: complex, c: complex): complex {
  const square_real = z.real * z.real - z.img * z.img;
  const square_img = 2 * z.real * z.img;

  return {
    real: square_real + c.real,
    img: square_img + c.img,
  };
}

export function cubic(z: complex, c: complex): complex {
  const cubic_real = z.real * z.real * z.real - 3 * z.real * z.img * z.img;
  const cubic_imag = 3 * z.real * z.real * z.img - z.img * z.img * z.img;

  return {
    real: cubic_real + c.real,
    img: cubic_imag + c.img,
  };
}

export function four(z: complex, c: complex): complex {
  const four_real =
    z.real * z.real * z.real * z.real +
    z.img * z.img * z.img * z.img -
    6 * (z.real * z.real) * (z.img * z.img);
  const four_imag =
    4 * (z.real * z.real * z.real) * z.img - 4 * z.real * z.img * z.img * z.img;

  return {
    real: four_real + c.real,
    img: four_imag + c.img,
  };
}

export function tricorn(z: complex, c: complex): complex {
  const tricorn_real = z.real * z.real - z.img * z.img;
  const tricorn_imag = -2 * z.real * z.img;

  return {
    real: tricorn_real + c.real,
    img: tricorn_imag + c.img,
  };
}

export function ship(z: complex, c: complex): complex {
  const abs_real = Math.abs(z.real);
  const abs_img = Math.abs(z.img);

  const ship_real = abs_real * abs_real - abs_img * abs_img;
  const ship_imag = 2 * abs_real * abs_img;

  return {
    real: ship_real + c.real,
    img: ship_imag + c.img,
  };
}

export const FORMULAS = {
  [METHODS.SQUARE]: square,
  [METHODS.CUBIC]: cubic,
  [METHODS.FOUR]: four,
  [METHODS.TRICORN]: tricorn,
  // [METHODS.SHIP]: ship,
};
