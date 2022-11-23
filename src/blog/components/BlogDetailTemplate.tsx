import {CssProp, PostDocument, systemCss} from '@shared';

import Post from './Post';

export interface BlogDetailTemplateProps {
  postDoc?: PostDocument;
}

const BlogDetailTemplate: React.FC<BlogDetailTemplateProps> = ({postDoc, ...props}) => {
  return (
    <div css={containerCss} {...props}>
      <Post css={postCss} postDoc={postDoc} />
    </div>
  );
};

export default BlogDetailTemplate;

const containerCss: CssProp = systemCss({});
const postCss: CssProp = systemCss({
  px: [null, '1rem', '2rem'],
});
