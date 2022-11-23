import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import MarkdownRenderer from '.';
import {sampleContentHtml} from '../../mocks';

const storyDefault = {
  title: 'components/shared/MarkdownRenderer',
  component: MarkdownRenderer,
} as ComponentMeta<typeof MarkdownRenderer>;

export default storyDefault;

const Template: ComponentStory<typeof MarkdownRenderer> = (args) => {
  return <MarkdownRenderer {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  contentHtml: sampleContentHtml,
};

export const TextOnly = Template.bind({});
TextOnly.args = {
  contentHtml: sampleContentHtml,
  textOnly: true,
};
