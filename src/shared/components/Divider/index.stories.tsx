import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import Divider from '.';
import {systemCss} from '../../system';

const storyDefault = {
  title: 'components/shared/Divider',
  component: Divider,
} as ComponentMeta<typeof Divider>;

export default storyDefault;

const Template: ComponentStory<typeof Divider> = (args) => {
  return (
    <div css={systemCss({py: '1rem'})}>
      <Divider {...args} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
