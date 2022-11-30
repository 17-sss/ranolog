import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import configData from '@root/blog.config';

import {CssProp, systemCss} from '../../system';
import Footer, {FooterProps} from './index';

const storyDefault = {
  title: 'components/shared/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

export default storyDefault;

const Template: ComponentStory<React.FC<FooterProps & {css: CssProp}>> = (args) => {
  return <Footer {...args} />;
};

export const Default = Template.bind({});
Default.args = {author: configData.author, contact: configData.contact};

export const WithMarginTop = Template.bind({});
WithMarginTop.args = {...Default.args, css: systemCss({mt: '1rem'})};
