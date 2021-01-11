import { normalizeHex } from 'gradient-generator-ui';
import { myGen } from '@View/Elements/modal';

export const defaultColors = myGen.generateColors();

export function getColors(colors: string[]): colorRGB[] {
  return colors.map(hexToRGb);
}

function hexToRGb(hex: string): colorRGB {
  return {
    red: parseInt(normalizeHex(hex).substring(0, 2), 16),
    green: parseInt(normalizeHex(hex).substring(2, 4), 16),
    blue: parseInt(normalizeHex(hex).substring(4, 6), 16),
  };
}
