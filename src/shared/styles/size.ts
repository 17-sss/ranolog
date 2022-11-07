import {CssProp, systemCss} from '../system';

export const commonWidthValue = ['100%', null, '75rem', '100rem'];
export const commonPxValue = ['1.5rem', '3rem', '3rem', '4rem'];

/**
 * 공통 width
 */
export const commonWidthCss: CssProp = systemCss({
  width: '100%',
  maxWidth: commonWidthValue,
  px: commonPxValue,
});
