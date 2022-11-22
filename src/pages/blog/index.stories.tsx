import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostDocsMock} from '@src/blog/mocks';

import BlogPage from './index';

const storyDefault = {
  title: 'pages/blog/BlogPage',
  component: BlogPage,
} as ComponentMeta<typeof BlogPage>;

export default storyDefault;

const Template: ComponentStory<typeof BlogPage> = (args) => {
  return <BlogPage {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  postDocs: createSortedPostDocsMock(50),
};
