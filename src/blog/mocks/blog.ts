import {Post, createRandomDate} from '@shared';

import samplePostImage from '../assets/sample_post.jpeg';

const tempPosts: Omit<Post, 'id' | 'category' | 'date'>[] = [
  {
    subject: 'Fusce suscipit lorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non elit dignissim, cursus mi et, consequat orci. Aenean sed dignissim ipsum. Curabitur varius orci sodales suscipit ultricies. Nulla facilisi. Proin tincidunt, purus a sollicitudin blandit, erat lectus molestie orci, at ultrices tortor nisi non ligula. Vestibulum bibendum mollis sollicitudin. Phasellus sagittis volutpat fermentum. Nulla finibus vitae mi sed semper. Aliquam blandit maximus fermentum. Proin interdum dolor a nulla sagittis viverra. Sed molestie sed nisl hendrerit porta. Morbi finibus quam magna, eu faucibus justo condimentum at. Vivamus maximus erat a tortor gravida tempor. Aliquam sit amet aliquam odio. Duis dui diam, blandit sit amet varius at, vehicula vitae est. Proin ut enim volutpat, luctus lorem ac, sollicitudin sem.',
  },
  {
    subject: 'dolor sit amet',
    content:
      'Nam a felis finibus, varius nulla in, tempus lectus. Donec eget odio et turpis porta rhoncus vitae non magna. Praesent ullamcorper lectus eget eros commodo dignissim sit amet vel sapien.',

    imageSrc: samplePostImage,
  },
];

/** Mock 데이터 생성 (Posts) */
export const createPostsMock = (mockLength: number = 10) => {
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

  const result: Post[] = Array.from({length: mockLength}).map((_, i) => {
    const post = tempPosts[Math.round(Math.random())];
    return {
      ...post,
      id: `${i}`,
      subject: `${post.subject} : ${i}`,
      category: createCategory(),
      date: createRandomDate(new Date(2019, 0, 1), new Date()).toString(),
    };
  });
  return result;
};

/**  정렬된 Mock 데이터 생성 (Posts / 최근 날짜기준) */
export const createSortedPostsMock = (mockLength: number = 10) =>
  createPostsMock(mockLength).sort(
    (aPost, bPost) => new Date(bPost.date).valueOf() - new Date(aPost.date).valueOf(),
  );
