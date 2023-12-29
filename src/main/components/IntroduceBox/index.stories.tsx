import {StoryObj, Meta} from '@storybook/react';

import {staticDataInfo} from '@root/ranolog.config';

import IntroduceBox from './index';

const meta: Meta<typeof IntroduceBox> = {
  title: 'components/main/IntroduceBox',
  component: IntroduceBox,
};
export default meta;

// ------

type Story = StoryObj<typeof IntroduceBox>;
export const Default: Story = {
  args: {...staticDataInfo.pages.main.introduce},
};
