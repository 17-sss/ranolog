import {useCallback, useMemo, useRef} from 'react';

import {useRouter} from 'next/router';

import {PostDocument, useDocNav, valueOrLastItem, CommentsRef} from '@src/shared';

export const useBlogDetailTemplate = (postDocs: PostDocument[]) => {
  const router = useRouter();

  const commentsRef = useRef<CommentsRef>(null);

  const id = useMemo(() => valueOrLastItem(router.query.id), [router.query]);
  const selectedCategory = useMemo(() => valueOrLastItem(router.query.category), [router.query]);

  /** 현재 문서들 */
  const currentDocs = useMemo(() => {
    const filterPostDocs = (aSelectedCategory: string) => {
      const result = postDocs.filter(({category}) => {
        if (aSelectedCategory === 'Uncategorized') {
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

  const {docsNavInfo: postDocsNavInfo, isExistAnotherDocs: isExistAnotherPosts} =
    useDocNav(currentDocs);

  /** DocNav Button 클릭 (글 이동) */
  const handlePostNavButtonClick = useCallback(
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

  return {commentsRef, postDocsNavInfo, isExistAnotherPosts, handlePostNavButtonClick};
};
