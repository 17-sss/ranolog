import {Meta, StoryObj} from '@storybook/react';

import {codeblock, sampleMarkdown, PageLayout} from '@src/shared';

import ResumePage from './index.page';

const meta: Meta<typeof ResumePage> = {
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
};
export default meta;

// ------

type Story = StoryObj<typeof ResumePage>;

export const Default: Story = {
  args: {
    resumeDoc: {
      id: '0',
      date: new Date().toString(),
      subject: 'Resume',
      name: 'Name',
      job: 'Engineer',
      email: 'email@email.com',
      introduce: ['INTRODUCE1', 'INTRODUCE2', 'INTRODUCE3'],
      content: `${sampleMarkdown}\n${codeblock}`,
    },
  },
};
