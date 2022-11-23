import React from 'react';

import {GetStaticPropsContext} from 'next';

import {getDocument, getDocumentIdsForStaticPath} from '@lib';
import {PageLayout, PostDocument} from '@shared';
import {BlogDetailTemplate} from 'src/blog';

export interface BlogDetailPageProps {
  postDoc?: PostDocument;
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({postDoc}) => {
  return (
    <>
      <PageLayout>
        <BlogDetailTemplate postDoc={postDoc} />
      </PageLayout>
    </>
  );
};

export default BlogDetailPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticPaths = async () => {
  const paths = getDocumentIdsForStaticPath('posts');
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps = async ({params}: GetStaticPropsContext<{id: string}>) => {
  if (!params?.id) {
    return;
  }
  const postDoc = await getDocument(params?.id, 'posts');
  return {props: {postDoc}};
};
