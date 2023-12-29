import {StoryObj, Meta} from '@storybook/react';

import {createProjectDocsMock} from '@src/shared';

import ProjectInfo from './index';

const meta: Meta<typeof ProjectInfo> = {
  title: 'components/projects/ProjectInfo',
  component: ProjectInfo,
};
export default meta;

// ------

type Story = StoryObj<typeof ProjectInfo>;

export const Default: Story = {
  args: {
    ...(() => {
      const {content: _content, ...restInfo} = createProjectDocsMock(1)[0];
      return restInfo;
    })(),
  },
};
