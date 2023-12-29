import React from 'react';

import {Meta, StoryObj} from '@storybook/react';

import Divider from '.';
import {systemCss} from '../../system';

const meta: Meta<typeof Divider> = {
  title: 'components/shared/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <div css={systemCss({pt: '1rem'})}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

// ------

type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
export const WithText: Story = {...Default, args: {children: 'I am Divider'}};
