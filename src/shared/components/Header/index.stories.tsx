import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {staticDataInfo} from '@root/ranolog.config';

import Header from './index';

const storyDefault = {
  title: 'components/shared/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

export default storyDefault;

const Template: ComponentStory<typeof Header> = (args) => {
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  linkNames: ['home', 'blog', 'projects', 'resume'],
  profileImage: staticDataInfo.layout.header.profileImage,
};
