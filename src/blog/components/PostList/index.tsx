import Image from 'next/image';
import Link from 'next/link';

import {
  systemCss,
  CssProp,
  centerAlignedChildren,
  PostDocument,
  singleLineEllipsis,
  MarkdownRenderer,
} from '@shared';

export interface PostListProps {
  postDocs: PostDocument[];
}

/** 게시물 목록 (without Pagination) */
const PostList: React.FC<PostListProps> = ({postDocs, ...props}) => {
  return (
    <ul {...props}>
      {postDocs.map((postDoc, idx) => {
        const dateText = new Date(postDoc.date).toLocaleDateString().replace(/\.$/g, '');
        return (
          <li key={idx} css={listItemCss}>
            <Link href={`/blog/${postDoc.id}`} passHref legacyBehavior>
              <a css={listItemLinkCss}>
                <div css={itemContentBoxCss}>
                  <p className="subject">{postDoc.subject}</p>
                  <MarkdownRenderer contentHtml={postDoc.content} textOnly />
                  <p className="date">{dateText}</p>
                </div>
                {postDoc.imageSrc && (
                  <div css={itemImageBoxCss}>
                    <Image src={postDoc.imageSrc} alt="post_image" fill />
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

    '& > *': [
      singleLineEllipsis,
      systemCss({
        color: theme.colors.gray700,
        fontSize: [theme.fontSizes.p14, null, theme.fontSizes.p16],
        py: '0.25rem',
      }),
    ],
    '& > * + *': {
      mt: ['0.25rem', null, '0.5rem'],
    },

    '& > .subject': {
      fontSize: [theme.fontSizes.p18, null, theme.fontSizes.p20],
      fontWeight: 'bold',
    },
    '& > .date': {
      color: theme.colors.gray500,
    },
  });
