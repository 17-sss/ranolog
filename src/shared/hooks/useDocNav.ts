import {useMemo} from 'react';

import {useRouter} from 'next/router';

import {DefaultDocument} from '@src/lib';

import {valueOrLastItem} from '../functions';

type DocumentNavInfo<TDoc extends DefaultDocument = DefaultDocument> = {
  [key in 'current' | 'prev' | 'next']?: TDoc;
};

export const useDocNav = <TDoc extends DefaultDocument = DefaultDocument>(docs: TDoc[]) => {
  const router = useRouter();

  const id = useMemo(() => valueOrLastItem(router.query.id), [router.query]);

  /** 현재 글 index */
  const docIdx = useMemo(() => {
    const result = docs.findIndex((doc) => doc.id === id);
    return result;
  }, [docs, id]);

  /** 현재, 이전, 다음 글 */
  const docsNavInfo = useMemo<DocumentNavInfo<TDoc>>(() => {
    return {
      current: docs[docIdx],
      prev: docs[docIdx + 1],
      next: docs[docIdx - 1],
    };
  }, [docs, docIdx]);

  /** 이전, 다음 글이 하나라도 있는지 체크 */
  const isExistAnotherDocs = useMemo(() => {
    return [docsNavInfo.next, docsNavInfo.prev].some((v) => v);
  }, [docsNavInfo.next, docsNavInfo.prev]);

  return {docsNavInfo, isExistAnotherDocs};
};
