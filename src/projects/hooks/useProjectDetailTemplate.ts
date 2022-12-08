import {useCallback} from 'react';

import {useRouter} from 'next/router';

import {ProjectDocument, useDocNav} from '@src/shared';

export const useProjectDetailTemplate = (projectDocs: ProjectDocument[]) => {
  const router = useRouter();

  const {docsNavInfo: projectDocsNavInfo, isExistAnotherDocs: isExistAnotherProjectDocs} =
    useDocNav(projectDocs);

  /** DocNav Button 클릭 (프로젝트 글 이동) */
  const handleProjectNavButtonClick = useCallback(
    async (id: string) => {
      await router.push(`/projects/${id}`);
    },
    [router],
  );

  return {projectDocsNavInfo, isExistAnotherProjectDocs, handleProjectNavButtonClick};
};
