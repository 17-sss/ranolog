export interface MarkdownRendererProps {
  contentHtml: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({contentHtml, ...props}) => {
  return <div dangerouslySetInnerHTML={{__html: contentHtml}} {...props} />;
};

export default MarkdownRenderer;
