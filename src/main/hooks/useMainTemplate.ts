import {useCallback, useMemo} from 'react';

import {useRouter} from 'next/router';

import {PostDocument} from '@src/shared';

export const useMainTemplate = (postDocs: PostDocument[]) => {
  const router = useRouter();

  const isEmpty = useMemo(() => postDocs.length === 0, [postDocs]);

  const handlePostItemClick = useCallback(
    (id: string) => {
      router.push(`/blog/${id}`);
    },
    [router],
  );

  return {isEmpty, handlePostItemClick};
};
