import React from 'react';

import {metadata, staticDataInfo} from '@root/ranolog.config';
import {getSortedDocuments} from '@src/lib';
import {MainTemplate} from '@src/main';
import {PostDocument, SeoHead} from '@src/shared';

const {main: mainStaticData} = staticDataInfo.pages;

export interface MainPageProps {
  postDocs: PostDocument[];
}

const MainPage: React.FC<MainPageProps> = ({postDocs}) => {
  return (
    <>
      <SeoHead {...metadata} />
      <MainTemplate recentPosts={postDocs} introduceProps={mainStaticData.introduce} />
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
