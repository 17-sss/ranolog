import {Fragment, useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {useRouter} from 'next/router';

import {DropdownRef, PostDocument, systemCss, valueOrLastItem} from '@src/shared';

export type CategoryInfoTuple = [string, number];

export const useCategory = (postDocs: PostDocument[]) => {
  const router = useRouter();

  const categoryDropdownRef = useRef<DropdownRef<CategoryInfoTuple>>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>();

  /** 현재 선택된 카테고리 기반 postDocs
   * - handleCategoryDropdownChange로 인해 현재 선택된 카테고리가 변경될 때 업데이트
   */
  const selectedCategoryPosts = useMemo(() => {
    if (!selectedCategory || selectedCategory === 'All') {
      return postDocs;
    }
    const result = postDocs.filter(({category}) => {
      if (selectedCategory === 'Uncategorized') {
        return typeof category === 'undefined' || category.length === 0 || category === '';
      }
      if (Array.isArray(category)) {
        return category.includes(selectedCategory);
      }
      return category === selectedCategory;
    });
    return result;
  }, [postDocs, selectedCategory]);

  /** 카테고리 정보 (이름, 글 갯수) */
  const categoryInfo: CategoryInfoTuple[] = useMemo(() => {
    const categoryMap = postDocs.reduce((result, {category}) => {
      const createCurrentNames = (category: PostDocument['category']) => {
        const isUndefined = typeof category === 'undefined';
        const isEmptyText = typeof category === 'string' && category === '';
        const isEmptyArray = Array.isArray(category) && category.length === 0;
        if (isUndefined || isEmptyText || isEmptyArray) {
          return ['Uncategorized'];
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
    const findUnspecifiedIdx = result.findIndex(([name]) => name === 'Uncategorized');
    if (findUnspecifiedIdx > -1) {
      result = [result[findUnspecifiedIdx], ...result.filter(([name]) => name !== 'Uncategorized')];
    }
    result.unshift(['All', postDocs.length]);

    return result;
  }, [postDocs]);

  /** Dropdown(Category) : labelMapper */
  const categoryLabelMapper = useCallback((info: CategoryInfoTuple) => {
    const [name, count] = info;
    const isAllView = name === 'All';
    return (
      <Fragment>
        <span css={[isAllView && systemCss({fontWeight: 600})]}>{name}</span>&nbsp;
        <span>{`(${count})`}</span>
      </Fragment>
    );
  }, []);

  /** Dropdown(Category) : onChange */
  const handleCategoryDropdownChange = useCallback(
    (info: CategoryInfoTuple) => {
      const [categoryName] = info;
      setSelectedCategory(categoryName);
      router.push(categoryName === 'All' ? '' : `?category=${categoryName}`);
    },
    [router],
  );

  /** Dropdown(Category) : Dropdown "data" 상태 보정*/
  const updateDropdownInnerData = useCallback(
    (aCategory?: string) => {
      const findInfo = categoryInfo.find(([category]) => category === (aCategory ?? 'All'));
      categoryDropdownRef.current?.updateInnerData(findInfo);
    },
    [categoryInfo],
  );

  /** router.query['category'] 업뎃되면, selectedCategory도 업데이트 */
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    let categoryQueryStr = valueOrLastItem(router.query['category']);
    if (categoryQueryStr === 'All') {
      categoryQueryStr = undefined;
    }
    setSelectedCategory(categoryQueryStr);
    updateDropdownInnerData(categoryQueryStr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query]);

  return {
    categoryDropdownRef,
    selectedCategory,
    selectedCategoryPosts,
    categoryInfo,
    categoryLabelMapper,
    handleCategoryDropdownChange,
  };
};
