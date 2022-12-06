import {ProjectDetail, useProjectDetailTemplate} from '@src/project';
import {CssProp, DocNav, ProjectDocument, systemCss} from '@src/shared';

export interface ProjectDetailTemplateProps {
  projectDocs: ProjectDocument[];
}

const ProjectDetailTemplate: React.FC<ProjectDetailTemplateProps> = ({projectDocs, ...props}) => {
  const {projectDocsNavInfo, isExistAnotherProjectDocs, handleProjectNavButtonClick} =
    useProjectDetailTemplate(projectDocs);
  const projectDoc = projectDocsNavInfo.current;
  if (!projectDoc) {
    return null;
  }
  return (
    <div css={containerCss} {...props}>
      <ProjectDetail css={detailCss} projectDoc={projectDoc} />
      {isExistAnotherProjectDocs && (
        <DocNav
          prevDoc={projectDocsNavInfo.prev}
          nextDoc={projectDocsNavInfo.next}
          onNavButtonClick={handleProjectNavButtonClick}
        />
      )}
    </div>
  );
};

export default ProjectDetailTemplate;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: '1.25rem',
  },
});

const detailCss: CssProp = (theme) =>
  systemCss({
    border: `1px solid ${theme.colors.gray300}`,
    borderRadius: '0.375rem',
    p: '1.5rem',
  });
