import {useMemo} from 'react';

import {createPostDateText} from '@src/blog';
import {CustomCode, CssProp, systemCss, PostDocument} from '@src/shared';

export interface PostDetailProps extends Pick<PostDocument, 'subject' | 'date' | 'category'> {
  markdownRenderer: React.ReactNode;
}

const PostDetail: React.FC<PostDetailProps> = ({
  subject,
  date,
  category,
  markdownRenderer,
  ...props
}) => {
  const categories = useMemo(() => {
    if (!category || (Array.isArray(category) && category.length === 0)) {
      return;
    }
    if (typeof category === 'string') {
      return [category];
    }
    return category;
  }, [category]);

  const dateText = useMemo(() => {
    return createPostDateText(date);
  }, [date]);

  return (
    <div css={containerCss} {...props}>
      <div css={infoBoxCss}>
        <p className="subject">{subject}</p>
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
