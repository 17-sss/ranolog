import {getSortedDocuments} from '@lib';
import {PageLayout, PostDocument} from '@shared';
import {BlogTemplate} from 'src/blog';

export interface BlogPageProps {
  postDocs: PostDocument[];
}

const BlogPage: React.FC<BlogPageProps> = ({postDocs}) => {
  return (
    <PageLayout>
      <BlogTemplate postDocs={postDocs} />
    </PageLayout>
  );
};

export default BlogPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const postDocs = await getSortedDocuments('posts');
  return {
    props: {postDocs},
  };
};
