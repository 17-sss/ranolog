import {StoryObj, Meta} from '@storybook/react';

import {createSortedProjectDocsMock, PageLayout} from '@src/shared';

import ProjectDetailPage from './index.page';

const meta: Meta<typeof ProjectDetailPage> = {
  title: 'pages/projects/ProjectDetailPage',
  component: ProjectDetailPage,
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

type Story = StoryObj<typeof ProjectDetailPage>;

export const Default: Story = (() => {
  const projectDocs = createSortedProjectDocsMock();
  return {
    args: {projectDocs},
    parameters: {
      nextjs: {
        router: {
          query: {
            id: projectDocs[Math.floor(projectDocs.length / 2)].id,
          },
        },
      },
    },
  };
})();
