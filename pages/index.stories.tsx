import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostDocsMock, PageLayout} from '@src/shared';

import MainPage from './index.page';

const storyDefault = {
  title: 'pages/main/MainPage',
  component: MainPage,
  argTypes: {
    postDocs: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <PageLayout>
        <Story />
      </PageLayout>
    ),
  ],
} as ComponentMeta<typeof MainPage>;

export default storyDefault;

const Template: ComponentStory<typeof MainPage> = (args) => {
  return <MainPage {...args} />;
};

export const Default = Template.bind({});
Default.args = {postDocs: createSortedPostDocsMock(3)};
