import Image, {StaticImageData} from 'next/image';
import Link from 'next/link';

import {centerAlignedChildren, CssProp, systemCss} from '@shared';

// FIXME: 추후 찐 데이터 넣을 때 검토하기.
interface Post {
  contentId: number;
  subject: string;
  description: string;
  createDate: Date;
  imageSrc?: string | StaticImageData;
}

export interface PostBoxProps {
  title: string;
  posts: Post[];
}

const PostBox: React.FC<PostBoxProps> = ({title, posts, ...props}) => {
  return (
    <div css={containerCss} {...props}>
      <p css={titleCss}>{title}</p>
      <ul>
        {posts.map((post, idx) => {
          return (
            <li key={idx} css={listItemCss}>
              <Link href={`/blog/${post.contentId}`} passHref legacyBehavior>
                <a css={listItemLinkCss}>
                  {post.imageSrc && (
                    <div css={itemImageBoxCss}>
                      <Image src={post.imageSrc} alt="post_image" fill />
                    </div>
                  )}
                  <div css={itemContentBoxCss}>
                    <p className="subject">{post.subject}</p>
                    <p className="summary">{post.description}</p>
                    <p className="date">{post.createDate.toLocaleDateString()}</p>
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

const titleCss: CssProp = (theme) =>
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
