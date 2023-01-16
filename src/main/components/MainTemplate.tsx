import {FiChevronRight} from 'react-icons/fi';

import {PostList} from '@src/blog';
import {useMainTemplate, IntroduceBox, IntroduceBoxProps} from '@src/main';
import {CssProp, systemCss, PostDocument, centerAlignedChildren, CustomLink} from '@src/shared';

export interface MainTemplateProps {
  recentPosts: PostDocument[];
  introduceProps: IntroduceBoxProps;
}

const MainTemplate: React.FC<MainTemplateProps> = ({recentPosts, introduceProps, ...props}) => {
  const {isEmpty, handlePostItemClick} = useMainTemplate(recentPosts);
  return (
    <div css={containerCss} {...props}>
      <IntroduceBox {...introduceProps} />
      <div css={recentPostBoxCss}>
        <CustomLink css={recentPostLinkCss} href="/blog">
          <span>Recent Post</span>
          <FiChevronRight />
        </CustomLink>

        {!isEmpty ? (
          <PostList postDocs={recentPosts} onPostClick={handlePostItemClick} />
        ) : (
          <div css={emptyBoxCss}>No Posts</div>
        )}
      </div>
    </div>
  );
};

export default MainTemplate;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: '3rem',
  },
});

const recentPostBoxCss: CssProp = systemCss({
  '& > * + *': {
    mt: '0.5rem',
  },
});

const recentPostLinkCss: CssProp = (theme) =>
  systemCss({
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: [theme.fontSizes.p24, theme.fontSizes.p28],
    fontWeight: 600,
    color: theme.colors.gray700,
    '@media (hover: hover) and (pointer: fine)': {
      '&:hover': {
        color: theme.colors.gray400,
      },
    },
  });

const emptyBoxCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      minHeight: '10rem',
      fontWeight: 600,
      color: theme.colors.gray600,
      border: `1px solid ${theme.colors.gray300}`,
    }),
];
