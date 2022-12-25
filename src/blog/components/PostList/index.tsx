import Image from 'next/image';

import {createPostDateText} from '@src/blog';
import {
  systemCss,
  CssProp,
  centerAlignedChildren,
  PostDocument,
  singleLineEllipsis,
  commonBlurDataURL,
} from '@src/shared';

export interface PostListProps {
  postDocs: PostDocument[];
  onPostClick: (id: string) => void;
}

/** 게시물 목록 (without Pagination) */
const PostList: React.FC<PostListProps> = ({postDocs, onPostClick, ...props}) => {
  return (
    <ul {...props}>
      {postDocs.map((postDoc, idx) => {
        const dateText = createPostDateText(postDoc.date);
        return (
          <li key={idx} css={listItemCss}>
            <button css={itemButtonCss} onClick={() => onPostClick(postDoc.id)}>
              <div css={itemButtonInnerCss}>
                <div css={contentBoxCss}>
                  <p className="subject">{postDoc.subject}</p>
                  {postDoc.summary && <p className="summary">{postDoc.summary}</p>}
                  {dateText && <p className="date">{dateText}</p>}
                </div>
                {postDoc.thumbnail && (
                  <div css={imageBoxCss}>
                    <Image
                      src={postDoc.thumbnail}
                      alt={`${postDoc.subject} (image)`}
                      fill
                      priority
                      placeholder="blur"
                      blurDataURL={commonBlurDataURL}
                    />
                  </div>
                )}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default PostList;

const ITEM_HEIGHT = '10rem';
const listItemCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      height: `${ITEM_HEIGHT}`,
      borderBottom: `1px solid ${theme.colors.gray200}`,
      '@media (hover: hover) and (pointer: fine)': {
        '&:hover': {
          borderBottom: `1px solid transparent`,
          boxShadow: `0 3px 15px rgb(0 0 0 / 20%)`,
        },
      },
    }),
];

const itemButtonCss: CssProp = systemCss({
  width: '100%',
  height: '100%',
  textAlign: 'start',
  boxSizing: 'content-box',
  letterSpacing: 'inherit',
});
const itemButtonInnerCss: CssProp = systemCss({
  display: 'flex',
  alignItems: 'center',
  px: '1rem',

  '& > * + *': {ml: '1rem'},
  '& > *:first-of-type': {
    flexGrow: 3,
    flexBasis: 3,
  },
  '& > *:last-of-type': {
    flexGrow: 1,
    flexBasis: 1,
  },
});

const imageBoxCss: CssProp = systemCss({
  maxHeight: `calc(${ITEM_HEIGHT} - (${ITEM_HEIGHT} * 0.1))`,

  position: 'relative',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  img: {objectFit: 'contain'},
});

const contentBoxCss: CssProp = (theme) =>
  systemCss({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: 0,

    '& > *': [
      singleLineEllipsis,
      systemCss({
        color: theme.colors.gray700,
        fontSize: [theme.fontSizes.p14, theme.fontSizes.p16],
        py: '0.25rem',
      }),
    ],
    '& > * + *': {
      mt: ['0.25rem', null, '0.5rem'],
    },

    '& > .subject': {
      fontSize: [theme.fontSizes.p18, theme.fontSizes.p20],
      fontWeight: 600,
    },
    '& > .date': {
      color: theme.colors.gray500,
    },
  });
