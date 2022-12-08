const author = 'Hoyoung Son';
const description = 'Frontend Engineer who create convenient value.';
const defaultImage = '/profile_image.jpg';

const siteUrl = process.env.NEXT_PUBLIC_URL || 'https://example.com';
export const domainName = process.env.NEXT_PUBLIC_DOMAIN || 'example.com';

/** meta data (default) */
export const metadata = {
  author,
  title: `Hoyoung | Frontend Engineer`,
  url: siteUrl,
  description,
  canonical: siteUrl, // ${siteUrl}/[path]/...`;
  image: defaultImage,
  type: 'website',
};

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
