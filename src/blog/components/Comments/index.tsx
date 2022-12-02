import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef} from 'react';

import {UtterancAttributes} from '@src/blog';
import {CssProp, systemCss} from '@src/shared';

export interface CommentsProps {
  attributes: UtterancAttributes;
}

export interface CommentsRef {
  resetScript: () => void;
}

const Comments = forwardRef<CommentsRef, CommentsProps>(({attributes, ...props}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const registerScript = useCallback((aAttributes: UtterancAttributes) => {
    const containerEle = containerRef.current;
    if ((containerEle?.children.length ?? 0) > 0) {
      return;
    }
    const utterances = document.createElement('script');
    Object.entries(aAttributes).forEach(([key, value]) => utterances.setAttribute(key, value));
    containerEle?.appendChild(utterances);
  }, []);

  /** utterances 리셋 후, 다시 설정
   * - 글 상세 페이지에서 글 이동(이전, 다음) 시 사용
   */
  const resetScript = useCallback(() => {
    const commentsEle = containerRef.current?.firstChild;
    if (commentsEle) {
      containerRef.current?.removeChild(commentsEle);
    }
    registerScript(attributes);
  }, [attributes, registerScript]);

  useImperativeHandle(ref, () => ({resetScript}));

  useEffect(() => {
    registerScript(attributes);
  }, [attributes, registerScript]);

  return <div css={containerCss} ref={containerRef} {...props} />;
});

Comments.displayName = 'Comments';
export default Comments;

const containerCss: CssProp = systemCss({
  '.utterances': {
    maxWidth: 'none',
    m: 0,
  },
});
