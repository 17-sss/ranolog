import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import Divider from '.';
import {systemCss} from '../../system';

const storyDefault = {
  title: 'components/shared/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <div css={systemCss({pt: '1rem'})}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Divider>;

export default storyDefault;

const Template: ComponentStory<typeof Divider> = (args) => {
  return <Divider {...args} />;
};

export const Default = Template.bind({});
Default.args = {};

export const WithText = Template.bind({});
WithText.args = {children: 'I am Divider'};
