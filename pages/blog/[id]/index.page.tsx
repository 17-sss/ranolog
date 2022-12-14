import React from 'react';

import {GetStaticPropsContext} from 'next';

import {domainName, metadata, siteUrl} from '@root/blog.data';
import {BlogDetailTemplate} from '@src/blog';
import {getDocumentIds, getSortedDocuments} from '@src/lib';
import {PostDocument, SeoHead} from '@src/shared';

export interface BlogDetailPageProps {
  postDoc: PostDocument | null;
  postDocs: PostDocument[];
}

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({postDoc, postDocs}) => {
  const canonicalUrl = postDoc?.id ? `${siteUrl}/blog/${postDoc.id}` : siteUrl;
  return (
    <>
      <SeoHead
        {...metadata}
        title={postDoc?.subject ? `${postDoc?.subject} | ${domainName}` : metadata.title}
        image={postDoc?.thumbnail ? postDoc?.thumbnail.src : metadata.image}
        description={postDoc?.summary ? postDoc.summary : metadata.description}
        url={canonicalUrl}
        canonical={canonicalUrl}
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
