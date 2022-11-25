import {useMemo} from 'react';

import {PostDocument, useMedia} from '@shared';

import {useCategory} from './useCategory';
import {usePagination} from './usePagination';
import {useSearchPosts} from './useSearchPosts';

export const useBlogTemplate = (postDocs: PostDocument[]) => {
  // CATEGORY (DROPDOWN) =======================================================
  const {
    categoryDropdownRef,
    selectedCategory,
    selectedCategoryPosts,
    categoryInfo,
    categoryLabelMapper,
    handleCategoryDropdownChange,
  } = useCategory(postDocs);

  // SERACHBAR =======================================================
  const {registerSearchInput, handleSearchKeyUp, handleSearchButtonClick, searchPostDocs} =
    useSearchPosts(selectedCategoryPosts, selectedCategory);

  // PAGINATION =======================================================
  const {isMobile} = useMedia();
  const {
    pageInfo,
    pageNums,
    currentData: currentPostDocs,
    handlePageButtonClick,
  } = usePagination<PostDocument[]>({
    data: searchPostDocs,
    pageUnit: isMobile ? 3 : 5,
  });

  // -----------------------------
  const isEmpty = useMemo(() => searchPostDocs.length === 0, [searchPostDocs]);

  return {
    pageInfo,
    pageNums,
    currentPostDocs,
    handlePageButtonClick,

    categoryDropdownRef,
    categoryInfo,
    categoryLabelMapper,
    handleCategoryDropdownChange,

    registerSearchInput,
    handleSearchKeyUp,
    handleSearchButtonClick,

    isEmpty,
  };
};
