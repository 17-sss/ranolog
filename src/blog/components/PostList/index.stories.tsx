import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostsMock} from '@src/blog/mocks';

import PostList from '.';

const storyDefault = {
  title: 'components/blog/PostList',
  component: PostList,
} as ComponentMeta<typeof PostList>;

export default storyDefault;

const Template: ComponentStory<typeof PostList> = (args) => {
  return <PostList {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  posts: createSortedPostsMock(119),
};
