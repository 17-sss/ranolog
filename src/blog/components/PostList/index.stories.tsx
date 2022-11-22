import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostDocsMock} from '@shared';

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
  postDocs: createSortedPostDocsMock(119),
};
