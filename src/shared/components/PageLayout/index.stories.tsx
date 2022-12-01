import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import PageLayout from '.';

const storyDefault = {
  title: 'components/shared/PageLayout',
  component: PageLayout,
  parameters: {controls: {disable: true}},
} as ComponentMeta<typeof PageLayout>;

export default storyDefault;

const Template: ComponentStory<typeof PageLayout> = (args) => {
  return <PageLayout {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
