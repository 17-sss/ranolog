import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedProjectDocsMock, PageLayout} from '@src/shared';

import ProjectPage from './index.page';

const storyDefault = {
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
} as ComponentMeta<typeof ProjectPage>;

export default storyDefault;

const Template: ComponentStory<typeof ProjectPage> = (args) => {
  return <ProjectPage {...args} />;
};

export const Default = Template.bind({});
Default.args = {projectDocs: createSortedProjectDocsMock()};
