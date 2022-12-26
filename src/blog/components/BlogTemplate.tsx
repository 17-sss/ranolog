import React from 'react';

import {useBlogTemplate, PostList, Pagination, SearchBar, CategoryInfoTuple} from '@src/blog';
import {centerAlignedChildren, CssProp, PostDocument, systemCss, Dropdown} from '@src/shared';

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
      <div css={[listBoxCss, !isEmpty && listBoxMarginCss]}>
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
          <div css={emptyBoxCss}>No Posts</div>
        )}
      </div>
    </div>
  );
};

export default BlogTemplate;

const containerCss: CssProp = systemCss({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  '& > * + *': {
    mt: '1.5rem',
  },
});

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

// (POST)LIST BOX
const listBoxCss: CssProp = systemCss({
  flexGrow: 1,
  '& > * + *': {
    mt: '1.5rem',
  },
});
const listBoxMarginCss: CssProp = systemCss({mb: '4rem'});

const paginationCss: CssProp = [centerAlignedChildren];

const emptyBoxCss: CssProp = [
  centerAlignedChildren,
  (theme) =>
    systemCss({
      height: '100%',
      fontWeight: 600,
      color: theme.colors.gray600,
    }),
];
