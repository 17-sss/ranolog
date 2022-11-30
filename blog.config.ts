const author = 'Hoyoung Son';

const configData = {
  header: {
    links: [
      {name: 'root', displayName: '', link: '/'},
      {name: 'blog', displayName: 'Blog', link: '/blog'},
      {name: 'project', displayName: 'Project', link: '/project'},
      {name: 'resume', displayName: 'Resume', link: '/resume'},
    ],
    profileImage: '/profile_image.jpg',
  },
  footer: {
    author,
    contact: {
      github: 'https://github.com/17-sss',
      email: 'mailto:xzxking17@gmail.com',
    },
  },
  main: {
    title: author,
    description: 'Frontend Engineer who create convenient value.',
    imageSrc: '/banner.jpg',
  },
};
export default configData;
