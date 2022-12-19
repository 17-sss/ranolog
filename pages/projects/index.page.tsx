import React from 'react';

import {domainName, metadata, siteUrl} from '@root/ranolog.config';
import {getSortedDocuments} from '@src/lib';
import {ProjectTemplate} from '@src/projects';
import {ProjectDocument, SeoHead} from '@src/shared';

export interface ProjectPageProps {
  projectDocs: ProjectDocument[];
}

const ProjectPage: React.FC<ProjectPageProps> = ({projectDocs}) => {
  const currentUrl = `${siteUrl}/projects`;
  return (
    <>
      <SeoHead
        {...metadata}
        title={`Projects | ${domainName}`}
        url={currentUrl}
        canonical={currentUrl}
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
