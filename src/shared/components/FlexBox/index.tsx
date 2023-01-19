import {Attributes, PropsWithChildren, useMemo} from 'react';

import {ResponsiveStyleValue} from '@styled-system/css';
import {Property} from 'csstype';

import {CssProp, systemCss} from '../../system';

export interface FlexBoxProps extends PropsWithChildren {
  display?: ResponsiveStyleValue<Property.Display>;

  width?: ResponsiveStyleValue<Property.Width>;
  height?: ResponsiveStyleValue<Property.Height>;
  alignItems?: ResponsiveStyleValue<Property.AlignItems>;
  justifyContent?: ResponsiveStyleValue<Property.JustifyContent>;
  flexDirection?: ResponsiveStyleValue<Property.FlexDirection>;
  flexWrap?: ResponsiveStyleValue<Property.FlexWrap>;
  flex?: ResponsiveStyleValue<Property.Flex>;
  gap?: ResponsiveStyleValue<Property.Gap>;
  rowGap?: ResponsiveStyleValue<Property.RowGap>;
  columnGap?: ResponsiveStyleValue<Property.ColumnGap>;

  css?: Attributes['css'];
  key?: Attributes['key'];
}

const FlexBox: React.FC<FlexBoxProps> = ({display = 'flex', key, css, children, ...props}) => {
  return (
    <div css={[containerCss({...props, display}), css]} key={key}>
      {children}
    </div>
  );
};

export default FlexBox;

type ContainerCssParams = Omit<FlexBoxProps, 'children'>;
const containerCss: (params: ContainerCssParams) => CssProp = (params) => (theme) =>
  systemCss({...params});
