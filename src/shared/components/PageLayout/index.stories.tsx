import {StoryObj, Meta} from '@storybook/react';

import PageLayout from './index';

const meta: Meta<typeof PageLayout> = {
  title: 'components/shared/PageLayout',
  component: PageLayout,
  parameters: {controls: {disable: true}},
};
export default meta;

// ------

type Story = StoryObj<typeof PageLayout>;
export const Default: Story = {};
