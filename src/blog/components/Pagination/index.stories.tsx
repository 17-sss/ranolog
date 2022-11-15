import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {useMedia} from '@shared';
import {usePagination} from '@src/blog';

import Pagination, {PaginationProps} from '.';

const storyDefault = {
  title: 'components/blog/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export default storyDefault;

interface PaginationStoryProps extends PaginationProps {
  dataLength: number;
  pageUnit?: number;
  postUnit?: number;
}

const Template: ComponentStory<React.FC<PaginationStoryProps>> = ({
  dataLength,
  pageUnit,
  postUnit,
  ...args
}) => {
  const {isMobile} = useMedia();
  const {pageInfo, pageNums, /* currentData */ handlePageButtonClick} = usePagination({
    data: Array.from({length: dataLength}, (_, i) => i),
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

export const Default = Template.bind({});
Default.args = {
  dataLength: 123,
  pageUnit: 5,
  postUnit: 5,
};
