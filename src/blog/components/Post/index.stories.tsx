import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createPostDocsMock, sampleContentHtml, samplePrismHtml} from '@src/shared';

import Post from './index';

const storyDefault = {
  title: 'components/blog/Post',
  component: Post,
} as ComponentMeta<typeof Post>;

export default storyDefault;

const Template: ComponentStory<typeof Post> = (args) => {
  return <Post {...args} />;
};

const POST_DATA = {...createPostDocsMock(1)[0], content: `${sampleContentHtml}${samplePrismHtml}`};
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
