import {RouterContext} from 'next/dist/shared/lib/router-context';

import {defaultDecorator} from './utils';

import '../public/fonts/index.css';

export const decorators = [defaultDecorator];

export const parameters = {
  layout: 'fullscreen',
  actions: {argTypesRegex: '^on[A-Z].*'},
  nextRouter: {
    Provider: RouterContext.Provider,
    isReady: true,
  },
};
