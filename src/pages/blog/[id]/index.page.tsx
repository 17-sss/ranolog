import React from 'react';

import {getDocumentIds, getSortedDocuments} from '@lib';
import {PostDocument} from '@shared';
import {BlogDetailTemplate} from 'src/blog';

export interface BlogDetailPageProps {
  postDocs: PostDocument[];
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({postDocs}) => {
  return <BlogDetailTemplate postDocs={postDocs} />;
};

export default BlogDetailPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticPaths = async () => {
  const documentIds = await getDocumentIds({subFolderType: 'posts'});
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
