import Image from 'next/image';
import Link from 'next/link';

import {centerAlignedChildren, CssProp, Post, systemCss} from '@shared';

export interface PostListProps {
  posts: Post[];
}

/** 게시물 목록 (without Pagination) */
const PostList: React.FC<PostListProps> = ({posts, ...props}) => {
  return (
    <ul {...props}>
      {posts.map((post, idx) => {
        const dateText = new Date(post.date).toLocaleDateString().replace(/\.$/g, '');
        return (
          <li key={idx} css={listItemCss}>
            <Link href={`/blog/${post.id}`} passHref legacyBehavior>
              <a css={listItemLinkCss}>
                <div css={itemContentBoxCss}>
                  <p className="subject">{post.subject}</p>
                  <p className="summary">{post.content}</p>
                  <p className="date">{dateText}</p>
                </div>
                {post.imageSrc && (
                  <div css={itemImageBoxCss}>
                    <Image src={post.imageSrc} alt="post_image" fill />
                  </div>
                )}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;

const listItemCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      width: '100%',
      flexDirection: 'column',
      minHeight: '10.5rem',
      borderBottom: `1px solid ${theme.colors.gray200}`,
      '&:hover': {
        borderBottom: `1px solid transparent`,
        boxShadow: `0 3px 15px rgb(0 0 0 / 20%)`,
      },
    }),
];
const listItemLinkCss: CssProp = [
  (theme) =>
    systemCss({
      display: 'flex',
      width: '100%',
      maxHeight: '8rem',

      py: ['0.75rem', null, '1rem'],

      '& > * + *': {ml: '1rem'},
      '& > *:first-of-type': {
        // itemImageBox or itemContentBox
        flexGrow: 3,
        flexBasis: 3,
        pl: ['0.5rem', null, '1rem'],
      },
      '& > *:last-of-type': {
        // itemImageBox
        flexGrow: 1,
        flexBasis: 1,
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
