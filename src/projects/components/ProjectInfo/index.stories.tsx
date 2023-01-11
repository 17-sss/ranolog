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

const sampleProject = (() => {
  const {subject, date, category, id, links, skills, summary, thumbnail} =
    createProjectDocsMock(1)[0];
  return {subject, date, category, id, links, skills, summary, thumbnail};
})();

export const Default = Template.bind({});
Default.args = {...sampleProject};
