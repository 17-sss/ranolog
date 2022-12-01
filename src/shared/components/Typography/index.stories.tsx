import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {CssProp, systemCss} from '../../system';
import {variantKeys} from './constants';
import Typography from './index';

const storyDefault = {
  title: 'components/shared/Typography',
  component: Typography,
  argTypes: {
    variant: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Typography>;

export default storyDefault;

const Template: ComponentStory<typeof Typography> = ({...args}) => {
  return (
    <ul css={listCss}>
      {variantKeys.map((aVariant, i) => (
        <li key={i}>
          <span> {`<${aVariant}>`}</span>&nbsp;
          <Typography variant={aVariant} {...args} />
        </li>
      ))}
    </ul>
  );
};
const listCss: CssProp = systemCss({
  '& > li': {
    display: 'flex',
    alignItems: 'center',
  },
  '& > li + li': {
    mt: '1rem',
  },
});

export const Default = Template.bind({});
Default.args = {
  children: 'Text',
};
