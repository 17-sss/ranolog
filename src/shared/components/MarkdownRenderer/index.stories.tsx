import {StoryObj, Meta} from '@storybook/react';

import MarkdownRenderer from './index';
import {codeblock, sampleCustomComponents, sampleMarkdown} from '../../mocks';

const meta: Meta<typeof MarkdownRenderer> = {
  title: 'components/shared/MarkdownRenderer',
  component: MarkdownRenderer,
};
export default meta;

// ------

type Story = StoryObj<typeof MarkdownRenderer>;

export const Default: Story = {args: {content: `${sampleMarkdown}\n${codeblock}`}};
export const CustomComponents: Story = {args: {content: sampleCustomComponents}};
