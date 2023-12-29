import {StoryObj, Meta} from '@storybook/react';

import {staticDataInfo} from '@root/ranolog.config';

import Header from './index';

const meta: Meta<typeof Header> = {
  title: 'components/shared/Header',
  component: Header,
};
export default meta;

// ------

type Story = StoryObj<typeof Header>;
export const Default: Story = {
  args: {
    linkNames: ['home', 'blog', 'projects', 'resume'],
    profileImage: staticDataInfo.layout.header.profileImage,
  },
};
