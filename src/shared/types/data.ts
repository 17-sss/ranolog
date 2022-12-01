import {StaticImageData} from 'next/image';

import {DefaultDocument} from '@src/lib';

export interface PostDocument extends DefaultDocument {
  subject: string;
  category?: string | string[];
  imageSrc?: string | StaticImageData;
}
