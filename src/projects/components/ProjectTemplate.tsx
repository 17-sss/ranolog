import {ProjectList} from '@src/projects';
import {centerAlignedChildren, CssProp, ProjectDocument, systemCss} from '@src/shared';

export interface ProjectTemplateProps {
  projectDocs: ProjectDocument[];
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({projectDocs, ...props}) => {
  if (projectDocs.length === 0) {
    return <div css={emptyBoxCss}>No Projects</div>;
  }
  return (
    <div css={containerCss} {...props}>
      <ProjectList projectDocs={projectDocs} />
    </div>
  );
};

export default ProjectTemplate;

const containerCss: CssProp = systemCss({});
const emptyBoxCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      color: theme.colors.gray600,
      fontWeight: 600,
      height: '100%',
    }),
];
