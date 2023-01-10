import {PostDocument, ProjectDocument} from '../types';

export const headings = `# > Headings\n
# h1\n
## h2\n
### h3\n
#### h4\n
##### h5\n
###### h6\n`;

export const textCodeHrAnchor = `# > Texts & code & hr & anchor\n
**bold**\n
_italic_\n
~~strikethrough~~\n
\`code\`\n
---\n
[Anchor (about:blank)](about:blank)\n`;

export const contents = `# > Contents\n
We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a ~~server~~ render the page _on_ every request\n
You can use **_Static Generation_** for many types of pages, including:\n
  - Marketing pages
    - pages
      - \`pages\`
  1. Blog posts
  2. posts
  3. test
  - E-commerce product listings
  - Help and documentation\n`;

export const table = `# > Table\n
| th 1 | th 2 | th 3 |
| ---- | ---- | ---- |
| td 1 | td 2 | td 3 |
| td 1 | td 2 | td 3 |
| td 1 | td 2 | td 3 |
| td 1 | td 2 | td 3 |\n`;

export const blockquote = `# > Blockquote\n
> Blockquote??
>
> > inner Blockquote??
> >
> > > inner inner Blockquote??\n`;

export const codeblock = `# > Code Block\n
\`\`\`js
const num = 1;
const str = '1';
function func() {
  const result = [];
  result.push(1);
  return result;
}
\`\`\`\n`;

export const sampleCustomComponents = `<Typography variant="h3" backgroundColor="gray">Heading3 (Typography)</Typography>
<br/>
<CustomCode color="blue">BlueCode</CustomCode>
<br/>
<Divider height="1rem" color="gray300">Divider</Divider>
<br/>
<Typography variant="div" fontSize="p15">
  <FlexBox gap="0.25rem" flexWrap="wrap">
    {Array.from({length: 10}).map((_, idx) => (
      <CustomCode key={idx} color="gray">
        <span>FlexBox Item_{idx}</span>
      </CustomCode>
    ))}
  </FlexBox>
</Typography>
\n`;

export const sampleMarkdown = [headings, textCodeHrAnchor, contents, table, blockquote].join('\n');

// --------------------------------

export const samplePosts: Omit<PostDocument, 'id' | 'category' | 'date'>[] = [
  {
    content: sampleMarkdown,
    subject: 'Fusce suscipit lorem',
  },
  {
    content: `${sampleMarkdown}\n${codeblock}`,
    subject: 'dolor sit amet',
    thumbnail: '/sample.jpg',
  },
];

export const sampleProjects: Omit<ProjectDocument, 'id' | 'category' | 'date'>[] = [
  {
    content: sampleMarkdown,
    subject: 'THE SAMPLE PROJECT',
    thumbnail: '/sample.jpg',
  },
  {
    content: `${sampleMarkdown}\n${codeblock}`,
    subject: 'Sample Project',
    links: [
      {text: 'Internal', href: '/'},
      {text: 'External(Naver)', href: 'https://www.naver.com/'},
    ],
  },
];
