import React from 'react';

import {Meta, StoryObj} from '@storybook/react';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';

import {createPostDocsMock, MarkdownRenderer} from '@src/shared';

import PostDetail, {PostDetailProps} from './index';

interface PostDetailStoryProps extends PostDetailProps {
  content: string | MDXRemoteSerializeResult;
}

const meta: Meta<PostDetailStoryProps> = {
  title: 'components/blog/PostDetail',
  component: PostDetail,
  argTypes: {
    markdownRenderer: {table: {disable: true}},
  },
};
export default meta;

// ------

type Story = StoryObj<PostDetailStoryProps>;
const samplePost = (() => {
  const {subject, date, category, content} = createPostDocsMock(1)[0];
  return {subject, date, category, content};
})();

export const No_Category: Story = {
  render: ({content, ...args}) => (
    <PostDetail {...args} markdownRenderer={<MarkdownRenderer content={content} />} />
  ),
  args: {...samplePost, category: undefined},
};
export const Category: Story = {
  ...No_Category,
  args: {...samplePost, category: 'React'},
};
export const Categories: Story = {
  ...No_Category,
  args: {...samplePost, category: ['React', 'JavaScript', 'DO IT', 'SAMPLE', 'JUST']},
};
