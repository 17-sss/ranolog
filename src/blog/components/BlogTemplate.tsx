import React from 'react';

import {centerAlignedChildren, CssProp, PostDocument, systemCss, Dropdown} from '@shared';
import {useBlogTemplate, PostList, Pagination, SearchBar, CategoryInfoTuple} from '@src/blog';

export interface BlogTemplateProps {
  postDocs: PostDocument[];
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({postDocs, ...props}) => {
  const {
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
  } = useBlogTemplate(postDocs);

  return (
    <div css={containerCss} {...props}>
      <div css={topBoxCss}>
        <SearchBar
          css={searchBarCss}
          registerInput={registerSearchInput}
          onInputKeyUp={handleSearchKeyUp}
        />
        <Dropdown<CategoryInfoTuple>
          ref={categoryDropdownRef}
          css={dropdownCss}
          defaultValue={categoryInfo[0]}
          placeholder="Select Category"
          options={categoryInfo}
          labelMapper={categoryLabelMapper}
          onChange={handleCategoryDropdownChange}
        />
      </div>

      {!isEmpty ? (
        <>
          <PostList postDocs={currentPostDocs} onPostClick={handlePostItemClick} />
          <Pagination
            css={paginationCss}
            pageInfo={pageInfo}
            pageNums={pageNums}
            handlePageButtonClick={handlePageButtonClick}
          />
        </>
      ) : (
        <div css={emptyTextCss}>No Posts</div>
      )}
    </div>
  );
};

export default BlogTemplate;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: '1.5rem',
  },
});

const emptyTextCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      py: '2rem',
      minHeight: '10rem',
      color: theme.colors.gray400,
    }),
];

// TOPBOX
const topBoxCss: CssProp = systemCss({
  display: 'flex',
  flexDirection: ['column-reverse', 'row'],
  alignItems: ['normal', 'center'],
  justifyContent: 'space-between',
  gap: '1rem',
});

const searchBarCss: CssProp = systemCss({
  height: 'calc(3rem - 0.125rem)',
  flexGrow: 1,
});

const dropdownCss: CssProp = systemCss({
  height: '3rem',
  width: ['100%', '30%'],
});

// PAGINATION
const paginationCss: CssProp = [centerAlignedChildren];
