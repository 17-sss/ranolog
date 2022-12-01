import React from 'react';

import {getDocumentIds, getSortedDocuments} from '@lib';
import {BlogDetailTemplate} from '@src/blog';
import {PostDocument} from '@src/shared';

export interface BlogDetailPageProps {
  postDocs: PostDocument[];
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({postDocs}) => {
  return <BlogDetailTemplate postDocs={postDocs} />;
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
  const postDocs = await getSortedDocuments<PostDocument>({subFolderType: 'posts'});
  return {
    props: {postDocs},
  };
};
