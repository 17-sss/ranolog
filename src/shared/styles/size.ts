import {CssProp, systemCss} from '../system';

export const commonWidthValue = ['100%', null, '75rem'];
export const commonPxValue = ['1.5rem', null, '3rem'];

/**
 * 공통 width
 */
export const commonWidthCss: CssProp = systemCss({
  width: '100%',
  maxWidth: commonWidthValue,
  px: commonPxValue,
});
