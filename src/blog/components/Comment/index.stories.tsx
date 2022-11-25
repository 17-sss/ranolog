import {ComponentMeta, ComponentStory} from '@storybook/react';

import {utterancAttrs} from '@src/blog';

import Comment from './index';

const storyDefault = {
  title: 'components/blog/Comment',
  component: Comment,
} as ComponentMeta<typeof Comment>;

export default storyDefault;

const Template: ComponentStory<typeof Comment> = (args) => {
  return <Comment {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  attributes: utterancAttrs,
};
