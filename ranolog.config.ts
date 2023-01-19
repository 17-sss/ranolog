import {IntroduceBoxProps} from '@src/main';
import {DefaultSeoMeta, FooterProps} from '@src/shared/components';
import {UtterancAttributes} from '@src/shared/types';

export const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://example.com';
export const domainName = process.env.NEXT_PUBLIC_DOMAIN || 'example.com';

const author = 'Hoyoung Son';
const description = 'Frontend Engineer who create convenient value.';
const defaultImage = '/profile_image.jpg';

// [SEO & UTTERANC] =============================================
export const metadata: DefaultSeoMeta = {
  title: 'Hoyoung - Frontend Engineer',
  description,
  image: defaultImage,
  url: siteUrl,
  siteName: 'Ranolog',
  author,
  canonical: siteUrl,
};

type SiteVerification = {[key in 'naver' | 'google']?: string};
export const siteVerificationData: SiteVerification = {
  naver: '5b8cc3cd81cfd17af81e32f507c53f8bee9e10c2',
};

export const utterancAttrs: UtterancAttributes = {
  repo: '17-sss/ranolog',
  src: 'https://utteranc.es/client.js',
  'issue-term': 'pathname',
  label: 'comment',
  theme: 'github-light',
  crossorigin: 'anonymous',
  async: 'true',
};

// [STATIC DATA] =============================================
interface StaticDataInfo {
  /** Use in 'shared/components/PageLayout' component. */
  layout: {
    header: {profileImage: string};
    footer: FooterProps;
  };
  /** Used in page components. */
  pages: {
    main: {introduce: IntroduceBoxProps};
    resume: {
      /** Enter the file name of the 'docs/resumes' folder. */
      resumeFileName: string;
    };
  };
}
export const staticDataInfo: StaticDataInfo = {
  layout: {
    header: {
      profileImage: defaultImage,
    },
    footer: {
      author,
      contact: {
        github: 'https://github.com/17-sss',
        email: 'mailto:xzxking17@gmail.com',
      },
    },
  },
  pages: {
    main: {introduce: {title: author, description, bannerImage: '/banner.jpg'}},
    resume: {resumeFileName: '2023-01-19.mdx'},
  },
};
