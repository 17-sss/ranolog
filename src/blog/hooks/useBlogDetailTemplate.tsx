import {useCallback, useEffect, useMemo, useRef} from 'react';

import {useRouter} from 'next/router';

import {CommentsRef} from '@src/blog';
import {PostDocument, valueOrLastItem} from '@src/shared';

type PostDocumentInfo = {
  [key in 'current' | 'prev' | 'next']?: PostDocument;
};

export const useBlogDetailTemplate = (postDocs: PostDocument[]) => {
  const router = useRouter();

  const commentsRef = useRef<CommentsRef>(null);

  const id = useMemo(() => valueOrLastItem(router.query.id), [router.query]);
  const selectedCategory = useMemo(() => valueOrLastItem(router.query.category), [router.query]);

  /** 현재 문서들 */
  const currentDocs = useMemo(() => {
    const filterPostDocs = (aSelectedCategory: string) => {
      const result = postDocs.filter(({category}) => {
        if (aSelectedCategory === '미지정') {
          return typeof category === 'undefined' || category.length === 0 || category === '';
        }
        if (Array.isArray(category)) {
          return category.includes(aSelectedCategory);
        }
        return category === aSelectedCategory;
      });
      return result;
    };
    // --
    if (!selectedCategory) {
      return postDocs;
    }
    const result = filterPostDocs(selectedCategory);
    if (result.length === 0) {
      return postDocs.filter((postDoc) => postDoc.id === id);
    }
    return result;
  }, [selectedCategory, postDocs, id]);

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

  /** PostNav Button 클릭 (글 이동) */
  const handleNavButtonClick = useCallback(
    async (id: string) => {
      const resetComments = () => {
        const DELAY_MS = 300;
        setTimeout(() => commentsRef.current?.resetScript(), DELAY_MS);
      };
      await router.push(`/blog/${id}${selectedCategory ? `?category=${selectedCategory}` : ''}`);
      resetComments();
    },
    [router, selectedCategory],
  );

  return {commentsRef, postDocsInfo, isExistAnotherPosts, handleNavButtonClick};
};
