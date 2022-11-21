import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import MarkdownRenderer from '.';

const storyDefault = {
  title: 'components/shared/MarkdownRenderer',
  component: MarkdownRenderer,
} as ComponentMeta<typeof MarkdownRenderer>;

export default storyDefault;

const Template: ComponentStory<typeof MarkdownRenderer> = (args) => {
  return <MarkdownRenderer {...args} />;
};

export const Default = Template.bind({});
