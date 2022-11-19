import {Fragment, useCallback, useMemo, useState} from 'react';

import {Post, systemCss} from '@shared';

export const useCategory = (posts: Post[]) => {
  const [selctedCategory, setSelctedCategory] = useState<string>();

  /** 현재 선택된 카테고리 기반 posts
   * - handleCategoryDropdownChange로 인해 현재 선택된 카테고리가 변경될 때 업데이트
   */
  const selectedCategoryPosts = useMemo(() => {
    if (!selctedCategory || selctedCategory === '전체보기') {
      return posts;
    }
    const result = posts.filter(({category}) => {
      if (selctedCategory === '미지정') {
        return typeof category === 'undefined' || category.length === 0 || category === '';
      }
      if (Array.isArray(category)) {
        return category.includes(selctedCategory);
      }
      return category === selctedCategory;
    });
    return result;
  }, [posts, selctedCategory]);

  /** 카테고리 정보 (이름, 글 갯수) */
  const categoryInfo = useMemo(() => {
    const categoryMap = posts.reduce((result, {category}) => {
      const createCurrentNames = (category: Post['category']) => {
        const isUndefined = typeof category === 'undefined';
        const isEmptyText = typeof category === 'string' && category === '';
        const isEmptyArray = Array.isArray(category) && category.length === 0;
        if (isUndefined || isEmptyText || isEmptyArray) {
          return ['미지정'];
        }
        return typeof category === 'string' ? [category] : category;
      };
      const currentNames = createCurrentNames(category);
      currentNames.forEach((name) => {
        const value = (result.get(name) ?? 0) + 1;
        return result.set(name, value);
      });
      return result;
    }, new Map<string, number>());

    let result = Array.from(categoryMap.entries()).sort(([aName], [bName]) =>
      aName.localeCompare(bName),
    );
    const findUnspecifiedIdx = result.findIndex(([name]) => name === '미지정');
    if (findUnspecifiedIdx > -1) {
      result = [result[findUnspecifiedIdx], ...result.filter(([name]) => name !== '미지정')];
    }
    result.unshift(['전체보기', posts.length]);

    return result;
  }, [posts]);

  /** Dropdown(Category) : labelMapper */
  const categoryLabelMapper = useCallback((info: typeof categoryInfo[number]) => {
    const [name, count] = info;
    const isAllView = name === '전체보기';
    return (
      <Fragment>
        <span css={[isAllView && systemCss({fontWeight: 'bold'})]}>{name}</span>&nbsp;
        <span>{`(${count})`}</span>
      </Fragment>
    );
  }, []);

  /** Dropdown(Category) : onChange */
  const handleCategoryDropdownChange = useCallback((info: typeof categoryInfo[number]) => {
    const [categoryName] = info;
    setSelctedCategory(categoryName);
  }, []);

  return {
    selctedCategory,
    selectedCategoryPosts,
    categoryInfo,
    categoryLabelMapper,
    handleCategoryDropdownChange,
  };
};
