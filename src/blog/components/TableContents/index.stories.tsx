import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import ContentsIdList from './index';

const storyDefault = {
  title: 'components/blog/ContentsIdList',
  component: ContentsIdList,
} as ComponentMeta<typeof ContentsIdList>;

export default storyDefault;

const Template: ComponentStory<typeof ContentsIdList> = (args) => {
  return <ContentsIdList {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  contentItems: [
    {
      id: 'Heading1-H1-(1)',
      text: 'Heading1 H1 (1)',
      nodeName: 'H1',
      href: './blog/sample#Heading1-H1-(1)',
      children: [],
    },
    {
      id: 'Heading1-H1-(2)',
      text: 'Heading1 H1 (2)',
      nodeName: 'H1',
      href: './blog/sample#Heading1-H1-(2)',
      children: [
        {
          id: 'Heading1-H1-(2)--Heading2-H2-(1)',
          text: 'Heading1 H1 (2)  Heading2 H2 (1)',
          nodeName: 'H2',
          href: './blog/sample#Heading1-H1-(2)--Heading2-H2-(1)',
          children: [
            {
              id: 'Heading1-H1-(2)--Heading2-H2-(1)--Heading3-H3-(1)',
              text: 'Heading1 H1 (2)  Heading2 H2 (1)  Heading3 H3 (1)',
              nodeName: 'H3',
              href: './blog/sample#Heading1-H1-(2)--Heading2-H2-(1)--Heading3-H3-(1)',
              children: [],
            },
            {
              id: 'Heading1-H1-(2)--Heading2-H2-(1)--Heading3-H3-(2)',
              text: 'Heading1 H1 (2)  Heading2 H2 (1)  Heading3 H3 (2)',
              nodeName: 'H3',
              href: './blog/sample#Heading1-H1-(2)--Heading2-H2-(1)--Heading3-H3-(2)',
              children: [],
            },
          ],
        },
        {
          id: 'Heading1-H1-(2)--Heading2-H2-(2)',
          text: 'Heading1 H1 (2)  Heading2 H2 (2)',
          nodeName: 'H2',
          href: './blog/sample#Heading1-H1-(2)--Heading2-H2-(2)',
          children: [
            {
              id: 'Heading1-H1-(2)--Heading2-H2-(2)--Heading3-H3-(1)',
              text: 'Heading1 H1 (2)  Heading2 H2 (2)  Heading3 H3 (1)',
              nodeName: 'H3',
              href: './blog/sample#Heading1-H1-(2)--Heading2-H2-(2)--Heading3-H3-(1)',
              children: [],
            },
          ],
        },
      ],
    },
    {
      id: 'Heading1-H1-(3)',
      text: 'Heading1 H1 (3)',
      nodeName: 'H1',
      href: './blog/sample#Heading1-H1-(3)',
      children: [],
    },
  ],
};
