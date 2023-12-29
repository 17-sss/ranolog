import React, {useMemo} from 'react';

import {StoryObj, Meta} from '@storybook/react';

import {createSortedPostDocsMock} from '@src/shared';

import PostList, {PostListProps} from './index';

interface PostListStoryProps extends PostListProps {
  dataLength?: number;
}

const meta: Meta<PostListStoryProps> = {
  title: 'components/blog/PostList',
  component: PostList,
  argTypes: {
    postDocs: {control: false},
  },
};
export default meta;

// ------

type Story = StoryObj<PostListStoryProps>;
export const Default: Story = {
  render: ({dataLength, ...args}) => {
    const postDocs = createSortedPostDocsMock(dataLength);
    return <PostList {...args} postDocs={postDocs} />;
  },
  args: {dataLength: 20},
};
