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
  const postSubjects = createPostDocsMock(2).map(({id, subject}) => ({id, subject}));
  return {
    prevDocInfo: {...postSubjects[0], subject: `${postSubjects[0].subject} prev`},
    nextDocInfo: {...postSubjects[1], subject: `${postSubjects[1].subject} next`},
  };
})();

export const Default = Template.bind({});
Default.args = {...docs};
