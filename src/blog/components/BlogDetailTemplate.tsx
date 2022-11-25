import React from 'react';

import {CssProp, PostDocument, systemCss, Divider} from '@shared';
import {useBlogDetail, Post, PostNav, Comment, utterancAttrs} from '@src/blog';

export interface BlogDetailTemplateProps {
  postDocs: PostDocument[];
}

const BlogDetailTemplate: React.FC<BlogDetailTemplateProps> = ({postDocs, ...props}) => {
  const {postDocsInfo, isExistAnotherPosts} = useBlogDetail(postDocs);
  const postDoc = postDocsInfo.current;
  if (!postDoc) {
    return null;
  }
  return (
    <div css={containerCss} {...props}>
      <Post css={postCss} postDoc={postDoc} />
      {isExistAnotherPosts && (
        <>
          <PostNav nextDoc={postDocsInfo.next} prevDoc={postDocsInfo.prev} />
          <Divider />
        </>
      )}
      <Comment attributes={utterancAttrs} />
    </div>
  );
};

export default BlogDetailTemplate;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: '1.25rem',
  },
});
const postCss: CssProp = (theme) =>
  systemCss({
    border: `1px solid ${theme.colors.gray300}`,
    borderRadius: '0.375rem',
    p: '1.5rem',
  });
