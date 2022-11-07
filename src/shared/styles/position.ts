import {CssProp, systemCss} from '../system';

/**
 * 자식 요소: 중앙 정렬
 */
export const centerAlignedChildren: CssProp = systemCss({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

/**
 * 자식 요소: 양쪽 정렬
 */
export const centerBetweenAlignChildren: CssProp = systemCss({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

type OffsetKey = 'top' | 'right' | 'bottom' | 'left';
export type Offset = {
  [key in OffsetKey]?: string | string[] | number | number[];
};

/**
 * 화면을 기준으로 위치 고정
 */
export const fixedToScreen: (offset?: Offset) => CssProp = (
  offset = {top: 0, left: 0, right: 0, bottom: 0},
) =>
  systemCss({
    position: 'fixed',
    margin: 'auto',
    ...offset,
  });

/**
 * 부모를 기준으로 위치 고정
 */
export const absoluteOnParent: (offset?: Offset) => CssProp = (
  offset = {top: 0, left: 0, right: 0, bottom: 0},
) =>
  systemCss({
    position: 'absolute',
    margin: 'auto',
    ...offset,
  });
