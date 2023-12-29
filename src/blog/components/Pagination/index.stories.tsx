import React, {useMemo} from 'react';

import {Meta, StoryObj} from '@storybook/react';

import {usePagination} from '@src/blog';
import {useMedia, createPostDocsMock} from '@src/shared';

import Pagination, {PaginationProps} from './index';

interface PaginationStoryProps extends PaginationProps {
  dataLength?: number;
  pageUnit?: number;
  postUnit?: number;
}

const meta: Meta<PaginationStoryProps> = {
  title: 'components/blog/Pagination',
  component: Pagination,
  argTypes: {
    pageNums: {table: {disable: true}},
    pageInfo: {table: {disable: true}},
  },
};
export default meta;

// ------

type Story = StoryObj<PaginationStoryProps>;
const PaginationStoryWithHooks: React.FC<PaginationStoryProps> = ({
  dataLength,
  pageUnit,
  postUnit,
  ...args
}) => {
  const {isMobile} = useMedia();
  const data = useMemo(() => createPostDocsMock(dataLength), [dataLength]);
  const {pageInfo, pageNums, /* currentData */ handlePageButtonClick} = usePagination({
    data,
    pageUnit: isMobile ? 3 : pageUnit ?? 5,
    postUnit: postUnit ?? 5,
  });
  return (
    <Pagination
      {...args}
      pageInfo={pageInfo}
      pageNums={pageNums}
      handlePageButtonClick={handlePageButtonClick}
    />
  );
};

export const Default: Story = {
  render: (args) => <PaginationStoryWithHooks {...args} />,
  args: {
    dataLength: 100,
    pageUnit: 5,
    postUnit: 5,
  },
};
