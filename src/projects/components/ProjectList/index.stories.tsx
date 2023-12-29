import {StoryObj, Meta} from '@storybook/react';

import {createSortedProjectDocsMock} from '@src/shared';

import ProjectList, {ProjectListProps} from './index';

interface ProjectListStoryProps extends ProjectListProps {
  dataLength?: number;
}

const meta: Meta<ProjectListStoryProps> = {
  title: 'components/projects/ProjectList',
  component: ProjectList,
  argTypes: {projectDocs: {control: false}},
};

export default meta;

type Story = StoryObj<ProjectListStoryProps>;
// ------

export const Default: Story = {
  render: ({dataLength, ...args}) => {
    const projectDocs = createSortedProjectDocsMock(dataLength);
    return <ProjectList {...args} projectDocs={projectDocs} />;
  },
  args: {dataLength: 20},
};
