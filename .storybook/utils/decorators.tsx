import React from 'react';

import {StoryFn} from '@storybook/react';
import {ThemeProvider} from '@emotion/react';
import {GlobalStyles, theme} from '../../src/shared';

export const defaultDecorator = (Story: StoryFn) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  );
};
