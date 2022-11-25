import {useMemo} from 'react';

import {useRouter} from 'next/router';

import {PostDocument, valueOrLastItem} from '@shared';

type PostDocumentInfo = {
  [key in 'current' | 'prev' | 'next']?: PostDocument;
};

export const useBlogDetail = (postDocs: PostDocument[]) => {
  const router = useRouter();
  const id = useMemo(() => valueOrLastItem(router.query.id), [router.query]);

  /** 현재 문서들 */
  const currentDocs = useMemo(() => {
    if (!postDocs) {
      return [];
    }
    return postDocs;
  }, [postDocs]);

  /** 현재 게시글 index
   * - currentDocs(postDocs)에서 index를 찾음
   */
  const postDocIdx = useMemo(() => {
    const result = currentDocs.findIndex((post) => post.id === id);
    return result;
  }, [currentDocs, id]);

  /** 현재, 이전, 다음 게시글 */
  const postDocsInfo = useMemo<PostDocumentInfo>(() => {
    return {
      current: currentDocs[postDocIdx],
      prev: currentDocs[postDocIdx + 1],
      next: currentDocs[postDocIdx - 1],
    };
  }, [currentDocs, postDocIdx]);

  /** 이전, 다음 게시글이 하나라도 있는지 체크 */
  const isExistAnotherPosts = useMemo(() => {
    return [postDocsInfo.next, postDocsInfo.prev].some((v) => v);
  }, [postDocsInfo.next, postDocsInfo.prev]);

  return {postDocsInfo, isExistAnotherPosts};
};
