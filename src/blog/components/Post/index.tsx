import {useMemo} from 'react';

import {Code, CssProp, MarkdownRenderer, PostDocument, systemCss} from '@shared';

export interface PostProps {
  postDoc?: PostDocument;
}

const Post: React.FC<PostProps> = ({postDoc, ...props}) => {
  const categories = useMemo(() => {
    const postCategories = postDoc?.category;
    if (!postCategories || (Array.isArray(postCategories) && postCategories.length === 0)) {
      return;
    }
    if (typeof postCategories === 'string') {
      return [postCategories];
    }
    return postCategories;
  }, [postDoc?.category]);

  if (!postDoc) {
    return null;
  }
  return (
    <div css={containerCss} {...props}>
      <div css={infoBoxCss}>
        <p className="subject">{postDoc.subject}</p>
        {categories && (
          <div css={categoryBoxCss}>
            {categories?.map((category, idx) => (
              <Code key={idx} color="gray">
                {category}
              </Code>
            ))}
          </div>
        )}
        <p className="date">{new Date(postDoc.date).toLocaleDateString().replace(/\.$/g, '')}</p>
      </div>
      <MarkdownRenderer css={markdownRendererCss} contentHtml={postDoc.content} />
    </div>
  );
};

export default Post;

const containerCss: CssProp = systemCss({});

const infoBoxCss: CssProp = (theme) =>
  systemCss({
    '& > * + *': {
      mt: '0.5rem',
    },
    '.date': {
      color: theme.colors.gray500,
      fontSize: [theme.fontSizes.p14, null, theme.fontSizes.p16],
    },
    '.subject': {
      fontWeight: 'bold',
      fontSize: [theme.fontSizes.p28, null, theme.fontSizes.p32],
    },
  });
const categoryBoxCss: CssProp = systemCss({
  ml: '-0.125rem',
  '& > *': {
    m: '0.125rem',
    display: 'inline-flex',
  },
});

const markdownRendererCss: CssProp = systemCss({
  py: ['1.5rem', null, '1.5rem'],
});
