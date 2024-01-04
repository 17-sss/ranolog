import type {Parameters, Preview} from '@storybook/react';

import {defaultDecorator} from './utils';

import '../public/fonts/index.css';

const parameters: Parameters = {
  layout: 'fullscreen',
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const decorators = [defaultDecorator];

const preview: Preview = {parameters, decorators};

export default preview;
