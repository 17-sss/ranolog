import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {debounce} from '@src/shared';

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
  onInputKeyUp: debounce({
    func: (e?: React.KeyboardEvent<HTMLInputElement>) => {
      if (!e || !(e.target instanceof HTMLInputElement)) {
        return;
      }
      console.log('currentValue (debounce):', e.target.value);
    },
  }),
};
