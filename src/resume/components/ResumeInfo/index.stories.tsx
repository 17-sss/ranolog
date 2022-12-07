import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import ResumeInfo from './index';

const storyDefault = {
  title: 'components/resume/ResumeInfo',
  component: ResumeInfo,
} as ComponentMeta<typeof ResumeInfo>;

export default storyDefault;

const Template: ComponentStory<typeof ResumeInfo> = (args) => {
  return <ResumeInfo {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  subject: 'Resume',
  name: 'Name',
  job: 'Engineer',
  email: 'email@email.com',
  introduce: ['INTRODUCE1', 'INTRODUCE2', 'INTRODUCE3'],
};
