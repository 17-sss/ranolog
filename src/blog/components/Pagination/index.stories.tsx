import React, {useMemo} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {usePagination} from '@src/blog';
import {useMedia, createPostDocsMock} from '@src/shared';

import Pagination, {PaginationProps} from '.';

interface PaginationStoryProps extends PaginationProps {
  dataLength?: number;
  pageUnit?: number;
  postUnit?: number;
}

// --

const storyDefault = {
  title: 'components/blog/Pagination',
  component: Pagination,
} as ComponentMeta<React.FC<PaginationStoryProps>>;

export default storyDefault;

const Template: ComponentStory<React.FC<PaginationStoryProps>> = ({
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

export const Default = Template.bind({});
Default.args = {
  dataLength: 100,
  pageUnit: 5,
  postUnit: 5,
};
