import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {staticDataInfo} from '@root/ranolog.config';

import Header from '.';

const storyDefault = {
  title: 'components/shared/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

export default storyDefault;

const Template: ComponentStory<typeof Header> = (args) => {
  return <Header {...args} />;
};

export const Default = Template.bind({});
Default.args = {...staticDataInfo.layout.header};
