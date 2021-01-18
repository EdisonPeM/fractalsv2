import { e } from '../helpers';
import { Button } from '../Components/Button';

export const mandelbrotBtn = Button('Dibujar Conjunto de Mandelbrot');
export const juliaBtn = Button('Dibujar Conjunto de Julia');

export const btnsContainer = e('div');
btnsContainer.append(mandelbrotBtn);
btnsContainer.append(juliaBtn);
