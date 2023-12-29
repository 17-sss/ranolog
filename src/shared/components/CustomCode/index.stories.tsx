import React, {useMemo} from 'react';

import {Meta, StoryObj} from '@storybook/react';

import CustomCode, {CustomCodeProps, colorNames} from './index';
import {removeDuplicateValues} from '../../functions';
import {systemCss, CssProp} from '../../system';
import {themeColorNames} from '../../theme';

const meta: Meta<typeof CustomCode> = {
  title: 'components/shared/CustomCode',
  component: CustomCode,
  decorators: [
    (Story) => (
      <div
        css={systemCss({
          p: '0.5rem',
          strong: {
            fontWeight: 600,
          },
          '& > * + *': {
            ml: '0.25rem',
          },
        })}
      >
        <Story />
      </div>
    ),
  ],
};
export default meta;

// ------

type Story = StoryObj<typeof CustomCode>;
const defaultChildren = 'CustomCode';

export const Default_Red: Story = {args: {children: defaultChildren, color: 'red'}};
export const Blue: Story = {args: {children: defaultChildren, color: 'blue'}};
export const Brown: Story = {args: {children: defaultChildren, color: 'brown'}};
export const Green: Story = {args: {children: defaultChildren, color: 'green'}};
export const Orange: Story = {args: {children: defaultChildren, color: 'orange'}};
export const Pink: Story = {args: {children: defaultChildren, color: 'pink'}};
export const Purple: Story = {args: {children: defaultChildren, color: 'purple'}};
export const Gray: Story = {args: {children: defaultChildren, color: 'gray'}};
export const Yellow: Story = {args: {children: defaultChildren, color: 'yellow'}};

const AllColorTemplate: React.FC<CustomCodeProps> = ({children, ...args}) => {
  const allColorNames = useMemo(() => {
    return removeDuplicateValues([...colorNames, ...themeColorNames]);
  }, []);
  return (
    <>
      {allColorNames.map((color) => (
        <p key={color}>
          <strong>{color}</strong>
          &nbsp;
          <CustomCode color={color} {...args}>
            {children}
          </CustomCode>
          <CustomCode color={color} isBold {...args}>
            {children}
          </CustomCode>
        </p>
      ))}
    </>
  );
};
export const AllColors: Story = {
  render: (args) => <AllColorTemplate {...args} />,
  args: {children: defaultChildren},
};
