import {ResumeInfo} from '@src/resume';
import {CssProp, Divider, MarkdownRenderer, ResumeDocument, systemCss} from '@src/shared';

export interface ResumeTemplateProps {
  resumeDoc: ResumeDocument;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({resumeDoc, ...props}) => {
  return (
    <div css={containerCss} {...props}>
      <ResumeInfo
        job={resumeDoc.job}
        name={resumeDoc.name}
        subject={resumeDoc.subject}
        email={resumeDoc.email}
        introduce={resumeDoc.introduce}
      />
      <Divider height="3rem" />
      <MarkdownRenderer content={resumeDoc.content} />
    </div>
  );
};

export default ResumeTemplate;

const containerCss: CssProp = (theme) =>
  systemCss({
    border: `1px solid ${theme.colors.gray300}`,
    borderRadius: '0.375rem',
    p: '1.5rem',
  });
