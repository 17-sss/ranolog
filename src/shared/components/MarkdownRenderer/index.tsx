import {useCallback} from 'react';

export interface MarkdownRendererProps {
  contentHtml: string;
  textOnly?: boolean;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({contentHtml, textOnly, ...props}) => {
  const registerTextCotnent = useCallback(
    (ele?: HTMLDivElement | null) => {
      if (!ele || !textOnly) {
        return;
      }
      ele.innerHTML = ele.textContent ?? '';
    },
    [textOnly],
  );
  return (
    <div ref={registerTextCotnent} dangerouslySetInnerHTML={{__html: contentHtml}} {...props} />
  );
};

export default MarkdownRenderer;
