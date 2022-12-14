import {DefaultDocument} from '@src/lib';

export interface PostDocument extends DefaultDocument {
  category?: string | string[];
  thumbnail?: string;
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

export interface ResumeDocument extends DefaultDocument {
  name: string;
  job: string;
  email?: string;
  introduce?: string | string[];
}
