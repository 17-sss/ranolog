import {DefaultDocument} from '@src/lib';

export const createDateText = (aDate: DefaultDocument['date']) => {
  if (!aDate) {
    return;
  }
  return new Date(typeof aDate === 'string' ? aDate : aDate.start)
    .toLocaleDateString()
    .replace(/\.$/g, '');
};
