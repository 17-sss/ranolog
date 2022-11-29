import {CssProp, systemCss, PostDocument} from '@shared';
import {PostList} from '@src/blog';
import {useMainTemplate, IntroduceBox} from '@src/main';

import bannerImage from '../assets/banner.jpg';

export interface MainTemplateProps {
  recentPosts: PostDocument[];
}

const MainTemplate: React.FC<MainTemplateProps> = ({recentPosts, ...props}) => {
  const {handlePostItemClick} = useMainTemplate();
  return (
    <div css={containerCss} {...props}>
      <IntroduceBox
        title="Hoyoung Son"
        description="Frontend Engineer who create convenient value."
        imageSrc={bannerImage}
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
      fontWeight: 'bold',
      color: theme.colors.gray700,
    },
  });
