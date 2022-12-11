import React from 'react';

import {metadata, domainName, siteUrl} from '@root/blog.data';
import {BlogTemplate} from '@src/blog';
import {getSortedDocuments} from '@src/lib';
import {PostDocument, SeoHead} from '@src/shared';

export interface BlogPageProps {
  postDocs: PostDocument[];
}

const BlogPage: React.FC<BlogPageProps> = ({postDocs}) => {
  const canonicalUrl = `${siteUrl}/blog`;
  return (
    <>
      <SeoHead
        {...metadata}
        title={`Blog | ${domainName}`}
        url={canonicalUrl}
        canonical={canonicalUrl}
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
