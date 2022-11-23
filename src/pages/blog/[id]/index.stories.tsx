import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createPostDocsMock, sampleContentHtml} from '@shared';

import BlogDetailPage from '.';

const storyDefault = {
  title: 'pages/blog/BlogDetailPage',
  component: BlogDetailPage,
} as ComponentMeta<typeof BlogDetailPage>;

export default storyDefault;

const Template: ComponentStory<typeof BlogDetailPage> = (args) => {
  return <BlogDetailPage {...args} />;
};

const POST_DATA = {...createPostDocsMock(1)[0], content: sampleContentHtml};
export const No_Category = Template.bind({});
No_Category.args = {
  postDoc: {
    ...POST_DATA,
    category: undefined,
  },
};

export const Category = Template.bind({});
Category.args = {
  postDoc: {
    ...POST_DATA,
    category: 'React',
  },
};

export const Categories = Template.bind({});
Categories.args = {
  postDoc: {
    ...POST_DATA,
    category: ['React', 'JavaScript', 'DO IT', 'SAMPLE', 'JUST'],
  },
};
