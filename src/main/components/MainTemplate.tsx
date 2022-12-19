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
          <div css={emptyTextCss}>No Posts</div>
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
    '& > * + *': {
      mt: '0.5rem',
    },
    '.title': {
      fontSize: [theme.fontSizes.p24, theme.fontSizes.p28],
      fontWeight: 600,
      color: theme.colors.gray700,
    },
  });

const emptyTextCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      py: '2rem',
      minHeight: '10rem',
      color: theme.colors.gray400,
    }),
];
