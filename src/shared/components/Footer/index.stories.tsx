import {StoryObj, Meta} from '@storybook/react';

import {staticDataInfo} from '@root/ranolog.config';

import Footer, {FooterProps} from './index';
import {CssProp, systemCss} from '../../system';

interface FooterStoryProps extends FooterProps {
  css?: CssProp;
}

const meta: Meta<FooterStoryProps> = {
  title: 'components/shared/Footer',
  component: Footer,
  argTypes: {
    contact: {control: false},
    css: {table: {disable: true}},
  },
};
export default meta;

// ------

type Story = StoryObj<FooterStoryProps>;
export const Default: Story = {
  args: {...staticDataInfo.layout.footer},
};
export const WithMarginTop: Story = {
  ...Default,
  args: {
    ...Default.args,
    css: systemCss({mt: '1rem'}),
  },
};
