import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createProjectDocsMock} from '@src/shared';

import ProjectDetail from './index';

const storyDefault = {
  title: 'components/project/ProjectDetail',
  component: ProjectDetail,
} as ComponentMeta<typeof ProjectDetail>;

export default storyDefault;

const Template: ComponentStory<typeof ProjectDetail> = (args) => {
  return <ProjectDetail {...args} />;
};

export const Default = Template.bind({});
Default.args = {projectDoc: createProjectDocsMock(1)[0]};
