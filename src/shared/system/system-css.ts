import {Interpolation} from '@emotion/react';
import css from '@styled-system/css';

import {ThemeType} from '../theme';

export const systemCss = (styles: Parameters<typeof css>[0]): Interpolation<ThemeType> =>
  css(styles) as Interpolation<ThemeType>;
