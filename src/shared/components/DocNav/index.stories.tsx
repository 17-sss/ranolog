import {StoryObj, Meta} from '@storybook/react';

import DocNav from './index';

const meta: Meta<typeof DocNav> = {
  title: 'components/shared/DocNav',
  component: DocNav,
};
export default meta;

// ------

type Story = StoryObj<typeof DocNav>;
export const Default: Story = {
  args: {
    prevDoc: {id: '1', subject: 'prevDocument'},
    nextDoc: {id: '0', subject: 'nextDocument'},
  },
};
