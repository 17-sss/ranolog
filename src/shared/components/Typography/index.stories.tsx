import React from 'react';

import {StoryObj, Meta} from '@storybook/react';

import {variantKeys} from './constants';
import Typography from './index';
import {systemCss} from '../../system';

const meta: Meta<typeof Typography> = {
  title: 'components/shared/Typography',
  component: Typography,
};
export default meta;

// ------

type Story = StoryObj<typeof Typography>;
export const Default: Story = {
  args: {children: 'Typography'},
  render: ({variant = 'span', ...args}) => {
    return (
      <>
        <span> {`<${variant}>`}</span>&nbsp;
        <Typography variant={variant} {...args} />
      </>
    );
  },
};
export const AllVariant: Story = {
  ...Default,
  render: (args) => (
    <>
      {variantKeys.map((aVariant, i) => (
        <div key={i} css={systemCss({'& + &': {mt: '1rem'}})}>
          <span> {`<${aVariant}>`}</span>&nbsp;
          <Typography variant={aVariant} {...args} />
        </div>
      ))}
    </>
  ),
};
