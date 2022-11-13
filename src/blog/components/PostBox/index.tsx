import Image from 'next/image';
import Link from 'next/link';

import {centerAlignedChildren, CssProp, Post, systemCss} from '@shared';

export interface PostBoxProps {
  categoryName: string;
  posts: Post[];
}

const PostBox: React.FC<PostBoxProps> = ({categoryName, posts = [], ...props}) => {
  return (
    <div css={containerCss} {...props}>
      {categoryName && <p css={categoryNameCss}>{categoryName}</p>}
      <ul>
        {posts.map((post, idx) => {
          const dateText = new Date(post.date).toLocaleDateString().replace(/\.$/g, '');
          return (
            <li key={idx} css={listItemCss}>
              <Link href={`/blog/${post.id}`} passHref legacyBehavior>
                <a css={listItemLinkCss}>
                  {post.imageSrc && (
                    <div css={itemImageBoxCss}>
                      <Image src={post.imageSrc} alt="post_image" fill />
                    </div>
                  )}
                  <div css={itemContentBoxCss}>
                    <p className="subject">{post.subject}</p>
                    <p className="summary">{post.content}</p>
                    <p className="date">{dateText}</p>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostBox;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: ['1rem', null, '1.5rem'],
  },
});

const categoryNameCss: CssProp = (theme) =>
  systemCss({
    fontSize: [theme.fontSizes.p20, null, theme.fontSizes.p24],
    color: theme.colors.gray700,
  });

const listItemCss: CssProp = [
  centerAlignedChildren,
  systemCss({
    width: '100%',
    flexDirection: 'column',
  }),
];
const listItemLinkCss: CssProp = [
  (theme) =>
    systemCss({
      display: 'flex',
      width: '100%',
      maxHeight: '8rem',

      pt: ['0.75rem', null, '1rem'],
      pb: ['1.5rem', null, '2rem'],

      borderBottom: `1px solid ${theme.colors.gray200}`,
      '&:hover': {
        borderBottom: `1px solid transparent`,
        boxShadow: `0 3px 15px rgb(0 0 0 / 20%)`,
      },

      '& > * + *': {ml: '1rem'},
      '& > *:first-of-type': {
        // itemImageBox
        flexGrow: 1,
        flexBasis: 1,
        pl: ['0.5rem', null, '1rem'],
      },
      '& > *:last-of-type': {
        // itemImageBox or itemContentBox
        flexGrow: 3,
        flexBasis: 3,
        pr: ['0.5rem', null, '1rem'],
      },
    }),
];
const itemImageBoxCss: CssProp = systemCss({
  position: 'relative',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  img: {objectFit: 'cover'},
});
const itemContentBoxCss: CssProp = (theme) =>
  systemCss({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: 0,

    p: {
      color: theme.colors.gray700,
      fontSize: [theme.fontSizes.p14, null, theme.fontSizes.p16],
      py: '0.25rem',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& > .subject': {
      fontSize: [theme.fontSizes.p18, null, theme.fontSizes.p20],
      fontWeight: 'bold',
    },
    '& > .summary': {},
    '& > .date': {
      color: theme.colors.gray500,
    },
    '& > * + *': {
      mt: ['0.25rem', null, '0.5rem'],
    },
  });
