import {createRandomDate} from '../../functions';
import {PostDocument} from '../../types';
import {tempPosts} from './constants';

/** Mock 데이터 생성 (Posts) */
export const createPostDocsMock = (mockLength: number = 10) => {
  const tempCategories = ['SAMPLE', 'JavaScript', 'JUST', 'DO IT', 'React'];
  const createCategory = () => {
    const randomCategoryType = ['string', 'string[]', 'undefined'][Math.floor(Math.random() * 3)];
    if (randomCategoryType === 'string') {
      return tempCategories[Math.floor(Math.random() * tempCategories.length)];
    }
    if (randomCategoryType === 'string[]') {
      const categories: string[] = [];
      const randomCeilLength = Math.ceil(Math.random() * tempCategories.length);
      while (categories.length < randomCeilLength) {
        const category = tempCategories[Math.floor(Math.random() * tempCategories.length)];
        if (categories.includes(category)) {
          continue;
        }
        categories.push(category);
      }
      return categories;
    }
    return undefined;
  };

  const result: PostDocument[] = Array.from({length: mockLength}).map((_, i) => {
    const post = tempPosts[Math.round(Math.random())];
    const summary = Boolean(Math.round(Math.random()))
      ? `${post.subject}'s summary (idx: ${i})`
      : undefined;
    return {
      ...post,
      id: `${i}`,
      summary,
      subject: `${post.subject} : ${i}`,
      category: createCategory(),
      date: createRandomDate(new Date(2019, 0, 1), new Date()).toString(),
    };
  });
  return result;
};

/**  정렬된 Mock 데이터 생성 (Posts / 최근 날짜기준) */
export const createSortedPostDocsMock = (mockLength: number = 10) =>
  createPostDocsMock(mockLength).sort(
    (aPost, bPost) => new Date(bPost.date).valueOf() - new Date(aPost.date).valueOf(),
  );
