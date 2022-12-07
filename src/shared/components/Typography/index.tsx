import React from 'react';

import {CssProp, systemCss} from '../../system';
import {theme} from '../../theme';
import {backgroundColors, colorKeys, colors, variantKeys} from './constants';

export type TypographyVariant = typeof variantKeys[number];
export type TypographyColor = typeof colorKeys[number];

interface TypographyInnerProps {
  variant: TypographyVariant;
  children?: React.ReactNode;
}
const TypographyInner: React.FC<TypographyInnerProps> = ({variant, children, ...props}) => {
  return React.createElement(variant, props, children);
};

export interface TypographyProps extends Partial<TypographyInnerProps> {
  color?: TypographyColor;
  backgroundColor?: TypographyColor;
  isBold?: boolean;
  isItalic?: boolean;
  fontSize?: keyof typeof theme.fontSizes;
}
const Typography: React.FC<TypographyProps> = ({
  variant = 'span',
  backgroundColor,
  color,
  isBold,
  isItalic,
  fontSize,
  ...props
}) => (
  <TypographyInner
    css={typographyCss({variant, backgroundColor, color, isBold, isItalic, fontSize})}
    variant={variant}
    {...props}
  />
);

export default Typography;

// STYLES
type TypographyCssParams = Omit<TypographyProps, 'children' | 'variant'> & {
  variant: TypographyVariant;
};
const typographyCss: (params: TypographyCssParams) => CssProp = ({
  variant,
  backgroundColor,
  color,
  isBold,
  isItalic,
  fontSize,
}) => [
  (theme) => {
    const getFontSize = (variant: TypographyVariant) => {
      switch (variant) {
        case 'h1':
          return theme.fontSizes.p32;
        case 'h2':
          return theme.fontSizes.p28;
        case 'h3':
          return theme.fontSizes.p24;
        case 'h4':
          return theme.fontSizes.p20;
        case 'h5':
          return theme.fontSizes.p18;
        default:
          return theme.fontSizes.p16; // p, span, h6
      }
    };
    return systemCss({
      fontSize: `${fontSize ? theme.fontSizes[fontSize] : getFontSize(variant)} !important`,
    });
  },
  backgroundColor && systemCss({backgroundColor: backgroundColors[backgroundColor]}),
  color && systemCss({color: colors[color]}),
  (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) || isBold) &&
    systemCss({fontWeight: 'bold'}),
  isItalic && systemCss({fontStyle: 'italic'}),
  ['p'].includes(variant) && systemCss({py: '0.1875rem'}),
];
