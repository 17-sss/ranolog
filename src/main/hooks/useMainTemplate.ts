import {useCallback} from 'react';

import {useRouter} from 'next/router';

export const useMainTemplate = () => {
  const router = useRouter();
  const handlePostItemClick = useCallback(
    (id: string) => {
      router.push(`/blog/${id}`);
    },
    [router],
  );

  return {handlePostItemClick};
};
