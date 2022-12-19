import {IntroduceBoxProps} from '@src/main';
import {
  UtterancAttributes,
  DefaultSeoMeta,
  FooterProps,
  HeaderProps,
  HeaderLink,
} from '@src/shared';

const author = 'Hoyoung Son';
const description = 'Frontend Developer who create convenient value.';
const defaultImage = '/profile_image.jpg';

export const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://example.com';
export const domainName = process.env.NEXT_PUBLIC_DOMAIN || 'example.com';

/** meta data (default) */
export const metadata: DefaultSeoMeta = {
  title: `Hoyoung | Frontend Developer`,
  description,
  image: defaultImage,
  url: siteUrl,
  siteName: 'Ranolog',
  author,
  canonical: siteUrl,
};

type SiteVerification = {[key in 'naver' | 'google']?: string};
/** ownership verification (소유권 확인)
 * - google, naver..
 */
export const siteVerificationData: SiteVerification = {
  naver: '5b8cc3cd81cfd17af81e32f507c53f8bee9e10c2',
  // google: '[content value..]',
};

export const utterancAttrs: UtterancAttributes = {
  src: 'https://utteranc.es/client.js',
  repo: '17-sss/ranolog',
  'issue-term': 'pathname',
  label: 'comment',
  theme: 'github-light',
  crossorigin: 'anonymous',
  async: 'true',
};

// ---------------------------------------------------------------------------

const navLinks: HeaderLink[] = [
  {name: 'root', displayName: '', link: '/'},
  {name: 'blog', displayName: 'Blog', link: '/blog'},
  {name: 'projects', displayName: 'Projects', link: '/projects'},
  {name: 'resume', displayName: 'Resume', link: '/resume'},
];

interface StaticDataInfo {
  /** Use in 'shared/components/PageLayout' component. */
  layout: {header: HeaderProps; footer: FooterProps};
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
      links: navLinks,
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
    resume: {resumeFileName: 'default.mdx'},
  },
};
