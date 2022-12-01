import React, {useMemo} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostDocsMock} from '@src/shared';

import PostList, {PostListProps} from '.';

interface PostListStoryProps extends PostListProps {
  dataLength?: number;
}

const storyDefault = {
  title: 'components/blog/PostList',
  component: PostList,
  argTypes: {
    postDocs: {control: false},
  },
} as ComponentMeta<React.FC<PostListStoryProps>>;

export default storyDefault;

const Template: ComponentStory<React.FC<PostListStoryProps>> = ({dataLength, ...args}) => {
  const postDocs = useMemo(() => createSortedPostDocsMock(dataLength), [dataLength]);

  return <PostList {...args} postDocs={postDocs} />;
};

export const Default = Template.bind({});
Default.args = {
  dataLength: 100,
};
