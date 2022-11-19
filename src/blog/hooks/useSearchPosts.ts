import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {debounce, Post} from '@shared';

export const useSearchPosts = (posts: Post[], currentCategory: string = '') => {
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>();

  const searchPosts = useMemo(() => {
    if (!searchValue) {
      return posts;
    }
    const result = posts.filter(({subject}) => {
      const trimSubject = subject.replace(/\s+/g, '');
      const trimSearchValue = searchValue.replace(/\s+/g, '');
      return trimSubject.indexOf(trimSearchValue) > -1;
    });
    return result;
  }, [searchValue, posts]);

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

  const handleSearchButtonClick = useCallback((e?: React.MouseEvent<HTMLButtonElement>) => {
    if (!e || !(e.currentTarget instanceof HTMLButtonElement) || !inputRef.current) {
      return;
    }
    setSearchValue(inputRef.current.value);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setSearchValue('');
  }, [currentCategory]);

  return {
    searchPosts,
    registerSearchInput,
    handleSearchKeyUp: debounce({func: handleSearchKeyUp}),
    handleSearchButtonClick,
  };
};
