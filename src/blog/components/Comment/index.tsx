import {useEffect, useRef} from 'react';

import {CssProp, systemCss} from '@shared';
import {UtterancAttributes} from '@src/blog';

export interface CommentProps {
  attributes: UtterancAttributes;
}

const Comment: React.FC<CommentProps> = ({attributes, ...props}) => {
  const isSendRef = useRef<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSendRef.current || !containerRef.current) {
      return;
    }
    const utterances = document.createElement('script');
    Object.entries(attributes).forEach(([key, value]) => {
      utterances.setAttribute(key, value);
    });
    containerRef.current.appendChild(utterances);
    isSendRef.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div css={containerCss} {...props} ref={containerRef} />;
};

export default Comment;

const containerCss: CssProp = systemCss({
  '.utterances': {
    maxWidth: 'none',
    m: 0,
  },
});
