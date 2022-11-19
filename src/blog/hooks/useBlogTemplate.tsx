import {useMemo} from 'react';

import {Post, useMedia} from '@src/shared';

import {useCategory} from './useCategory';
import {usePagination} from './usePagination';
import {useSearchPosts} from './useSearchPosts';

export const useBlogTemplate = (posts: Post[]) => {
  // CATEGORY (DROPDOWN) =======================================================
  const {
    selctedCategory,
    selectedCategoryPosts,
    categoryInfo,
    categoryLabelMapper,
    handleCategoryDropdownChange,
  } = useCategory(posts);

  // SERACHBAR =======================================================
  const {registerSearchInput, handleSearchKeyUp, handleSearchButtonClick, searchPosts} =
    useSearchPosts(selectedCategoryPosts, selctedCategory);

  // PAGINATION =======================================================
  const {isMobile} = useMedia();
  const {
    pageInfo,
    pageNums,
    currentData: currentPosts,
    handlePageButtonClick,
  } = usePagination<Post[]>({
    data: searchPosts,
    pageUnit: isMobile ? 3 : 5,
  });

  // -----------------------------
  const isEmpty = useMemo(() => searchPosts.length === 0, [searchPosts]);

  return {
    pageInfo,
    pageNums,
    currentPosts,
    handlePageButtonClick,

    categoryInfo,
    categoryLabelMapper,
    handleCategoryDropdownChange,

    registerSearchInput,
    handleSearchKeyUp,
    handleSearchButtonClick,

    isEmpty,
  };
};
