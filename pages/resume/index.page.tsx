import React from 'react';

import {domainName, metadata} from '@root/blog.data';
import {getDocumentByFileName} from '@src/lib';
import {ResumeTemplate} from '@src/resume';
import {ResumeDocument, SeoHead} from '@src/shared';

export interface ResumePageProps {
  resumeDoc: ResumeDocument;
}

const ResumePage: React.FC<ResumePageProps> = ({resumeDoc}) => {
  return (
    <>
      <SeoHead
        {...metadata}
        title={`Resume | ${domainName}`}
        canonical={`${metadata.canonical}/resume`}
      />
      <ResumeTemplate resumeDoc={resumeDoc} />
    </>
  );
};

export default ResumePage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const resumeDoc = await getDocumentByFileName<ResumeDocument>({fileName: 'resume.mdx'});
  return {
    props: {resumeDoc},
  };
};
