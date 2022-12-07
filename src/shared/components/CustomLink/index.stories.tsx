import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import CustomLink from '.';

const storyDefault = {
  title: 'components/shared/CustomLink',
  component: CustomLink,
} as ComponentMeta<typeof CustomLink>;

export default storyDefault;

const Template: ComponentStory<typeof CustomLink> = (args) => {
  return <CustomLink {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  href: '/',
  children: "Internal link(root('/'))",
};

export const External = Template.bind({});
External.args = {
  href: 'https://www.google.com/',
  children: 'External link(google)',
};
