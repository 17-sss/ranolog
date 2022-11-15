import {StaticImageData} from 'next/image';

import {DefaultPost} from '@lib';

export interface Post extends DefaultPost {
  subject: string;
  category?: string | string[];
  imageSrc?: string | StaticImageData;
}
