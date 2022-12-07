import {getDocumentByFileName} from '@src/lib';
import {ResumeTemplate} from '@src/resume';
import {ResumeDocument} from '@src/shared';

export interface ResumePageProps {
  resumeDoc: ResumeDocument;
}

const ResumePage: React.FC<ResumePageProps> = ({resumeDoc}) => {
  return <ResumeTemplate resumeDoc={resumeDoc} />;
};

export default ResumePage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const resumeDoc = await getDocumentByFileName<ResumeDocument>({fileName: 'resume.mdx'});
  return {
    props: {resumeDoc},
  };
};
