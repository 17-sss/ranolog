import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import CustomCode from '.';
import {systemCss, CssProp} from '../../system';

const storyDefault = {
  title: 'components/shared/CustomCode',
  component: CustomCode,
} as ComponentMeta<typeof CustomCode>;

export default storyDefault;

const Template: ComponentStory<typeof CustomCode> = ({children, ...args}) => {
  const currentChildren = children || 'CustomCode';
  return (
    <div css={containerCss}>
      <CustomCode {...args}>{currentChildren}</CustomCode>
      <CustomCode {...args} isBold>
        {currentChildren}
      </CustomCode>
    </div>
  );
};

const containerCss: CssProp = systemCss({
  p: '0.5rem',
  '& > * + *': {
    ml: '0.25rem',
  },
});

// --

export const Default_Red = Template.bind({});
Default_Red.args = {children: 'CustomCode', color: 'red'};

export const Blue = Template.bind({});
Blue.args = {children: 'CustomCode', color: 'blue'};

export const Brown = Template.bind({});
Brown.args = {children: 'CustomCode', color: 'brown'};

export const Green = Template.bind({});
Green.args = {children: 'CustomCode', color: 'green'};

export const Orange = Template.bind({});
Orange.args = {children: 'CustomCode', color: 'orange'};

export const Pink = Template.bind({});
Pink.args = {children: 'CustomCode', color: 'pink'};

export const Purple = Template.bind({});
Purple.args = {children: 'CustomCode', color: 'purple'};

export const Gray = Template.bind({});
Gray.args = {children: 'CustomCode', color: 'gray'};

export const Yellow = Template.bind({});
Yellow.args = {children: 'CustomCode', color: 'yellow'};
