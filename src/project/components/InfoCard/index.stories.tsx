import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createProjectDocsMock} from '@src/shared';

import InfoCard from './index';

const storyDefault = {
  title: 'components/project/InfoCard',
  component: InfoCard,
} as ComponentMeta<typeof InfoCard>;

export default storyDefault;

const Template: ComponentStory<typeof InfoCard> = (args) => {
  return <InfoCard {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  ...createProjectDocsMock(1)[0],
};
