import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {configData} from '@root/blog.data';

import IntroduceBox from './index';

const storyDefault = {
  title: 'components/main/IntroduceBox',
  component: IntroduceBox,
} as ComponentMeta<typeof IntroduceBox>;

export default storyDefault;

const Template: ComponentStory<typeof IntroduceBox> = (args) => {
  return <IntroduceBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...configData.mainPage,
};
