import React from 'react';

import {domainName, metadata} from '@root/blog.data';
import {getSortedDocuments} from '@src/lib';
import {ProjectTemplate} from '@src/project';
import {ProjectDocument, SeoHead} from '@src/shared';

export interface ProjectPageProps {
  projectDocs: ProjectDocument[];
}

const ProjectPage: React.FC<ProjectPageProps> = ({projectDocs}) => {
  return (
    <>
      <SeoHead
        {...metadata}
        title={`Projects | ${domainName}`}
        canonical={`${metadata.canonical}/projects`}
      />
      <ProjectTemplate projectDocs={projectDocs} />
    </>
  );
};

export default ProjectPage;

// FUNCTIONS : NEXT.JS ===============================================
export const getStaticProps = async () => {
  const projectDocs = await getSortedDocuments<ProjectDocument>({subFolderType: 'projects'});
  return {
    props: {projectDocs},
  };
};
