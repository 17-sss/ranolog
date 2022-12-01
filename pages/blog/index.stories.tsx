import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedPostDocsMock, PageLayout} from '@src/shared';

import BlogPage from './index.page';

const storyDefault = {
  title: 'pages/blog/BlogPage',
  component: BlogPage,
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
} as ComponentMeta<typeof BlogPage>;

export default storyDefault;

const Template: ComponentStory<typeof BlogPage> = (args) => {
  return <BlogPage {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  postDocs: createSortedPostDocsMock(50),
};
