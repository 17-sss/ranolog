import {useCallback, useMemo} from 'react';

import {useRouter} from 'next/router';

import {PostDocument} from '@src/shared';

export const usePostList = (postDocs: PostDocument[]) => {
  const router = useRouter();

  const isEmpty = useMemo(() => postDocs.length === 0, [postDocs]);

  const handlePostItemClick = useCallback(
    (id: string) => {
      const category = router.query['category'];
      router.push(`/blog/${id}${category ? `?category=${category}` : ''}`);
    },
    [router],
  );

  return {isEmpty, handlePostItemClick};
};
