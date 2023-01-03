import {useEffect, useState} from 'react';

import {TableContentItem} from '@src/blog';

/* Table Of Contents */
export const useToc = (markdownHtml: string, queryId: string = '') => {
  const [tableContentItems, setTableContentItems] = useState<TableContentItem[]>([]);
  useEffect(() => {
    if (!markdownHtml) {
      return;
    }
    const tableContents = createTableContentItems({innerHtml: markdownHtml, queryId});
    setTableContentItems(repositionTableContentItems(tableContents));
  }, [markdownHtml, queryId]);
  return {tableContentItems};
};

// FUNCTIONS ==============================================================================
const isHeading = (nodeName: string) => /^h[1-6]/i.test(nodeName);
const deleteText = (text: string) => text.replace(/[a-z]+/gi, '');
const createCloneData = <T extends unknown>(aData: T) => JSON.parse(JSON.stringify(aData)) as T;
const createChildren = (html: string) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return Array.from(div.children);
};

interface CreateTableContentItemsParams {
  innerHtml: string;
  queryId: string;
}
const createTableContentItems = ({innerHtml, queryId}: CreateTableContentItemsParams) => {
  const createTableContentItem = (node: Element) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }
    const eleId = (node.id || node.innerText).replace(/\s+/g, '-');
    const item = {
      id: eleId,
      text: node.innerText,
      nodeName: node.nodeName,
      href: `./${queryId}#${encodeURIComponent(eleId)}`,
      children: [],
    };
    if (node.children.length === 0) {
      return item;
    }
    const elements = Array.from(node.children);
    updateTableContentItems(elements, item.children);
    return item;
  };
  const updateTableContentItems = (elements: Element[], targetItems: TableContentItem[]) => {
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!isHeading(element.nodeName)) {
        continue;
      }
      const item = createTableContentItem(element as HTMLElement);
      if (item) {
        targetItems.push(item);
      }
    }
  };
  // ---
  const result: TableContentItem[] = [];
  const children = createChildren(innerHtml);
  updateTableContentItems(children, result);
  return result;
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
