import React from 'react';

import {getSortedDocuments} from '@lib';
import {BlogTemplate} from '@src/blog';
import {PostDocument} from '@src/shared';

export interface BlogPageProps {
  postDocs: PostDocument[];
}

const BlogPage: React.FC<BlogPageProps> = ({postDocs}) => {
  return <BlogTemplate postDocs={postDocs} />;
};

export default BlogPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const postDocs = await getSortedDocuments<PostDocument>({subFolderType: 'posts'});
  return {
    props: {postDocs},
  };
};
