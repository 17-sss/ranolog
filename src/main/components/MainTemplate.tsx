import configData from '@root/blog.config';
import {PostList} from '@src/blog';
import {useMainTemplate, IntroduceBox} from '@src/main';
import {CssProp, systemCss, PostDocument} from '@src/shared';

const {main} = configData;

export interface MainTemplateProps {
  recentPosts: PostDocument[];
}

const MainTemplate: React.FC<MainTemplateProps> = ({recentPosts, ...props}) => {
  const {handlePostItemClick} = useMainTemplate();
  return (
    <div css={containerCss} {...props}>
      <IntroduceBox title={main.title} description={main.description} imageSrc={main.imageSrc} />
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
