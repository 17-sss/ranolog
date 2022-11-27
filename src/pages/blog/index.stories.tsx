import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostDocsMock, PageLayout} from '@shared';

import BlogPage from './index.page';

const storyDefault = {
  title: 'pages/blog/BlogPage',
  component: BlogPage,
} as ComponentMeta<typeof BlogPage>;

export default storyDefault;

const Template: ComponentStory<typeof BlogPage> = (args) => {
  return (
    <PageLayout>
      <BlogPage {...args} />
    </PageLayout>
  );
};

export const Default = Template.bind({});
Default.args = {
  postDocs: createSortedPostDocsMock(50),
};
