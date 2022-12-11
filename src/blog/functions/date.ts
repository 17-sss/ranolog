import {DefaultDocument} from '@src/lib';
import {createDateText} from '@src/shared';

export const createPostDateText = (aDate: DefaultDocument['date']) => {
  if (!aDate) {
    return;
  }
  return createDateText(typeof aDate === 'string' ? aDate : aDate.start);
};
