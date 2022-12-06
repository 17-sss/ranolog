import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedProjectDocsMock, PageLayout} from '@src/shared';

import ProjectDetailPage from './index.page';

const storyDefault = {
  title: 'pages/project/ProjectDetailPage',
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
} as ComponentMeta<typeof ProjectDetailPage>;

export default storyDefault;

const Template: ComponentStory<typeof ProjectDetailPage> = (args) => {
  return <ProjectDetailPage {...args} />;
};

const projectDocs = createSortedProjectDocsMock();
export const Default = Template.bind({});
Default.args = {projectDocs};
Default.parameters = {
  nextRouter: {
    query: {
      id: projectDocs[Math.floor(projectDocs.length / 2)].id,
    },
  },
};
