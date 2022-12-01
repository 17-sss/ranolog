import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostDocsMock, PageLayout} from '@src/shared';

import BlogDetailPage from './index.page';

const storyDefault = {
  title: 'pages/blog/BlogDetailPage',
  component: BlogDetailPage,
  argTypes: {
    postDocs: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
} as ComponentMeta<typeof BlogDetailPage>;

export default storyDefault;

const Template: ComponentStory<typeof BlogDetailPage> = (args) => {
  return <BlogDetailPage {...args} />;
};

const postDocs = createSortedPostDocsMock(50);
export const Default = Template.bind({});
Default.args = {
  postDocs,
};
Default.parameters = {
  nextRouter: {
    query: {
      id: postDocs[Math.floor(postDocs.length / 2)].id,
    },
  },
};
