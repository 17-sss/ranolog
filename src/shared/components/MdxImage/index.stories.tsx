import {Meta, StoryObj} from '@storybook/react';

import MdxImage from './index';
import {emptySource} from '../../assets';

const meta: Meta<typeof MdxImage> = {
  title: 'components/shared/MdxImage',
  component: MdxImage,
};

export default meta;

type Story = StoryObj<typeof MdxImage>;
// ------
export const WithWrapper: Story = {
  args: {
    alt: '이미지',
    blurDataURL: emptySource.blurDataURL,
    src: emptySource.src,
    as: 'div',
  },
};

export const WithParagraph: Story = {
  args: {
    ...WithWrapper.args,
    as: 'p',
  },
};
