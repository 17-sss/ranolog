import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import Dropdown from '.';

const storyDefault = {
  title: 'components/shared/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

export default storyDefault;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  return <Dropdown {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select Category',
  options: ['미지정', 'JavaScript', 'TypeScript', 'Next.js', 'React'],
  onChange: (data) => console.log(data),
  labelMapper: (value) => {
    if (typeof value === 'object') {
      return;
    }
    return <span>{value}</span>;
  },
};
