const breakpointValues = [800, 1136, 1600, 1921];
const breakpoints = breakpointValues.map((value) => `${value}px`);

export const mediaQueriesKeyList = [
  'mobile',
  'tablet',
  'laptop',
  'desktop',
  'largeDesktop',
] as const;
export type MediaQueriesKey = typeof mediaQueriesKeyList[number];

const mediaQueries: {
  [key in MediaQueriesKey]: string;
} = {
  mobile: `@media screen and (max-width: ${breakpointValues[0] - 1}px)`,
  tablet: `@media screen and (min-width: ${breakpointValues[0]}px)`,
  laptop: `@media screen and (min-width: ${breakpointValues[1]}px)`,
  desktop: `@media screen and (min-width: ${breakpointValues[2]}px)`,
  largeDesktop: `@media screen and (min-width: ${breakpointValues[3]}px)`,
};

const fontSizes = {
  p11: '0.6875rem',
  p12: '0.75rem',
  p13: '0.8125rem',
  p14: '0.875rem',
  p16: '1rem',
  p18: '1.125rem',
  p20: '1.25rem',
  p24: '1.5rem',
  p28: '1.75rem',
  p32: '2rem',
  p36: '2.25rem',
  p40: '2.5rem',
  p48: '3rem',
};

const colors = {
  white: '#FFFFFF',
  black: '#000000',
  blue100: '#F0F6FF',
  blue200: '#D1DBFA',
  blue300: '#9CB4FC',
  blue400: '#4C79FF',
  blue500: '#1A2DFF',
  blue600: '#091EAA',
  blue700: '#000966',
  gray50: '#FCFCFD',
  gray100: '#F9FAFB',
  gray200: '#EDEFF2',
  gray300: '#DBDDE1',
  gray400: '#818898',
  gray500: '#5C6370',
  gray600: '#363D49',
  gray700: '#0F1624',
  slate100: '#F3F6FC',
  slate200: '#E0E7F5',
  slate300: '#CFD7E8',
  slate400: '#7585A3',
  slate500: '#525F7A',
  slate600: '#293857',
  slate700: '#132039',
  red100: '#FEF5F7',
  red200: '#FDD8DE',
  red300: '#F76E85',
  red400: '#EE2B4B',
  red500: '#CF1736',
  red600: '#A30F28',
  red700: '#610514',
  teal100: '#EEFCFB',
  teal200: '#CFF7F3',
  teal300: '#96E9E0',
  teal400: '#70DBD1',
  teal500: '#00CCB8',
  teal600: '#00998F',
  teal700: '#024A4A',
  orange500: '#FF8C00',
  yellow500: '#F9D006',
  violet400: '#4D4DFF',
  violet500: '#3333FF',
  violet600: '#0A0AC2',
};

export const theme = {
  breakpointValues,
  breakpoints,
  mediaQueries,
  fontSizes,
  colors,
};

export type ThemeType = typeof theme;
