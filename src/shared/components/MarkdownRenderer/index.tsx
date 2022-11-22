import {Fragment, useCallback, useState} from 'react';

import {CssProp, systemCss} from '../../system';

export interface MarkdownRendererProps {
  contentHtml: string;
  textOnly?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({contentHtml, textOnly, ...props}) => {
  const [textContent, setTextContent] = useState<string | null>(null);
  const registerTextCotnent = useCallback(
    (ele?: HTMLDivElement | null) => {
      if (!ele || !textOnly) {
        return;
      }
      setTextContent(ele.textContent);
    },
    [textOnly],
  );

  if (textContent) {
    return <div {...props}>{textContent}</div>;
  }

  return (
    <div
      css={textOnly && hideCss}
      ref={registerTextCotnent}
      dangerouslySetInnerHTML={{__html: contentHtml}}
      {...props}
    />
  );
};

export default MarkdownRenderer;

const hideCss: CssProp = systemCss({
  display: 'none',
});
