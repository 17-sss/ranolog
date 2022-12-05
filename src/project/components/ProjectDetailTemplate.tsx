import {CssProp, ProjectDocument, systemCss} from '@src/shared';

export interface ProjectDetailTemplateProps {
  projectDocs: ProjectDocument[];
}

const ProjectDetailTemplate: React.FC<ProjectDetailTemplateProps> = ({projectDocs, ...props}) => {
  return <div css={containerCss} {...props}></div>;
};

export default ProjectDetailTemplate;

const containerCss: CssProp = systemCss({});
