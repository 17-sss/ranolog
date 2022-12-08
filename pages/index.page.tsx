import React from 'react';

import {metadata} from '@root/blog.data';
import {getSortedDocuments} from '@src/lib';
import {MainTemplate} from '@src/main';
import {PostDocument, SeoHead} from '@src/shared';

export interface MainPageProps {
  postDocs: PostDocument[];
}

const MainPage: React.FC<MainPageProps> = ({postDocs}) => {
  return (
    <>
      <SeoHead {...metadata} />
      <MainTemplate recentPosts={postDocs} />
    </>
  );
};

export default MainPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const postDocs = await getSortedDocuments<PostDocument>({
    subFolderType: 'posts',
    maxDocCount: 3,
  });
  return {
    props: {postDocs},
  };
};
