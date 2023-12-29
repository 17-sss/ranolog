import {Meta, StoryObj} from '@storybook/react';

import {createSortedPostDocsMock, PageLayout} from '@src/shared';

import BlogPage from './index.page';

const meta: Meta<typeof BlogPage> = {
  title: 'pages/blog/BlogPage',
  component: BlogPage,
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

type Story = StoryObj<typeof BlogPage>;

export const Default: Story = {args: {postDocs: createSortedPostDocsMock(50)}};
