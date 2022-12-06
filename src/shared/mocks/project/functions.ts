import {createRandomDate} from '../../functions';
import {ProjectDocument} from '../../types';
import {tempProjects} from './constants';

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
    const projectDoc = tempProjects[Math.round(Math.random())];
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
