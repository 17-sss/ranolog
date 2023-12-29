import React from 'react';

import {StoryObj, Meta} from '@storybook/react';

import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'components/shared/Dropdown',
  component: Dropdown,
  argTypes: {ref: {control: false}, options: {control: false}, defaultValue: {control: false}},
};
export default meta;

// ------

type Story = StoryObj<typeof Dropdown>;
export const Default: Story = {
  args: {
    placeholder: 'Select Category',
    options: Array.from({length: 10}, (_, i) => `Option ${i + 1}`),
    onChange: (data) => console.log(data),
    labelMapper: (value) => {
      if (typeof value === 'object') {
        return;
      }
      return <span>{value}</span>;
    },
  },
};
