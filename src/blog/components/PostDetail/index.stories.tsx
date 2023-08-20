import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';

import {createPostDocsMock, MarkdownRenderer} from '@src/shared';

import PostDetail, {PostDetailProps} from './index';

type PostDetailStoryType = React.FC<
  Omit<PostDetailProps, 'markdownRenderer'> & {content: string | MDXRemoteSerializeResult}
>;

const storyDefault = {
  title: 'components/blog/PostDetail',
  component: PostDetail,
  argTypes: {
    markdownRenderer: {table: {disable: true}},
  },
} as unknown as ComponentMeta<PostDetailStoryType>;

export default storyDefault;

const Template: ComponentStory<PostDetailStoryType> = ({content, ...args}) => {
  return <PostDetail {...args} markdownRenderer={<MarkdownRenderer content={content} />} />;
};

const samplePost = (() => {
  const {subject, date, category, content} = createPostDocsMock(1)[0];
  return {subject, date, category, content};
})();

export const No_Category = Template.bind({});
No_Category.args = {...samplePost};

export const Category = Template.bind({});
Category.args = {
  ...samplePost,
  category: 'React',
};

export const Categories = Template.bind({});
Categories.args = {
  ...samplePost,
  category: ['React', 'JavaScript', 'DO IT', 'SAMPLE', 'JUST'],
};
