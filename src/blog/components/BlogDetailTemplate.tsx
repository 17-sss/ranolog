import React from 'react';

import {useBlogDetailTemplate, Post, PostNav, Comments, utterancAttrs} from '@src/blog';
import {CssProp, PostDocument, systemCss, Divider} from '@src/shared';

export interface BlogDetailTemplateProps {
  postDocs: PostDocument[];
}

const BlogDetailTemplate: React.FC<BlogDetailTemplateProps> = ({postDocs, ...props}) => {
  const {commentsRef, postDocsInfo, isExistAnotherPosts, handleNavButtonClick} =
    useBlogDetailTemplate(postDocs);
  const postDoc = postDocsInfo.current;
  if (!postDoc) {
    return null;
  }
  return (
    <div css={containerCss} {...props}>
      <Post css={postCss} postDoc={postDoc} />
      {isExistAnotherPosts && (
        <>
          <PostNav
            prevDocInfo={postDocsInfo.prev}
            nextDocInfo={postDocsInfo.next}
            onNavButtonClick={handleNavButtonClick}
          />
          <Divider />
        </>
      )}
      <Comments ref={commentsRef} attributes={utterancAttrs} />
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
