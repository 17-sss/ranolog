import {useCallback, useEffect, useMemo, useState} from 'react';

import {mediaQueriesKeyList, MediaQueriesKey, theme} from '../theme';

export type MediaQueryLists = {[key in MediaQueriesKey]: MediaQueryList};

export const useMedia = () => {
  const [media, setMedia] = useState<MediaQueriesKey>();
  const isMobile = useMemo(() => {
    return media === 'mobile';
  }, [media]);

  const checkMedia = useCallback(
    (queryKey: MediaQueriesKey) => (e: MediaQueryListEvent) => {
      if (!e.matches) {
        return;
      }
      setMedia(queryKey);
    },
    [],
  );

  const createMediaQueryLists = useCallback(() => {
    const IDX_CORRECTION_VALUE = 1;
    const LAST_IDX = mediaQueriesKeyList.length - 1;
    const result: MediaQueryLists = mediaQueriesKeyList.reduce((result, key, i) => {
      if (i === 0) {
        result[key] = window.matchMedia(`(max-width: ${theme.breakpointValues[i] - 1}px)`);
        return result;
      }
      if (i === LAST_IDX) {
        result[key] = window.matchMedia(
          `(min-width: ${theme.breakpointValues[i - IDX_CORRECTION_VALUE]}px)`,
        );
        return result;
      }
      result[key] = window.matchMedia(
        `(min-width: ${theme.breakpointValues[i - IDX_CORRECTION_VALUE]}px) and (max-width: ${
          theme.breakpointValues[i] - 1
        }px)`,
      );
      return result;
    }, {} as MediaQueryLists);
    return result;
  }, []);

  useEffect(() => {
    const mediaQueryLists = createMediaQueryLists();
    const mediaQueryListsEntries = Object.entries(mediaQueryLists);
    for (const [key, mediaQueryList] of mediaQueryListsEntries) {
      if (mediaQueryList.matches) {
        setMedia(key as MediaQueriesKey);
        break;
      }
    }
    mediaQueryListsEntries.forEach(([key, mediaQueryList]) =>
      mediaQueryList.addEventListener('change', checkMedia(key as MediaQueriesKey)),
    );
    return () => {
      mediaQueryListsEntries.forEach(([key, mediaQueryList]) =>
        mediaQueryList.removeEventListener('change', checkMedia(key as MediaQueriesKey)),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {media, isMobile};
};
