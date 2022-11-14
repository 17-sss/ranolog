import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import SearchBar from './index';

const storyDefault = {
  title: 'components/blog/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

export default storyDefault;

const Template: ComponentStory<typeof SearchBar> = (args) => {
  return <SearchBar {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  onSearch(value) {
    console.log(`SearchBar(onSearch)\n- value: ${value}`);
  },
};
