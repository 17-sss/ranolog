import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {useMedia} from '@shared';
import {usePagination, createPostsMock} from '@src/blog';

import Pagination, {PaginationProps} from '.';

const storyDefault = {
  title: 'components/blog/Pagination',
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

export default storyDefault;

interface PaginationStoryProps extends PaginationProps {
  data: any[];
  pageUnit?: number;
  postUnit?: number;
}

const Template: ComponentStory<React.FC<PaginationStoryProps>> = ({
  data,
  pageUnit,
  postUnit,
  ...args
}) => {
  const {isMobile} = useMedia();

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
  data: createPostsMock(101),
  pageUnit: 5,
  postUnit: 5,
};
