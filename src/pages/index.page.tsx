import {getSortedDocuments} from '@lib';
import {MainTemplate} from '@src/main';
import {PostDocument} from '@src/shared';

export interface MainPageProps {
  postDocs: PostDocument[];
}

const MainPage: React.FC<MainPageProps> = ({postDocs}) => {
  return <MainTemplate recentPosts={postDocs} />;
};

export default MainPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const postDocs = await getSortedDocuments<PostDocument>({
    subFolderType: 'posts',
    maxDocCount: 3,
  });
  return {
    props: {postDocs},
  };
};
