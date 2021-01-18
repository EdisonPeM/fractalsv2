import { normalizeHex } from 'gradient-generator-ui';

let fractalColors: colorRGB[] = [];
export function setFractalColors(colors: string[]) {
  fractalColors = colors.map(hexToRGb);
}

export function getFractalColors(): colorRGB[] {
  return fractalColors;
}

function hexToRGb(hex: string): colorRGB {
  return {
    red: parseInt(normalizeHex(hex).substring(0, 2), 16),
    green: parseInt(normalizeHex(hex).substring(2, 4), 16),
    blue: parseInt(normalizeHex(hex).substring(4, 6), 16),
  };
}
