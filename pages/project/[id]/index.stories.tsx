import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {PageLayout} from '@src/shared';

import ProjectDetailPage from './index.page';

const storyDefault = {
  title: 'pages/project/ProjectDetailPage',
  component: ProjectDetailPage,
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

export const Default = Template.bind({});
Default.args = {};
