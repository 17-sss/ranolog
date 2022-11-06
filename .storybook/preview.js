import * as NextImage from 'next/image';
import {RouterContext} from 'next/dist/shared/lib/router-context';

import {defaultDecorator} from './decorators';

const OriginalNextImage = NextImage.default;
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

export const decorators = [defaultDecorator];

export const parameters = {
  layout: 'fullscreen',
  actions: {argTypesRegex: '^on[A-Z].*'},
  nextRouter: {
    Provider: RouterContext.Provider,
    isReady: true,
  },
};
