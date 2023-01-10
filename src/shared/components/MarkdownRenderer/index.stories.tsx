import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import MarkdownRenderer from '.';
import {codeblock, sampleCustomComponents, sampleMarkdown} from '../../mocks';

const storyDefault = {
  title: 'components/shared/MarkdownRenderer',
  component: MarkdownRenderer,
} as ComponentMeta<typeof MarkdownRenderer>;

export default storyDefault;

const Template: ComponentStory<typeof MarkdownRenderer> = ({content, ...args}) => {
  return <MarkdownRenderer {...args} content={content} />;
};

export const Default = Template.bind({});
Default.args = {content: `${sampleMarkdown}\n${codeblock}`};

export const CustomComponents = Template.bind({});
CustomComponents.args = {content: sampleCustomComponents};
