import React, {useCallback, useState} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {debounce, systemCss} from '@src/shared';

import SearchBar from './index';

const storyDefault = {
  title: 'components/blog/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

export default storyDefault;

const Template: ComponentStory<typeof SearchBar> = (args) => {
  const [currentValue, setCurrentValue] = useState<string>();
  const handleInputKeyUp = useCallback((e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e || !(e.target instanceof HTMLInputElement)) {
      return;
    }
    setCurrentValue(e.target.value);
  }, []);

  return (
    <div>
      <SearchBar {...args} onInputKeyUp={debounce({func: handleInputKeyUp})} />
      <p css={systemCss({mt: '0.5rem'})}>currentValue (debounce): {currentValue}</p>
    </div>
  );
};

export const Default = Template.bind({});
