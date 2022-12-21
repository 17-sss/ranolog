import {ResumeInfo} from '@src/resume';
import {
  centerAlignedChildren,
  CssProp,
  Divider,
  MarkdownRenderer,
  ResumeDocument,
  systemCss,
} from '@src/shared';

export interface ResumeTemplateProps {
  resumeDoc: ResumeDocument | null;
}

const ResumeTemplate: React.FC<ResumeTemplateProps> = ({resumeDoc, ...props}) => {
  if (!resumeDoc) {
    return <div css={emptyBoxCss}>No Resume</div>;
  }
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
    border: [null, `1px solid ${theme.colors.gray300}`],
    borderRadius: [null, '0.375rem'],
    p: [null, '1.5rem'],
  });
const emptyBoxCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      color: theme.colors.gray600,
      fontWeight: 600,
      height: '100%',
    }),
];
