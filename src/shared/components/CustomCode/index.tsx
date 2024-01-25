import {PropsWithChildren} from 'react';

import {CssProp, systemCss} from '../../system';
import {theme} from '../../theme';

export const colorNames = [
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

export type ColorNames = (typeof colorNames)[number] | keyof typeof theme.colors;

export interface CustomCodeProps extends PropsWithChildren {
  color?: ColorNames;
  isBold?: boolean;
}

const CustomCode: React.FC<CustomCodeProps> = ({color, isBold, children, ...props}) => {
  return (
    <code css={[codeCss, colorCss(color), isBold && boldCss]} {...props}>
      {children}
    </code>
  );
};

export default CustomCode;

// STYLES
const codeCss: CssProp = systemCss({
  backgroundColor: 'rgba(135, 131, 120, 0.15)',
  borderRadius: '0.1875rem',
  fontSize: '90%',
  p: '0.25rem', // 0.25rem 0.45rem
});

const colorCss = (color?: ColorNames) => {
  const colorInfo = {
    ...theme.colors,
    gray: `rgba(120, 119, 116, 1)`,
    brown: `rgba(159, 107, 83, 1)`,
    orange: `rgba(217, 115, 13, 1)`,
    yellow: `rgba(203, 145, 47, 1)`,
    green: `rgba(68, 131, 97, 1)`,
    blue: `rgba(51, 126, 169, 1)`,
    purple: `rgba(144, 101, 176, 1)`,
    pink: `rgba(193, 76, 138, 1)`,
    red: `rgba(212, 76, 71, 1)`,
  };
  return systemCss({
    color: `${colorInfo[color ?? 'red']} !important`,
  });
};

const boldCss: CssProp = systemCss({
  fontWeight: 600,
});
