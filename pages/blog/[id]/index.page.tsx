import React from 'react';

import {GetStaticPropsContext} from 'next';

import {domainName, metadata} from '@root/blog.data';
import {BlogDetailTemplate} from '@src/blog';
import {getDocumentIds, getSortedDocuments} from '@src/lib';
import {PostDocument, SeoHead} from '@src/shared';

export interface BlogDetailPageProps {
  postDoc: PostDocument | null;
  postDocs: PostDocument[];
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({postDoc, postDocs}) => {
  return (
    <>
      <SeoHead
        {...metadata}
        title={postDoc?.subject ? `${postDoc?.subject} | ${domainName}` : metadata.title}
        image={postDoc?.thumbnail ? postDoc?.thumbnail : metadata.image}
        canonical={postDoc?.id ? `${metadata.canonical}/blog/${postDoc.id}` : metadata.canonical}
        description={postDoc?.summary ? postDoc.summary : metadata.description}
      />
      <BlogDetailTemplate postDoc={postDoc} postDocs={postDocs} />
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

export const getStaticProps = async ({params}: GetStaticPropsContext<{id: string}>) => {
  const postDocs = await getSortedDocuments<PostDocument>({subFolderType: 'posts'});
  const postDoc = postDocs.find(({id}) => id === params?.id) ?? null;
  return {
    props: {postDoc, postDocs},
  };
};
