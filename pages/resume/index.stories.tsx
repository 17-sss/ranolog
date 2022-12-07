import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {PageLayout, sampleMDXData} from '@src/shared';

import ResumePage from './index.page';

const storyDefault = {
  title: 'pages/resume/ResumePage',
  component: ResumePage,
  argTypes: {
    resumeDoc: {
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
} as ComponentMeta<typeof ResumePage>;

export default storyDefault;

const Template: ComponentStory<typeof ResumePage> = (args) => {
  return <ResumePage {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  resumeDoc: {
    id: '0',
    date: new Date().toString(),
    subject: 'Resume',
    name: 'Name',
    job: 'Engineer',
    email: 'email@email.com',
    introduce: ['INTRODUCE1', 'INTRODUCE2', 'INTRODUCE3'],
    extension: '.mdx',
    content: sampleMDXData,
  },
};
