import {StoryObj, Meta} from '@storybook/react';

import ResumeInfo from './index';

const meta: Meta<typeof ResumeInfo> = {
  title: 'components/resume/ResumeInfo',
  component: ResumeInfo,
};
export default meta;

// ------

type Story = StoryObj<typeof ResumeInfo>;
export const Default: Story = {
  args: {
    subject: 'Resume',
    name: 'Name',
    job: 'Engineer',
    email: 'email@email.com',
    introduce: ['INTRODUCE1', 'INTRODUCE2', 'INTRODUCE3'],
  },
};
