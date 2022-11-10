import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import PostBox from '.';
import samplePostImage from '../../assets/sample_post.jpeg';

const storyDefault = {
  title: 'components/blog/PostBox',
  component: PostBox,
} as ComponentMeta<typeof PostBox>;

export default storyDefault;

const tempPosts = [
  {
    createDate: new Date(),
    subject: 'Fusce suscipit lorem',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non elit dignissim, cursus mi et, consequat orci. Aenean sed dignissim ipsum. Curabitur varius orci sodales suscipit ultricies. Nulla facilisi. Proin tincidunt, purus a sollicitudin blandit, erat lectus molestie orci, at ultrices tortor nisi non ligula. Vestibulum bibendum mollis sollicitudin. Phasellus sagittis volutpat fermentum. Nulla finibus vitae mi sed semper. Aliquam blandit maximus fermentum. Proin interdum dolor a nulla sagittis viverra. Sed molestie sed nisl hendrerit porta. Morbi finibus quam magna, eu faucibus justo condimentum at. Vivamus maximus erat a tortor gravida tempor. Aliquam sit amet aliquam odio. Duis dui diam, blandit sit amet varius at, vehicula vitae est. Proin ut enim volutpat, luctus lorem ac, sollicitudin sem.',
  },
  {
    imageSrc: samplePostImage,
    createDate: new Date(),
    subject: 'dolor sit amet',
    description:
      'Nam a felis finibus, varius nulla in, tempus lectus. Donec eget odio et turpis porta rhoncus vitae non magna. Praesent ullamcorper lectus eget eros commodo dignissim sit amet vel sapien.',
  },
];

const Template: ComponentStory<typeof PostBox> = (args) => {
  return <PostBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  title: 'Category Name',
  posts: Array.from({length: 10}).map((_, i) => ({
    ...tempPosts[Math.round(Math.random())],
    contentId: i,
  })),
};
