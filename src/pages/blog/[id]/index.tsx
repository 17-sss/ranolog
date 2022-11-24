import React from 'react';

import {getDocumentIds, getSortedDocuments} from '@lib';
import {PageLayout, PostDocument} from '@shared';
import {BlogDetailTemplate} from 'src/blog';

export interface BlogDetailPageProps {
  postDocs: PostDocument[];
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({postDocs}) => {
  return (
    <>
      <PageLayout>
        <BlogDetailTemplate postDocs={postDocs} />
      </PageLayout>
    </>
  );
};

export default BlogDetailPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticPaths = async () => {
  const documentIds = await getDocumentIds('posts');
  const paths = documentIds.map((id) => ({params: {id}}));
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async () => {
  const postDocs = await getSortedDocuments<PostDocument>('posts');
  return {
    props: {postDocs},
  };
};
