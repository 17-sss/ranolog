import React from 'react';

import {domainName, metadata, siteUrl, staticDataInfo} from '@root/ranolog.config';
import {getDocumentByFileName} from '@src/lib';
import {ResumeTemplate} from '@src/resume';
import {ResumeDocument, SeoHead} from '@src/shared';

const {resume: resumeStaticData} = staticDataInfo.pages;

export interface ResumePageProps {
  resumeDoc: ResumeDocument | null;
}

const ResumePage: React.FC<ResumePageProps> = ({resumeDoc}) => {
  const canonicalUrl = `${siteUrl}/resume`;
  return (
    <>
      <SeoHead
        {...metadata}
        title={`Resume | ${domainName}`}
        url={canonicalUrl}
        canonical={canonicalUrl}
      />
      <ResumeTemplate resumeDoc={resumeDoc} />
    </>
  );
};

export default ResumePage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const resumeDoc = await getDocumentByFileName<ResumeDocument>({
    subFolderType: 'resumes',
    fileName: resumeStaticData.resumeFileName,
  });
  return {
    props: {resumeDoc},
  };
};
