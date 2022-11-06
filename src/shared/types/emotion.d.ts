import {CssProp} from '../system';
import {ThemeType} from '../theme';

declare module '@emotion/react' {
  interface Theme extends ThemeType {}
}

declare module 'react' {
  interface Attributes {
    css?: CssProp;
  }
}
