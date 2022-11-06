import React from 'react';

import {ThemeProvider} from '@emotion/react';
import {GlobalStyles, theme} from '../src/shared';

export const defaultDecorator = (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  );
};
