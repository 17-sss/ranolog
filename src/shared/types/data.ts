import {StaticImageData} from 'next/image';

import {DefaultDocument} from '@lib';

export interface Post extends DefaultDocument {
  subject: string;
  category?: string | string[];
  imageSrc?: string | StaticImageData;
}
