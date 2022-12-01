import {createElement} from 'react';

import {CssProp, systemCss} from '../../system';
import {backgroundColors, colorKeys, colors, variantKeys} from './constants';

export type TypographyVariant = typeof variantKeys[number];
export type TypographyColor = typeof colorKeys[number];

interface TypographyInnerProps {
  variant: TypographyVariant;
  color?: TypographyColor;
  backgroundColor?: TypographyColor;
  children?: React.ReactNode;
}
const TypographyInner: React.FC<TypographyInnerProps> = ({variant, children, ...props}) =>
  createElement(variant, props, children);

export type TypographyProps = Partial<TypographyInnerProps>;
const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  backgroundColor,
  color,
  ...props
}) => (
  <TypographyInner
    css={typographyCss({variant, backgroundColor, color})}
    variant={variant}
    {...props}
  />
);

export default Typography;

// STYLES

interface TypographyCssParams {
  variant: TypographyVariant;
  backgroundColor?: TypographyColor;
  color?: TypographyColor;
}
const typographyCss: (params: TypographyCssParams) => CssProp = ({
  variant,
  backgroundColor,
  color,
}) => [
  (theme) => {
    const getFontSize = (variant: TypographyVariant) => {
      switch (variant) {
        case 'h1':
          return [theme.fontSizes.p28, theme.fontSizes.p32];
        case 'h2':
          return [theme.fontSizes.p24, theme.fontSizes.p28];
        case 'h3':
          return [theme.fontSizes.p20, theme.fontSizes.p24];
        case 'h4':
          return [theme.fontSizes.p18, theme.fontSizes.p20];
        case 'h5':
          return [theme.fontSizes.p16, theme.fontSizes.p18];
        default:
          return [theme.fontSizes.p14, theme.fontSizes.p16]; // p, span, h6
      }
    };
    return systemCss({
      fontSize: getFontSize(variant),
    });
  },
  backgroundColor && systemCss({backgroundColor: backgroundColors[backgroundColor]}),
  color && systemCss({color: colors[color]}),
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant) && systemCss({fontWeight: 'bold'}),
  ['p'].includes(variant) && systemCss({py: '0.1875rem'}),
];
