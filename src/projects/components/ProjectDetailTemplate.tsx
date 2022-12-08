import {ProjectInfo, useProjectDetailTemplate} from '@src/projects';
import {CssProp, Divider, DocNav, MarkdownRenderer, ProjectDocument, systemCss} from '@src/shared';

export interface ProjectDetailTemplateProps {
  projectDoc: ProjectDocument | null;
  projectDocs: ProjectDocument[];
}

const ProjectDetailTemplate: React.FC<ProjectDetailTemplateProps> = ({
  projectDoc,
  projectDocs,
  ...props
}) => {
  const {projectDocsNavInfo, isExistAnotherProjectDocs, handleProjectNavButtonClick} =
    useProjectDetailTemplate(projectDocs);
  const currentDoc = projectDoc ?? projectDocsNavInfo.current;

  if (!currentDoc) {
    return null;
  }
  return (
    <div css={containerCss} {...props}>
      <div css={detailCss}>
        <ProjectInfo
          category={currentDoc.category}
          date={currentDoc.date}
          subject={currentDoc.subject}
          links={currentDoc.links}
          skills={currentDoc.skills}
          summary={currentDoc.summary}
          thumbnail={currentDoc.thumbnail}
        />
        <Divider css={dividerCss} />
        <MarkdownRenderer css={markdownRendererCss} content={currentDoc.content} />
      </div>
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
    border: [null, `1px solid ${theme.colors.gray300}`],
    borderRadius: [null, '0.375rem'],
    p: [null, '1.5rem'],
  });

const dividerCss: CssProp = systemCss({
  py: '2rem',
});

const markdownRendererCss: CssProp = systemCss({
  pb: '1.5rem',
});
