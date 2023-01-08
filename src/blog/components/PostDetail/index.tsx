import {useMemo} from 'react';

import {createPostDateText} from '@src/blog';
import {CustomCode, CssProp, PostDocument, systemCss} from '@src/shared';

export interface PostDetailProps {
  postDoc: PostDocument;
  markdownRenderer: React.ReactNode;
}

const PostDetail: React.FC<PostDetailProps> = ({postDoc, markdownRenderer, ...props}) => {
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

  const dateText = useMemo(() => {
    return createPostDateText(postDoc.date);
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
        {dateText && <p className="date">{dateText}</p>}
      </div>
      {markdownRenderer}
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
