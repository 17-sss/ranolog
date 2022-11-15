import React, {useCallback, useMemo, useState} from 'react';

import {Post} from '@shared';

export interface PageInfo {
  current: number;
  pageGroup: number;
  totalPage: number;
}

interface UsePaginationParams<TData extends any[]> {
  data: TData;
  postUnit?: number;
  pageUnit?: number;
}

export const usePagination = <TData extends any[]>({
  data,
  postUnit = 5,
  pageUnit = 5,
}: UsePaginationParams<TData>) => {
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    current: 1,
    pageGroup: 1,
    totalPage: Math.ceil(data.length / postUnit),
  });

  /** 현재 보여지고 있는 데이터 정보 */
  const currentData = useMemo(() => {
    const endIdx = pageInfo.current * postUnit;
    const startIdx = endIdx - postUnit;
    return data.slice(startIdx, endIdx);
  }, [pageInfo, postUnit, data]);

  /** 페이지 Item 번호들 */
  const pageNums = useMemo(() => {
    const result: number[] = [];
    const {pageGroup, totalPage} = pageInfo;
    const start = (pageGroup - 1) * pageUnit + 1;
    const end = start + (pageUnit - 1);
    for (let num = start; num <= end; num++) {
      if (totalPage < num) {
        break;
      }
      result.push(num);
    }
    return result;
  }, [pageInfo, pageUnit]);

  /** Page Button 클릭 (pageInfo 업뎃) */
  const handlePageButtonClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const isIconButton = (btnId: string) => btnId && Number.isNaN(+btnId);
      const isIconPrevOrNext = (btnId: string) => ['prev', 'next'].includes(btnId);
      const isIconFirstOrLast = (btnId: string) => ['first', 'last'].includes(btnId);

      const getUpdatedCurrentNum = (btnId: string, prevCurrent: number) => {
        let result = +btnId;
        if (isIconButton(btnId)) {
          if (isIconPrevOrNext(btnId)) {
            result = prevCurrent + (btnId === 'next' ? 1 : -1);
          } else if (isIconFirstOrLast(btnId)) {
            result = btnId === 'first' ? 1 : pageInfo.totalPage;
          }
        }
        if (result < 1 || result > pageInfo.totalPage) {
          return prevCurrent;
        }
        return result;
      };

      const getUpdatedPageGroup = (
        btnId: string,
        updatedCurrent: number,
        prevPageGroup: number,
      ) => {
        let result = prevPageGroup;
        const displayFirstPageNum = pageNums[0] ?? -1;
        const displayLastPageNum = pageNums[pageNums.length - 1] ?? -1;
        if (isIconPrevOrNext(btnId)) {
          const isNext = btnId === 'next';
          if (isNext && displayLastPageNum < updatedCurrent) {
            result++;
          } else if (!isNext && displayFirstPageNum > updatedCurrent) {
            result--;
          }
          return result;
        }
        if (isIconFirstOrLast(btnId)) {
          const isFirst = btnId === 'first';
          return isFirst ? 1 : Math.ceil(pageInfo.totalPage / pageUnit);
        }

        return result;
      };
      // -------------------

      const btn = e.currentTarget;
      if (!(btn instanceof HTMLButtonElement)) {
        return;
      }
      const current = getUpdatedCurrentNum(btn.id, pageInfo.current);
      const pageGroup = getUpdatedPageGroup(btn.id, current, pageInfo.pageGroup);
      if (isIconButton(btn.id)) {
        return setPageInfo((state) => ({...state, current, pageGroup}));
      }
      return setPageInfo((state) => ({...state, current}));
    },
    [pageInfo, pageNums, pageUnit],
  );

  return {pageInfo, currentData, pageNums, handlePageButtonClick};
};
