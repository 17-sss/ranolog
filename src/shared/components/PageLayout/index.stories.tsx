import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import PageLayout from '.';

const storyDefault = {
  title: 'components/shared/PageLayout',
  component: PageLayout,
} as ComponentMeta<typeof PageLayout>;

export default storyDefault;

const Template: ComponentStory<typeof PageLayout> = (args) => {
  return <PageLayout {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  children: Array.from({length: 10}).map((_, i) => <p key={i}>{i + 1}</p>),
};
export const Overflow = Template.bind({});
Overflow.args = {
  children: Array.from({length: 500}).map((_, i) => <p key={i}>{i + 1}</p>),
};
