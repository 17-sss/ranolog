import {PostList} from '@src/blog';
import {useMainTemplate, IntroduceBox, IntroduceBoxProps} from '@src/main';
import {CssProp, systemCss, PostDocument, centerAlignedChildren} from '@src/shared';

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
        <p className="title">Recent Post</p>
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

const recentPostBoxCss: CssProp = (theme) =>
  systemCss({
    '.title': {
      fontSize: [theme.fontSizes.p24, theme.fontSizes.p28],
      fontWeight: 600,
      color: theme.colors.gray700,
    },
    '& > * + *': {
      mt: '0.5rem',
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
