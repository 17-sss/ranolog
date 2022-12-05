import {getSortedDocuments} from '@src/lib';
import {ProjectTemplate} from '@src/project';
import {ProjectDocument} from '@src/shared';

export interface ProjectPageProps {
  projectDocs: ProjectDocument[];
}

const ProjectPage: React.FC<ProjectPageProps> = ({projectDocs}) => {
  return <ProjectTemplate projectDocs={projectDocs} />;
};

export default ProjectPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const projectDocs = await getSortedDocuments<ProjectDocument>({subFolderType: 'projects'});
  return {
    props: {projectDocs},
  };
};
