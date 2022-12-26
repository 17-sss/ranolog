import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {systemCss} from '../../system';
import {variantKeys} from './constants';
import Typography from './index';

const storyDefault = {
  title: 'components/shared/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

export default storyDefault;

const defaultChildren = 'Typography';

const Template: ComponentStory<typeof Typography> = ({variant = 'span', ...args}) => {
  return (
    <>
      <span> {`<${variant}>`}</span>&nbsp;
      <Typography variant={variant} {...args} />
    </>
  );
};
export const Default = Template.bind({});
Default.args = {children: defaultChildren};

// ---

const AllVariantTemplate: ComponentStory<typeof Typography> = ({...args}) => {
  return (
    <>
      {variantKeys.map((aVariant, i) => (
        <div key={i} css={systemCss({'& + &': {mt: '1rem'}})}>
          <span> {`<${aVariant}>`}</span>&nbsp;
          <Typography variant={aVariant} {...args} />
        </div>
      ))}
    </>
  );
};

export const AllVariant = AllVariantTemplate.bind({});
AllVariant.args = {children: defaultChildren};
