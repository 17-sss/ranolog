import {StaticImageData} from 'next/image';

import {DefaultDocument} from '@src/lib';

export interface PostDocument extends DefaultDocument {
  category?: string | string[];
  imageSrc?: string | StaticImageData;
}

export interface ProjectDocument extends DefaultDocument {
  skills?: string[];
  category: {
    type: 'project' | 'library';
    isTeam?: boolean;
  };
  links?: {
    text: string;
    href: string;
  }[];
  thumbnail?: string;
}
