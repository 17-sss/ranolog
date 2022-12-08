import {Attributes} from 'react';

import {ResponsiveStyleValue} from '@styled-system/css';
import {Property} from 'csstype';

import {CssProp, systemCss} from '../../system';

export interface FlexBoxProps {
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
  children?: React.ReactNode;
}

const FlexBox: React.FC<FlexBoxProps> = ({
  justifyContent = 'center',
  alignItems = 'center',
  key,
  css,
  children,
  ...props
}) => {
  return (
    <div css={[containerCss({...props}), css]} key={key}>
      {children}
    </div>
  );
};

export default FlexBox;

type ContainerCssParams = Omit<FlexBoxProps, 'children'>;
const containerCss: (params: ContainerCssParams) => CssProp = (params) => (theme) =>
  systemCss({...params, display: 'flex'});
