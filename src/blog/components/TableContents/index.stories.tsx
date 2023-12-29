import React from 'react';

import {Meta, StoryObj} from '@storybook/react';

import {useToc} from '@src/blog';

import TableContents, {TableContentsProps} from './index';

interface TableContentsStoryProps extends TableContentsProps {
  html: string;
}

const meta: Meta<TableContentsStoryProps> = {
  title: 'components/blog/TableContents',
  component: TableContents,
  argTypes: {contentItems: {control: false}},
};
export default meta;

// ------

type Story = StoryObj<TableContentsStoryProps>;
const TableContentsWithHooks: React.FC<TableContentsStoryProps> = ({html, ...args}) => {
  const {tableContentItems} = useToc(html);
  return <TableContents {...args} contentItems={tableContentItems} />;
};

export const Default: Story = {
  render: (args) => <TableContentsWithHooks {...args} />,
  args: {
    html:
      '<h1 id="heading1-1">Heading1 (1)</h1>' +
      '<h2 id="heading2-1">Heading2 (1)</h2>' +
      '<h1 id="heading1-2">Heading1 (2)</h1>' +
      '<h2 id="heading2-2">Heading2 (2)</h2>' +
      '<h4 id="heading4-1">Heading4 (1)</h4>' +
      '<h3 id="heading3-1">Heading3 (1)</h3>' +
      '<h4 id="heading4-2">Heading4 (2)</h4>' +
      '<h2 id="heading2-3">Heading2 (3)</h2>' +
      '<h1 id="heading1-3">Heading1 (3)</h1>`,',
  },
};
