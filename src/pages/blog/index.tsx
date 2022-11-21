import {getSortedPosts} from '@lib';
import {PageLayout, Post} from '@shared';
import {BlogTemplate} from 'src/blog';

export interface BlogPageProps {
  posts: Post[];
}

const BlogPage: React.FC<BlogPageProps> = ({posts}) => {
  return (
    <PageLayout>
      <BlogTemplate posts={posts} />
    </PageLayout>
  );
};

export default BlogPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const posts = await getSortedPosts();
  return {
    props: {posts},
  };
};
