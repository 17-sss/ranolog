import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import DocNav from './index';

const storyDefault = {
  title: 'components/shared/DocNav',
  component: DocNav,
} as ComponentMeta<typeof DocNav>;

export default storyDefault;

const Template: ComponentStory<typeof DocNav> = (args) => {
  return <DocNav {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  prevDoc: {id: '1', subject: 'prevDocument'},
  nextDoc: {id: '0', subject: 'nextDocument'},
};
