import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {debounce, PostDocument} from '@src/shared';

export const useSearchPosts = (postDocs: PostDocument[], currentCategory: string = '') => {
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>();

  const searchPostDocs = useMemo(() => {
    if (!searchValue) {
      return postDocs;
    }
    const result = postDocs.filter(({subject}) => {
      const trimSubject = subject.replace(/\s+/g, '').toLowerCase();
      const trimSearchValue = searchValue.replace(/\s+/g, '').toLowerCase();
      return trimSubject.indexOf(trimSearchValue) > -1;
    });
    return result;
  }, [searchValue, postDocs]);

  const registerSearchInput = useCallback((element?: HTMLInputElement | null) => {
    if (!element) {
      return;
    }
    inputRef.current = element;
  }, []);

  const handleSearchKeyUp = useCallback((e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e || !(e.target instanceof HTMLInputElement)) {
      return;
    }
    const value = e.target.value;
    setSearchValue(value);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSearchValue('');
  }, [currentCategory]);

  return {
    searchPostDocs,
    registerSearchInput,
    handleSearchKeyUp: debounce({func: handleSearchKeyUp}),
  };
};
