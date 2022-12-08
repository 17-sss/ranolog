import React from 'react';

import {useBlogDetailTemplate, PostDetail, Comments, utterancAttrs} from '@src/blog';
import {CssProp, PostDocument, systemCss, Divider, DocNav} from '@src/shared';

export interface BlogDetailTemplateProps {
  postDoc: PostDocument | null;
  postDocs: PostDocument[];
}

const BlogDetailTemplate: React.FC<BlogDetailTemplateProps> = ({postDoc, postDocs, ...props}) => {
  const {commentsRef, postDocsNavInfo, isExistAnotherPosts, handlePostNavButtonClick} =
    useBlogDetailTemplate(postDocs);
  const currentDoc = postDoc ?? postDocsNavInfo.current;
  if (!currentDoc) {
    return null;
  }

  return (
    <div css={containerCss} {...props}>
      <PostDetail css={postCss} postDoc={currentDoc} />
      {isExistAnotherPosts && (
        <>
          <DocNav
            prevDoc={postDocsNavInfo.prev}
            nextDoc={postDocsNavInfo.next}
            onNavButtonClick={handlePostNavButtonClick}
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
    border: [null, `1px solid ${theme.colors.gray300}`],
    borderRadius: [null, '0.375rem'],
    p: [null, '1.5rem'],
  });
