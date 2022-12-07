import {useMemo} from 'react';

import {createDateText} from '@src/blog';
import {CustomCode, CssProp, MarkdownRenderer, PostDocument, systemCss} from '@src/shared';

export interface PostDetailProps {
  postDoc: PostDocument;
}

const PostDetail: React.FC<PostDetailProps> = ({postDoc, ...props}) => {
  const categories = useMemo(() => {
    const postCategories = postDoc.category;
    if (!postCategories || (Array.isArray(postCategories) && postCategories.length === 0)) {
      return;
    }
    if (typeof postCategories === 'string') {
      return [postCategories];
    }
    return postCategories;
  }, [postDoc.category]);

  const date = useMemo(() => {
    return createDateText(postDoc.date);
  }, [postDoc.date]);

  return (
    <div css={containerCss} {...props}>
      <div css={infoBoxCss}>
        <p className="subject">{postDoc.subject}</p>
        {categories && (
          <div css={categoryBoxCss}>
            {categories?.map((category, idx) => (
              <CustomCode key={idx} color="gray">
                {category}
              </CustomCode>
            ))}
          </div>
        )}
        {date && <p className="date">{date}</p>}
      </div>
      <MarkdownRenderer css={markdownRendererCss} content={postDoc.content} />
    </div>
  );
};

export default PostDetail;

const containerCss: CssProp = systemCss({});

const infoBoxCss: CssProp = (theme) =>
  systemCss({
    '& > * + *': {
      mt: '0.5rem',
    },
    '.date': {
      color: theme.colors.gray500,
      fontSize: [theme.fontSizes.p14, theme.fontSizes.p16],
    },
    '.subject': {
      fontWeight: 600,
      fontSize: [theme.fontSizes.p28, theme.fontSizes.p32],
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
  py: '1.5rem',
});
