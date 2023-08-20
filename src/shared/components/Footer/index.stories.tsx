import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {staticDataInfo} from '@root/ranolog.config';

import Footer, {FooterProps} from './index';
import {CssProp, systemCss} from '../../system';

const storyDefault = {
  title: 'components/shared/Footer',
  component: Footer,
  argTypes: {
    contact: {control: false},
    css: {table: {disable: true}},
  },
} as ComponentMeta<typeof Footer>;

export default storyDefault;

const Template: ComponentStory<React.FC<FooterProps & {css: CssProp}>> = (args) => {
  return <Footer {...args} />;
};

export const Default = Template.bind({});
Default.args = {...staticDataInfo.layout.footer};

export const WithMarginTop = Template.bind({});
WithMarginTop.args = {...Default.args, css: systemCss({mt: '1rem'})};
