import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import configData from '@root/blog.config';

import Header from '.';

const {links, profileImage} = configData;

const storyDefault = {
  title: 'components/shared/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

export default storyDefault;

const Template: ComponentStory<typeof Header> = (args) => {
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = {links, profileImage};
