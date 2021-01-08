import { e } from '../helpers';
import { Button } from '../Components/Button';

export const mandelbrotBtn = Button('Dibujar Conjunto de Mandelbrot');
export const juliaBtn = Button('Dibujar Conjunto de Julia');

export const runBtns = e('div');
runBtns.append(mandelbrotBtn);
runBtns.append(juliaBtn);
