import {configData} from '@root/blog.data';
import {PostList} from '@src/blog';
import {useMainTemplate, IntroduceBox} from '@src/main';
import {CssProp, systemCss, PostDocument} from '@src/shared';

const {mainPage} = configData;

export interface MainTemplateProps {
  recentPosts: PostDocument[];
}

const MainTemplate: React.FC<MainTemplateProps> = ({recentPosts, ...props}) => {
  const {handlePostItemClick} = useMainTemplate();
  return (
    <div css={containerCss} {...props}>
      <IntroduceBox
        title={mainPage.title}
        description={mainPage.description}
        bannerImage={mainPage.bannerImage}
      />
      <div css={recentPostBoxCss}>
        <p className="title">Recent Post</p>
        <PostList postDocs={recentPosts} onPostClick={handlePostItemClick} />
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
