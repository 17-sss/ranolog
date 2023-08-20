import {samplePosts, sampleProjects} from './constants';
import {createRandomDate} from '../functions';
import {PostDocument, ProjectDocument} from '../types';

/** Mock 데이터 생성 (Posts) */
export const createPostDocsMock = (mockLength: number = 10) => {
  const createCategory = () => {
    const tempCategories = ['SAMPLE', 'JavaScript', 'JUST', 'DO IT', 'React'];
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
    const post = samplePosts[Math.round(Math.random())];
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
  createPostDocsMock(mockLength).sort(({date: aDate}, {date: bDate}) => {
    if (typeof aDate === 'string' && typeof bDate === 'string') {
      return new Date(bDate).valueOf() - new Date(aDate).valueOf();
    }
    return 0;
  });

/** Mock 데이터 생성 (Projects) */
export const createProjectDocsMock = (mockLength: number = 10) => {
  const tempSkills = [
    'React',
    'TypeScript',
    'Next.js',
    'StoryBook',
    'Gatsby',
    'JavaScript',
    'HTML',
    'CSS',
  ];
  const createSkills = () => {
    const skills: string[] = [];
    const randomCeilLength = Math.ceil(Math.random() * tempSkills.length);
    while (skills.length < randomCeilLength) {
      const skill = tempSkills[Math.floor(Math.random() * tempSkills.length)];
      if (skills.includes(skill)) {
        continue;
      }
      skills.push(skill);
    }
    return skills;
  };

  const result: ProjectDocument[] = Array.from({length: mockLength}).map((_, i) => {
    const projectDoc = sampleProjects[Math.round(Math.random())];
    const summary = Boolean(Math.round(Math.random()))
      ? `${projectDoc.subject}'s summary (idx: ${i})`
      : undefined;
    const category: ProjectDocument['category'] = {
      type: Boolean(Math.round(Math.random())) ? 'project' : 'library',
      isTeam: Boolean(Math.round(Math.random())),
    };
    const startDate = createRandomDate(new Date(2019, 0, 1), new Date());
    const endDate = createRandomDate(startDate, new Date()).toString();

    return {
      ...projectDoc,
      category,
      id: `${i}`,
      summary,
      subject: `${projectDoc.subject} : ${i}`,
      skills: createSkills(),
      date: {start: startDate.toString(), end: endDate.toString()},
    };
  });
  return result;
};

/**  정렬된 Mock 데이터 생성 (Projects / date.start 기준으로 정렬) */
export const createSortedProjectDocsMock = (mockLength: number = 10) =>
  createProjectDocsMock(mockLength).sort(({date: aDate}, {date: bDate}) => {
    if (typeof aDate === 'object' && typeof bDate === 'object') {
      return new Date(bDate.start).valueOf() - new Date(aDate.start).valueOf();
    }
    return 0;
  });
