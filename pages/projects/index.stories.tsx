import {Meta, StoryObj} from '@storybook/react';

import {createSortedProjectDocsMock, PageLayout} from '@src/shared';

import ProjectPage from './index.page';

const meta: Meta<typeof ProjectPage> = {
  title: 'pages/projects/ProjectPage',
  component: ProjectPage,
  argTypes: {
    projectDocs: {
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

type Story = StoryObj<typeof ProjectPage>;

export const Default: Story = {args: {projectDocs: createSortedProjectDocsMock()}};
