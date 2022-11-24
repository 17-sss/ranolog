import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createPostDocsMock, sampleContentHtml, samplePrismHtml} from '@shared';

import PostNav from './index';

const storyDefault = {
  title: 'components/blog/PostNav',
  component: PostNav,
} as ComponentMeta<typeof PostNav>;

export default storyDefault;

const Template: ComponentStory<typeof PostNav> = (args) => {
  return <PostNav {...args} />;
};

const docs = (() => {
  const postData = {
    ...createPostDocsMock(1)[0],
    content: `${sampleContentHtml}${samplePrismHtml}`,
  };
  return {
    prevDoc: {...postData, subject: `${postData.subject} prev`},
    nextDoc: {...postData, subject: `${postData.subject} next`},
  };
})();

export const Default = Template.bind({});
Default.args = {
  ...docs,
};
