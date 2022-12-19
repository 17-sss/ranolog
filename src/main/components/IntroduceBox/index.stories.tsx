import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {staticDataInfo} from '@root/ranolog.config';

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
Default.args = {...staticDataInfo.pages.main.introduce};
