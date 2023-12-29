import React, {useCallback, useState} from 'react';

import {StoryObj, Meta} from '@storybook/react';

import {debounce, systemCss} from '@src/shared';

import SearchBar, {SearchBarProps} from './index';

const meta: Meta<typeof SearchBar> = {
  title: 'components/blog/SearchBar',
  component: SearchBar,
};
export default meta;

// ------

type Story = StoryObj<typeof SearchBar>;
const SearchBarWithHooks: React.FC<SearchBarProps> = (args) => {
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

export const Default: Story = {
  render: (args) => <SearchBarWithHooks {...args} />,
};
