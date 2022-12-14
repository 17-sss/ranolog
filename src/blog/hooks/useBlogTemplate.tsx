import {PostDocument, useMedia} from '@src/shared';

import {useCategory} from './useCategory';
import {usePagination} from './usePagination';
import {usePostList} from './usePostList';
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
  const {registerSearchInput, handleSearchKeyUp, searchPostDocs} = useSearchPosts(
    selectedCategoryPosts,
    selectedCategory,
  );

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

  // POSTLIST =======================================================
  const {isEmpty, handlePostItemClick} = usePostList(searchPostDocs);

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

    isEmpty,
    handlePostItemClick,
  };
};
