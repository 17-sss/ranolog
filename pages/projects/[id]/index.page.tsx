import React from 'react';

import {GetStaticPropsContext} from 'next';

import {domainName, metadata, siteUrl} from '@root/ranolog.config';
import {getDocumentIds, getSortedDocuments} from '@src/lib';
import {ProjectDetailTemplate} from '@src/projects';
import {ProjectDocument, SeoHead} from '@src/shared';

export interface ProjectDetailPageProps {
  projectDoc: ProjectDocument | null;
  projectDocs: ProjectDocument[];
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({projectDoc, projectDocs}) => {
  const currentUrl = projectDoc?.id ? `${siteUrl}/projects/${projectDoc.id}` : siteUrl;
  return (
    <>
      <SeoHead
        {...metadata}
        title={projectDoc?.subject ? `${projectDoc?.subject} | ${domainName}` : metadata.title}
        image={projectDoc?.thumbnail ? projectDoc?.thumbnail : metadata.image}
        description={projectDoc?.summary ? projectDoc.summary : metadata.description}
        url={currentUrl}
        canonical={currentUrl}
      />
      <ProjectDetailTemplate projectDoc={projectDoc} projectDocs={projectDocs} />
    </>
  );
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

export const getStaticProps = async ({params}: GetStaticPropsContext<{id: string}>) => {
  const sortedProjects = await getSortedDocuments<ProjectDocument>({subFolderType: 'projects'});
  const projectsExcludeContent = sortedProjects.map(({content, ...projectDoc}) =>
    projectDoc.id === params?.id ? {content, ...projectDoc} : projectDoc,
  );
  const projectDoc = projectsExcludeContent.find(({id}) => id === params?.id) ?? null;
  return {
    props: {projectDoc, projectDocs: projectsExcludeContent},
  };
};
