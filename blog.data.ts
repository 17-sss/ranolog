const defaultImage = '/profile_image.jpg';

const author = 'Hoyoung Son';
const description = 'Frontend Engineer who create convenient value.';
const siteUrl = 'https://my-website-link.com'; // 배포 후 변경 예정

export type MetaDataType = {
  [key in
    | 'title'
    | 'description'
    | 'keywords'
    | 'image'
    | 'url'
    | 'canonical'
    | 'type'
    | 'site'
    | 'author']?: string;
};

/** meta data (default) */
export const metaData: MetaDataType = {
  author,
  title: 'Rano.log',
  url: siteUrl,
  description,
  canonical: siteUrl, // ${siteUrl}/[path]/...`;
  image: defaultImage,
};

/** config data */
export const configData = {
  header: {
    links: [
      {name: 'root', displayName: '', link: '/'},
      {name: 'blog', displayName: 'Blog', link: '/blog'},
      {name: 'project', displayName: 'Project', link: '/project'},
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
    imageSrc: '/banner.jpg',
  },
};
