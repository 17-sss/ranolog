import React, {useState, useCallback, forwardRef, PropsWithChildren} from 'react';

import {CssProp, systemCss} from '../../system';
import {theme} from '../../theme';
import {backgroundColors, colorKeys, colors, variantKeys} from './constants';

const isHeading = (text: string) => /^h\d/.test(text);

export type TypographyVariant = typeof variantKeys[number];
export type TypographyColor = typeof colorKeys[number] | keyof typeof theme.colors;

export interface TypographyProps extends PropsWithChildren {
  id?: string;
  variant?: TypographyVariant;
  color?: TypographyColor;
  backgroundColor?: TypographyColor;
  isBold?: boolean;
  isItalic?: boolean;
  fontSize?: keyof typeof theme.fontSizes;
  useHeadingId?: boolean;
}
const Typography: React.FC<TypographyProps> = ({
  id,
  variant = 'span',
  backgroundColor,
  color,
  isBold,
  isItalic,
  fontSize,
  useHeadingId = false,
  ...props
}) => {
  const Component = variant as React.ElementType;

  const [headingId, setHeadingId] = useState<string>();
  const registerHeadingId = useCallback(
    (ele?: HTMLElement | null) => {
      if (!ele || !useHeadingId || !isHeading(variant)) return;
      setHeadingId(ele.innerText.replace(/\s+/g, '-'));
    },
    [useHeadingId, variant],
  );
  return (
    <Component
      ref={registerHeadingId}
      id={id ?? headingId}
      css={typographyCss({variant, backgroundColor, color, isBold, isItalic, fontSize})}
      variant={variant}
      {...props}
    />
  );
};

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
  (isHeading(variant) || isBold) && systemCss({fontWeight: 600}),
  isItalic && systemCss({fontStyle: 'italic'}),
  ['p'].includes(variant) && systemCss({py: '0.1875rem'}),
];
