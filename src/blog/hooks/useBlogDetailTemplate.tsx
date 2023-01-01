import {useState, useCallback, useMemo, useRef} from 'react';

import {useRouter} from 'next/router';

import {TableContentItem} from '@src/blog';
import {PostDocument, useDocNav, useMedia, valueOrLastItem, CommentsRef} from '@src/shared';

export const useBlogDetailTemplate = (postDocs: PostDocument[]) => {
  const router = useRouter();
  const {media} = useMedia();
  const isDesktop = ['desktop', 'largeDesktop'].includes(media ?? '');

  const [tableContentItems, setTableContentItems] = useState<TableContentItem[]>([]);
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

  /** tableContents 상태 업데이트 (TableContents에 들어감)
   * - MarkdownRenderer 컴포넌트의 ref에 대입
   */
  const registerTableContentItems = useCallback(
    (markdownEle?: HTMLDivElement | null) => {
      if (!markdownEle || !id) {
        return;
      }
      const rootContentItem = createRootTableContentItem({ele: markdownEle, queryId: id});
      const {children: tableContents} = rootContentItem;
      setTableContentItems(repositionTableContentItems(tableContents));
    },
    [id],
  );

  return {
    isDesktop,
    commentsRef,
    postDocsNavInfo,
    isExistAnotherPosts,
    handlePostNavButtonClick,
    tableContentItems,
    registerTableContentItems,
  };
};

// FUNCTIONS =================================================

const isHeading = (nodeName: string) => /^h[1-6]/i.test(nodeName);
const deleteText = (text: string) => text.replace(/[a-z]+/gi, '');
const createCloneData = <T extends unknown>(aData: T) => JSON.parse(JSON.stringify(aData)) as T;
const createRootTableContentItem = ({
  ele,
  queryId,
  item = {id: '', text: '', nodeName: '', href: '', children: []},
}: {
  ele: Element;
  queryId: string;
  item?: TableContentItem;
}) => {
  const eleId = (ele.id || (ele as HTMLElement).innerText).replace(/\s+/g, '-');
  item = {
    ...item,
    id: eleId,
    text: (ele as HTMLElement).innerText,
    nodeName: ele.nodeName,
    href: `./${queryId}#${encodeURIComponent(eleId)}`,
  };
  if (ele.children.length === 0) {
    return item;
  }
  const children = Array.from(ele.children);
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (!isHeading(child.nodeName)) {
      continue;
    }
    item.children.push(createRootTableContentItem({ele: child, queryId}));
  }
  return item;
};
const repositionTableContentItems = (items: TableContentItem[]) => {
  const createPrevStorage = (standard?: TableContentItem) => {
    if (!standard) {
      return [];
    }
    const result: TableContentItem[] = [standard];
    let pointer: TableContentItem = standard;
    while (pointer.children.length > 0) {
      pointer = pointer.children[pointer.children.length - 1];
      result.push(pointer);
    }
    return result;
  };

  if (items.length <= 1) {
    return items;
  }
  const cloneData: TableContentItem[] = [createCloneData(items[0])];
  for (let i = 1; i < items.length; i++) {
    let prevStandardIdx = cloneData.length - 1;
    let prevStorage: TableContentItem[] = createPrevStorage(cloneData[prevStandardIdx]);
    let curr: TableContentItem | undefined = createCloneData(items[i]);

    while (prevStorage.length > 0) {
      const prev = prevStorage.pop()!;
      const [prevNum, currNum] = [prev, curr].map(({nodeName}) => +deleteText(nodeName));
      if (prevNum < currNum) {
        prev.children.push(curr);
        break;
      }
      if (prevStorage.length === 0) {
        if (prevStandardIdx - 1 < 0) {
          cloneData.push(curr);
          break;
        }
        prevStorage = createPrevStorage(cloneData[--prevStandardIdx]);
      }
    }
  }
  return cloneData;
};
