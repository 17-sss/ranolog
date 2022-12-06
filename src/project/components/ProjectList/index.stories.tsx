import React, {useMemo} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import {createSortedProjectDocsMock} from '@src/shared';

import ProjectList, {ProjectListProps} from './index';

interface ProductListStoryProps extends ProjectListProps {
  dataLength?: number;
}

const storyDefault = {
  title: 'components/project/ProjectList',
  component: ProjectList,
  argTypes: {
    projectDocs: {control: false},
  },
} as ComponentMeta<React.FC<ProductListStoryProps>>;

export default storyDefault;

const Template: ComponentStory<React.FC<ProductListStoryProps>> = ({dataLength, ...args}) => {
  const projectDocs = useMemo(() => createSortedProjectDocsMock(dataLength), [dataLength]);
  return <ProjectList {...args} projectDocs={projectDocs} />;
};

export const Default = Template.bind({});
Default.args = {dataLength: 20};
