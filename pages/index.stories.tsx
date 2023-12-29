import {Meta, StoryObj} from '@storybook/react';

import {createSortedPostDocsMock, PageLayout} from '@src/shared';

import MainPage from './index.page';

const meta: Meta<typeof MainPage> = {
  title: 'pages/main/MainPage',
  component: MainPage,
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

type Story = StoryObj<typeof MainPage>;

export const Default: Story = {args: {postDocs: createSortedPostDocsMock(3)}};
