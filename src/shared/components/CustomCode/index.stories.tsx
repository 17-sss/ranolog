import React, {useMemo} from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import CustomCode, {colorNames} from '.';
import {removeDuplicateValues} from '../../functions';
import {systemCss, CssProp} from '../../system';
import {themeColorNames} from '../../theme';

const containerCss: CssProp = systemCss({
  p: '0.5rem',
  strong: {
    fontWeight: 600,
  },
  '& > * + *': {
    ml: '0.25rem',
  },
});

const storyDefault = {
  title: 'components/shared/CustomCode',
  component: CustomCode,
  decorators: [
    (Story) => (
      <div css={containerCss}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof CustomCode>;

export default storyDefault;

const defaultChildren = 'CustomCode';

const Template: ComponentStory<typeof CustomCode> = ({children, ...args}) => {
  return (
    <>
      <CustomCode {...args}>{children}</CustomCode>
      <CustomCode {...args} isBold>
        {children}
      </CustomCode>
    </>
  );
};

export const Default_Red = Template.bind({});
Default_Red.args = {children: defaultChildren, color: 'red'};

export const Blue = Template.bind({});
Blue.args = {children: defaultChildren, color: 'blue'};

export const Brown = Template.bind({});
Brown.args = {children: defaultChildren, color: 'brown'};

export const Green = Template.bind({});
Green.args = {children: defaultChildren, color: 'green'};

export const Orange = Template.bind({});
Orange.args = {children: defaultChildren, color: 'orange'};

export const Pink = Template.bind({});
Pink.args = {children: defaultChildren, color: 'pink'};

export const Purple = Template.bind({});
Purple.args = {children: defaultChildren, color: 'purple'};

export const Gray = Template.bind({});
Gray.args = {children: defaultChildren, color: 'gray'};

export const Yellow = Template.bind({});
Yellow.args = {children: defaultChildren, color: 'yellow'};

// ---

const AllColorTemplate: ComponentStory<typeof CustomCode> = ({children, ...args}) => {
  const allColorNames = useMemo(() => {
    return removeDuplicateValues([...colorNames, ...themeColorNames]);
  }, []);
  return (
    <>
      {allColorNames.map((color) => (
        <p key={color} css={systemCss({})}>
          <strong>{color}</strong>
          &nbsp;
          <Template color={color} {...args}>
            {children}
          </Template>
        </p>
      ))}
    </>
  );
};

export const AllColors = AllColorTemplate.bind({});
AllColors.args = {children: defaultChildren};
