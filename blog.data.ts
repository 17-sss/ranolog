const author = 'Hoyoung Son';
const description = 'Frontend Developer who create convenient value.';
const defaultImage = '/profile_image.jpg';

export const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://example.com';
export const domainName = process.env.NEXT_PUBLIC_DOMAIN || 'example.com';

/** meta data (default) */
export const metadata = {
  author,
  title: `Hoyoung | Frontend Developer`,
  description,
  image: defaultImage,
  url: siteUrl,
  canonical: siteUrl,
  type: 'website',
};

/** ownership verification (google, naver..)  */
export const siteVerificationData = {
  naver: '5b8cc3cd81cfd17af81e32f507c53f8bee9e10c2',
  // google: '[content value..]',
};

export const resumeFileName = 'default.mdx';

/** config data */
export const configData = {
  header: {
    links: [
      {name: 'root', displayName: '', link: '/'},
      {name: 'blog', displayName: 'Blog', link: '/blog'},
      {name: 'projects', displayName: 'Projects', link: '/projects'},
      {name: 'resume', displayName: 'Resume', link: '/resume'},
    ],
    profileImage: defaultImage,
  },
  footer: {
    author,
    contact: {
      github: 'https://github.com/17-sss',
      email: 'mailto:xzxking17@gmail.com',
    },
  },
  mainPage: {
    title: author,
    description,
    bannerImage: '/banner.jpg',
  },
};
