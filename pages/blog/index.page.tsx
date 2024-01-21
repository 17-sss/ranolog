import React from 'react';

import {metadata, domainName, siteUrl} from '@root/ranolog.config';
import {BlogTemplate} from '@src/blog';
import {getSortedDocuments} from '@src/lib';
import {PostDocument, SeoHead} from '@src/shared';

export interface BlogPageProps {
  postDocs: PostDocument[];
}

const BlogPage: React.FC<BlogPageProps> = ({postDocs}) => {
  const currentUrl = `${siteUrl}/blog`;
  return (
    <>
      <SeoHead
        {...metadata}
        title={`Blog | ${domainName}`}
        url={currentUrl}
        canonical={currentUrl}
      />
      <BlogTemplate postDocs={postDocs} />
    </>
  );
};

export default BlogPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const sortedPosts = await getSortedDocuments<PostDocument>({subFolderType: 'posts'});
  const postsExcludeContent = sortedPosts.map(({content: _, ...postDoc}) => postDoc);
  return {
    props: {postDocs: postsExcludeContent},
  };
};
