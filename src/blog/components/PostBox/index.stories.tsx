import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createPostsMock} from '@src/blog/mocks';

import PostBox from '.';

const storyDefault = {
  title: 'components/blog/PostBox',
  component: PostBox,
} as ComponentMeta<typeof PostBox>;

export default storyDefault;

const Template: ComponentStory<typeof PostBox> = (args) => {
  return <PostBox {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  categoryName: 'Category Name',
  posts: createPostsMock(20),
};
