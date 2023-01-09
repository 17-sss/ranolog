import {useCallback, useEffect, useMemo, useState} from 'react';

import {mediaQueriesKeyList, MediaQueriesKey, theme} from '../theme';

export type MediaQueryLists = {[key in MediaQueriesKey]: MediaQueryList};

export const useMedia = () => {
  const [media, setMedia] = useState<MediaQueriesKey>();

  const isMobile = useMemo(() => {
    return media === 'mobile';
  }, [media]);

  const isDeskDevice = useMemo(() => {
    if (media === 'laptop' || media === 'desktop' || media === 'largeDesktop') {
      return true;
    }
    return false;
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
    const LAST_IDX = mediaQueriesKeyList.length - 1;
    const result: MediaQueryLists = mediaQueriesKeyList.reduce((result, key, i) => {
      if (i === 0) {
        result[key] = window.matchMedia(`(max-width: ${theme.breakpointValues[i] - 1}px)`);
        return result;
      }
      if (i === LAST_IDX) {
        result[key] = window.matchMedia(`(min-width: ${theme.breakpointValues[i - 1]}px)`);
        return result;
      }
      result[key] = window.matchMedia(
        `(min-width: ${theme.breakpointValues[i - 1]}px) and (max-width: ${
          theme.breakpointValues[i] - 1
        }px)`,
      );
      return result;
    }, {} as MediaQueryLists);
    return result;
  }, []);

  useEffect(() => {
    const mediaQueryListEntries = Object.entries(createMediaQueryLists()) as [
      MediaQueriesKey,
      MediaQueryList,
    ][];
    for (const [key, mediaQueryList] of mediaQueryListEntries) {
      if (mediaQueryList.matches) {
        setMedia(key);
      }
    }
    mediaQueryListEntries.forEach(([key, mediaQueryList]) =>
      mediaQueryList.addEventListener('change', checkMedia(key)),
    );
    return () => {
      mediaQueryListEntries.forEach(([key, mediaQueryList]) =>
        mediaQueryList.removeEventListener('change', checkMedia(key)),
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {media, isMobile, isDeskDevice};
};
