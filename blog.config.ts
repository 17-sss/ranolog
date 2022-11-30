const author = 'Hoyoung Son';

const configData = {
  author,
  profileImage: '/profile_image.jpg',
  links: [
    {name: 'root', displayName: '', link: '/'},
    {name: 'blog', displayName: 'Blog', link: '/blog'},
    {name: 'resume', displayName: 'Resume', link: '/resume'},
    {name: 'portfolio', displayName: 'Project', link: '/project'},
    {name: 'about', displayName: 'About', link: '/about'},
  ],
  introduce: {
    title: author,
    description: 'Frontend Engineer who create convenient value.',
    imageSrc: '/banner.jpg',
  },
  contact: {
    github: 'https://github.com/17-sss',
    email: 'mailto:xzxking17@gmail.com',
  },
};
export default configData;
