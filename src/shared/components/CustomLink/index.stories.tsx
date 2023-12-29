import {Meta, StoryObj} from '@storybook/react';

import CustomLink from './index';

const meta: Meta<typeof CustomLink> = {
  title: 'components/shared/CustomLink',
  component: CustomLink,
};
export default meta;

// ------

type Story = StoryObj<typeof CustomLink>;
export const Internal: Story = {
  args: {
    href: '/',
    children: "Internal link(root('/'))",
    defaultStyle: false,
  },
};
export const External: Story = {
  args: {
    href: 'https://www.google.com/',
    children: 'External link(google)',
    defaultStyle: false,
  },
};
export const Notion_link_style: Story = {
  args: {
    href: '/',
    children: 'Notion link style',
    defaultStyle: true,
  },
};
