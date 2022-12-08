import React from 'react';

import {metadata, domainName} from '@root/blog.data';
import {BlogTemplate} from '@src/blog';
import {getSortedDocuments} from '@src/lib';
import {PostDocument, SeoHead} from '@src/shared';

export interface BlogPageProps {
  postDocs: PostDocument[];
}

const BlogPage: React.FC<BlogPageProps> = ({postDocs}) => {
  return (
    <>
      <SeoHead
        {...metadata}
        title={`Blog | ${domainName}`}
        canonical={`${metadata.canonical}/blog`}
      />
      <BlogTemplate postDocs={postDocs} />
    </>
  );
};

export default BlogPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const postDocs = await getSortedDocuments<PostDocument>({subFolderType: 'posts'});
  return {
    props: {postDocs},
  };
};
