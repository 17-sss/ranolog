import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import Code from '.';
import {systemCss, CssProp} from '../../system';

const storyDefault = {
  title: 'components/shared/Code',
  component: Code,
} as ComponentMeta<typeof Code>;

export default storyDefault;

const Template: ComponentStory<typeof Code> = ({children, ...args}) => {
  const currentChildren = children ?? 'Code';
  return (
    <div css={containerCss}>
      <Code {...args}>{currentChildren}</Code>
      <Code {...args} isBold>
        {currentChildren}
      </Code>
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
Default_Red.args = {color: 'red'};

export const Blue = Template.bind({});
Blue.args = {color: 'blue'};

export const Brown = Template.bind({});
Brown.args = {color: 'brown'};

export const Green = Template.bind({});
Green.args = {color: 'green'};

export const Orange = Template.bind({});
Orange.args = {color: 'orange'};

export const Pink = Template.bind({});
Pink.args = {color: 'pink'};

export const Purple = Template.bind({});
Purple.args = {color: 'purple'};

export const Gray = Template.bind({});
Gray.args = {color: 'gray'};

export const Yellow = Template.bind({});
Yellow.args = {color: 'yellow'};
