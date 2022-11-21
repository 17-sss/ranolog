import {GetStaticPropsContext} from 'next';

import {getPost, getPostIdsForStaticPath} from '@lib';
import {PageLayout, Post} from '@shared';

export interface BlogContentPageProps {
  post?: Post;
}

const BlogContentPage: React.FC<BlogContentPageProps> = ({post}) => {
  return <PageLayout></PageLayout>;
};

export default BlogContentPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticPaths = async () => {
  const paths = getPostIdsForStaticPath();
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async ({params}: GetStaticPropsContext<{id: string}>) => {
  if (!params?.id) {
    return;
  }
  const post = await getPost(params?.id);
  return {props: {post}};
};
