import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import configData from '@root/blog.config';

import Header from '.';

const storyDefault = {
  title: 'components/shared/Header',
  component: Header,
  parameters: {controls: {disable: true}},
} as ComponentMeta<typeof Header>;

export default storyDefault;

const Template: ComponentStory<typeof Header> = (args) => {
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = {...configData.header};
