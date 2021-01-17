import { e } from '../helpers';

export function InputParam(min: number, max: number, defaultValue: number = 0) {
  const range = e('input');
  range.type = 'range';
  range.min = `${min}`;
  range.max = `${max}`;
  range.step = ((max - min) / 1000).toString();
  range.title = defaultValue.toString();
  range.defaultValue = defaultValue.toString();

  return range;
}
