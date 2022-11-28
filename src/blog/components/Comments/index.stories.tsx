import {ComponentMeta, ComponentStory} from '@storybook/react';

import {utterancAttrs} from '@src/blog';

import Comments from './index';

const storyDefault = {
  title: 'components/blog/Comments',
  component: Comments,
} as ComponentMeta<typeof Comments>;

export default storyDefault;

const Template: ComponentStory<typeof Comments> = (args) => {
  return <Comments {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  attributes: utterancAttrs,
};
