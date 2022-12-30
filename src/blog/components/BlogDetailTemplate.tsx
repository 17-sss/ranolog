import React from 'react';

import {rgba} from 'polished';

import {utterancAttrs} from '@root/ranolog.config';
import {useBlogDetailTemplate, PostDetail, ContentsIdList} from '@src/blog';
import {
  CssProp,
  PostDocument,
  systemCss,
  Divider,
  DocNav,
  Comments,
  MarkdownRenderer,
  absoluteOnParent,
} from '@src/shared';

export interface BlogDetailTemplateProps {
  postDoc: PostDocument | null;
  postDocs: PostDocument[];
}

const BlogDetailTemplate: React.FC<BlogDetailTemplateProps> = ({postDoc, postDocs, ...props}) => {
  const {
    isDesktop,
    commentsRef,
    postDocsNavInfo,
    isExistAnotherPosts,
    handlePostNavButtonClick,
    contentsIds,
    registerContentsIds,
  } = useBlogDetailTemplate(postDocs);

  const currentDoc = postDoc ?? postDocsNavInfo.current;
  if (!currentDoc) {
    return null;
  }

  return (
    <div css={containerCss} {...props}>
      <PostDetail
        css={postCss}
        postDoc={currentDoc}
        markdownRenderer={
          <MarkdownRenderer
            ref={registerContentsIds}
            css={markdownRendererCss}
            content={currentDoc.content}
          />
        }
      />
      {isDesktop && (
        <div css={contentsIdOuterBoxCss}>
          <div css={contentsIdInnerBoxCss}>
            <ContentsIdList contentsIds={contentsIds} />
          </div>
        </div>
      )}
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
  position: 'relative',
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

const markdownRendererCss: CssProp = systemCss({
  py: '1.5rem',
});

const contentsIdOuterBoxCss: CssProp = absoluteOnParent({top: '1rem', right: '-1.25rem'});
const contentsIdInnerBoxCss: CssProp = (theme) =>
  systemCss({
    fontSize: theme.fontSizes.p15,
    position: 'fixed',
    py: '0.5rem',
    pr: '1rem',
    backgroundColor: rgba(theme.colors.gray50, 0.5),
    borderLeft: `0.25rem solid ${theme.colors.gray200}`,
  });
