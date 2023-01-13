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

export const Internal = Template.bind({});
Internal.args = {
  href: '/',
  children: "Internal link(root('/'))",
  defaultStyle: false,
};

export const External = Template.bind({});
External.args = {
  href: 'https://www.google.com/',
  children: 'External link(google)',
  defaultStyle: false,
};

export const Notion_link_style = Template.bind({});
Notion_link_style.args = {
  href: '/',
  children: 'Notion link style',
  defaultStyle: true,
};
