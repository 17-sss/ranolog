import {CssProp, ProjectDocument, systemCss} from '@src/shared';

export interface ProjectTemplateProps {
  projectDocs: ProjectDocument[];
}

const ProjectTemplate: React.FC<ProjectTemplateProps> = ({projectDocs, ...props}) => {
  return <div css={containerCss} {...props}></div>;
};

export default ProjectTemplate;

const containerCss: CssProp = systemCss({});
