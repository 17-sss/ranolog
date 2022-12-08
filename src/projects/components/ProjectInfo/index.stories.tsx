import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createProjectDocsMock} from '@src/shared';

import ProjectInfo from './index';

const storyDefault = {
  title: 'components/projects/ProjectInfo',
  component: ProjectInfo,
} as ComponentMeta<typeof ProjectInfo>;

export default storyDefault;

const Template: ComponentStory<typeof ProjectInfo> = (args) => {
  return <ProjectInfo {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...createProjectDocsMock(1)[0],
};
