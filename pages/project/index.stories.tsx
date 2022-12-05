import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {PageLayout} from '@src/shared';

import ProjectPage from './index.page';

const storyDefault = {
  title: 'pages/project/ProjectPage',
  component: ProjectPage,
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
Default.args = {};
