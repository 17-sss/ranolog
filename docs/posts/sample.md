---
subject: 'When to Use Static Generation v.s. Server-side Rendering (Sample)'
date: '2020-01-02'
summary: 'We recommend using Static Generation (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request

> **blockquote**

- [링크](https://naver.com)
- 큭큭

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
const calcAlphaCnt = (arrStr, searchChar) =>
  arrStr.reduce((cnt, currChar) => (currChar === searchChar && cnt++, cnt), 0);
const isDuplicateKey = (object, key) => Object.keys(object).indexOf(key) > -1;
const createSortedObjectKey = (object) => {
  const result = {};
  const keys = Object.keys(object).sort();

  keys.forEach((key) => {
    result[key] = object[key];
  });
  return result;
};
const createObjectValueKey = (object) =>
  Object.keys(object).reduce((result, key) => ((result += key + object[key]), result), '');

const groupAnagrams = (strs) => {
  const listMap = {};

  let nLoop = 0;
  while (nLoop < strs.length) {
    const currStr = strs[nLoop];
    const arrCurrStr = currStr.split('');

    const tmpMap = {};
    for (let i = 0; i < arrCurrStr.length; i++) {
      const tmpChar = arrCurrStr[i];
      if (isDuplicateKey(tmpMap, tmpChar)) continue;

      const alpCnt = calcAlphaCnt(arrCurrStr, tmpChar);
      tmpMap[tmpChar] = alpCnt;
    }

    const strKey = createObjectValueKey(createSortedObjectKey(tmpMap));

    if (isDuplicateKey(listMap, strKey)) listMap[strKey].push(currStr);
    else listMap[strKey] = [currStr];

    nLoop++;
  }

  return Object.values(listMap);
};

groupAnagrams(['aba', 'cbc', 'baa', 'adc', 'ccd', 'bb']);
```
