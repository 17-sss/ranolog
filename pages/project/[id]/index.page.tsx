import {getDocumentIds, getSortedDocuments} from '@src/lib';
import {ProjectDetailTemplate} from '@src/project';
import {ProjectDocument} from '@src/shared';

export interface ProjectDetailPageProps {
  projectDocs: ProjectDocument[];
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({projectDocs}) => {
  return <ProjectDetailTemplate projectDocs={projectDocs} />;
};

export default ProjectDetailPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticPaths = async () => {
  const documentIds = await getDocumentIds('projects');
  const paths = documentIds.map((id) => ({params: {id}}));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async () => {
  const projectDocs = await getSortedDocuments<ProjectDocument>({subFolderType: 'projects'});
  return {
    props: {projectDocs},
  };
};
