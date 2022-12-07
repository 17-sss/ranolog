import {theme} from '../../theme';

export const variantKeys = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
export const colorKeys = [
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
] as const;

export const backgroundColors = {
  ...theme.colors,
  gray: 'rgb(241, 241, 239)',
  brown: 'rgb(244, 238, 238)',
  orange: 'rgb(251, 236, 221)',
  yellow: 'rgb(251, 243, 219)',
  green: 'rgb(237, 243, 236)',
  blue: 'rgb(231, 243, 248)',
  purple: 'rgba(244, 240, 247, 0.8)',
  pink: 'rgba(249, 238, 243, 0.8)',
  red: 'rgb(253, 235, 236)',
};

export const colors = {
  ...theme.colors,
  gray: 'rgb(120, 119, 116)',
  brown: 'rgb(159, 107, 83)',
  orange: 'rgb(217, 115, 13)',
  yellow: 'rgb(203, 145, 47)',
  green: 'rgb(68, 131, 97)',
  blue: 'rgb(51, 126, 169)',
  purple: 'rgb(144, 101, 176)',
  pink: 'rgb(193, 76, 138)',
  red: 'rgb(212, 76, 71)',
};
