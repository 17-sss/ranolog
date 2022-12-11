import {format} from 'date-fns';
import {ko} from 'date-fns/locale';

export const createRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

export const createDateText = (value: string | Date, formatString: string = 'yyyy.MM.dd') => {
  const date = new Date(value);
  return format(date, formatString, {locale: ko});
};
