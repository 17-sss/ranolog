import React from 'react';

import {ComponentStory, ComponentMeta} from '@storybook/react';

import MarkdownRenderer from '.';

const storyDefault = {
  title: 'components/shared/MarkdownRenderer',
  component: MarkdownRenderer,
} as ComponentMeta<typeof MarkdownRenderer>;

export default storyDefault;

const sampleContentHtml = `<p>We recommend using <strong>Static Generation</strong> (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.</p>
<p>You can use Static Generation for many types of pages, including:</p>
<ul>
<li>Marketing pages</li>
<li>Blog posts</li>
<li>E-commerce product listings</li>
<li>Help and documentation</li>
</ul>
<p>You should ask yourself: "Can I pre-render this page <strong>ahead</strong> of a user's request?" If the answer is yes, then you should choose Static Generation.</p>
<p>On the other hand, Static Generation is <strong>not</strong> a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.</p>
<p>In that case, you can use <strong>Server-Side Rendering</strong>. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.</p>`;

const Template: ComponentStory<typeof MarkdownRenderer> = (args) => {
  return <MarkdownRenderer {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  contentHtml: sampleContentHtml,
};

export const TextOnly = Template.bind({});
TextOnly.args = {
  contentHtml: sampleContentHtml,
  textOnly: true,
};
