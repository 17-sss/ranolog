import React from 'react';

import {GetStaticPropsContext} from 'next';

import {domainName, metadata} from '@root/blog.data';
import {getDocumentIds, getSortedDocuments} from '@src/lib';
import {ProjectDetailTemplate} from '@src/projects';
import {ProjectDocument, SeoHead} from '@src/shared';

export interface ProjectDetailPageProps {
  projectDoc: ProjectDocument | null;
  projectDocs: ProjectDocument[];
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({projectDoc, projectDocs}) => {
  return (
    <>
      <SeoHead
        {...metadata}
        title={projectDoc?.subject ? `${projectDoc?.subject} | ${domainName}` : metadata.title}
        image={projectDoc?.thumbnail ? projectDoc?.thumbnail : metadata.image}
        canonical={
          projectDoc?.id ? `${metadata.canonical}/projects/${projectDoc.id}` : metadata.canonical
        }
        description={projectDoc?.summary ? projectDoc.summary : metadata.description}
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
  const projectDocs = await getSortedDocuments<ProjectDocument>({subFolderType: 'projects'});
  const projectDoc = projectDocs.find(({id}) => id === params?.id) ?? null;
  return {
    props: {projectDoc, projectDocs},
  };
};
