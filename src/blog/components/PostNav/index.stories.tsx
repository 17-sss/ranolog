import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createPostDocsMock, sampleContentHtml, samplePrismHtml} from '@src/shared';

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
  const postData = createPostDocsMock(2).map((doc, idx) => ({
    ...doc,
    id: `${idx}`,
    subject: `${doc.subject} ${idx % 2 === 0 ? 'prev' : 'next'}`,
    content: `${sampleContentHtml}${samplePrismHtml}`,
  }));
  return {
    prevDoc: postData[0],
    nextDoc: postData[1],
  };
})();

export const Default = Template.bind({});
Default.args = {
  ...docs,
};
