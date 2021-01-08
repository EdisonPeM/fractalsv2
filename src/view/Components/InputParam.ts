import { e } from '../helpers';

export function InputParam(min: number, max: number, defaultValue: number = 0) {
  const range = e('input');
  range.type = 'range';
  range.min = `${min}`;
  range.max = `${max}`;
  range.step = '0.001';
  range.title = '0';
  range.defaultValue = defaultValue.toString();

  return range;
}
