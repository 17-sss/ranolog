import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import bannerImage from '../../assets/banner.jpg';
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
  title: 'Hoyoung Son',
  description: 'Frontend Engineer who create convenient value.',
  imageSrc: bannerImage,
};
