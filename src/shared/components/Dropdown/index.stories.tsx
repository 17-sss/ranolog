import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import Dropdown from '.';

const storyDefault = {
  title: 'components/shared/Dropdown',
  component: Dropdown,
  argTypes: {ref: {control: false}, options: {control: false}, defaultValue: {control: false}},
} as ComponentMeta<typeof Dropdown>;

export default storyDefault;

const Template: ComponentStory<typeof Dropdown> = (args) => {
  return <Dropdown {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select Category',
  options: Array.from({length: 10}, (_, i) => `Option ${i + 1}`),
  onChange: (data) => console.log(data),
  labelMapper: (value) => {
    if (typeof value === 'object') {
      return;
    }
    return <span>{value}</span>;
  },
};
