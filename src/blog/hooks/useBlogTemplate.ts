import {useMemo} from 'react';

import {Post, useMedia} from '@src/shared';

import {usePagination} from './usePagination';

export const useBlogTemplate = (posts: Post[]) => {
  const {isMobile} = useMedia();
  const {
    pageInfo,
    pageNums,
    currentData: currentPosts,
    handlePageButtonClick,
  } = usePagination<Post[]>({
    data: posts,
    pageUnit: isMobile ? 3 : 5,
  });

  const categories = useMemo(() => {
    const dupCategories = posts.reduce((result, {category}) => {
      const isUndefined = typeof category === 'undefined';
      const isEmptyText = typeof category === 'string' && category === '';
      const isEmptyArray = Array.isArray(category) && category.length === 0;
      if (isUndefined || isEmptyText || isEmptyArray) {
        result.push('미지정');
      } else if (Array.isArray(category)) {
        result.push(...category);
      } else {
        result.push(category);
      }
      return result;
    }, [] as string[]);

    let result: string[] = Array.from(new Set(dupCategories));
    result.sort((a, b) => a.localeCompare(b));
    if (result.includes('미지정')) {
      result = ['미지정', ...result.filter((category) => category !== '미지정')];
    }
    return result;
  }, [posts]);

  return {pageInfo, pageNums, currentPosts, handlePageButtonClick, categories};
};
