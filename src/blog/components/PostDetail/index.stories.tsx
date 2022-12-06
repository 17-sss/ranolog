import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createPostDocsMock, sampleContentHtml, samplePrismHtml} from '@src/shared';

import PostDetail from './index';

const storyDefault = {
  title: 'components/blog/PostDetail',
  component: PostDetail,
} as ComponentMeta<typeof PostDetail>;

export default storyDefault;

const Template: ComponentStory<typeof PostDetail> = (args) => {
  return <PostDetail {...args} />;
};

const postDoc = {
  ...createPostDocsMock(1)[0],
  content: `${sampleContentHtml}${samplePrismHtml}`,
};

export const No_Category = Template.bind({});
No_Category.args = {postDoc};

export const Category = Template.bind({});
Category.args = {
  postDoc: {...postDoc, category: 'React'},
};

export const Categories = Template.bind({});
Categories.args = {
  postDoc: {...postDoc, category: ['React', 'JavaScript', 'DO IT', 'SAMPLE', 'JUST']},
};
