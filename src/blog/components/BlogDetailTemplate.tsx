import {CssProp, PostDocument, systemCss} from '@shared';
import {useBlogDetail, Post, PostNav} from '@src/blog';

export interface BlogDetailTemplateProps {
  postDocs: PostDocument[];
}

const BlogDetailTemplate: React.FC<BlogDetailTemplateProps> = ({postDocs, ...props}) => {
  const {postDocsInfo} = useBlogDetail(postDocs);
  const postDoc = postDocsInfo.current;
  if (!postDoc) {
    return null;
  }

  return (
    <div css={containerCss} {...props}>
      <Post css={postCss} postDoc={postDoc} />
      <PostNav nextDoc={postDocsInfo.next} prevDoc={postDocsInfo.prev} />
      {/* 댓글 컴포넌트 */}
    </div>
  );
};

export default BlogDetailTemplate;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: '1rem',
  },
});
const postCss: CssProp = (theme) =>
  systemCss({
    border: `1px solid ${theme.colors.gray300}`,
    borderRadius: '0.375rem',
    p: '1.5rem',
  });
