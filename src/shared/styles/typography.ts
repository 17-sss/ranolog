import {CssProp, systemCss} from '../system';

/** 프로젝트 기본 Font-Famiily */
export const defaultFontFamily = `Pretendard, 'Noto Sans KR', sans-serif`;

/**
 * 한 줄 말줄임 (...)
 * - ex) 가나다라마바사...
 */
export const singleLineEllipsis: CssProp = systemCss({
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
});

/**
 * 다수 줄 말줄임
 * - ex) 가나다라마바사... (다수!)
 */
export const multilineEllipsis = (lineCount: number = 2) =>
  systemCss({
    display: '-webkit-box',
    ['WebkitBoxOrient' as string]: 'vertical',
    WebkitLineClamp: lineCount,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  });
