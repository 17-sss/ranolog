import React from 'react';

import {Meta, StoryObj} from '@storybook/react';

import {createSortedPostDocsMock, PageLayout} from '@src/shared';

import BlogDetailPage from './index.page';

const meta: Meta<typeof BlogDetailPage> = {
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
};
export default meta;

// ------

type Story = StoryObj<typeof BlogDetailPage>;
const postDocs = createSortedPostDocsMock(50);

export const Default: Story = {
  args: {postDocs},
  parameters: {
    nextjs: {
      router: {
        query: {
          id: postDocs[Math.floor(postDocs.length / 2)].id,
        },
      },
    },
  },
};
