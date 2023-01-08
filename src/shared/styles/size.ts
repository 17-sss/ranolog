import {CssProp, systemCss} from '../system';

export const commonWidthValues = ['100%', null, '65rem'];
export const commonPxValues = ['1.5rem', null, '3rem'];

/**
 * 공통 width
 */
export const commonWidthCss: CssProp = systemCss({
  width: '100%',
  maxWidth: commonWidthValues,
});
