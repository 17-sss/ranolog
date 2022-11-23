import samplePostImage from '../../assets/sample_post.jpeg';
import {PostDocument} from '../../types';

export const tempPosts: Omit<PostDocument, 'id' | 'category' | 'date'>[] = [
  {
    subject: 'Fusce suscipit lorem',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non elit dignissim, cursus mi et, consequat orci. Aenean sed dignissim ipsum. Curabitur varius orci sodales suscipit ultricies. Nulla facilisi. Proin tincidunt, purus a sollicitudin blandit, erat lectus molestie orci, at ultrices tortor nisi non ligula. Vestibulum bibendum mollis sollicitudin. Phasellus sagittis volutpat fermentum. Nulla finibus vitae mi sed semper. Aliquam blandit maximus fermentum. Proin interdum dolor a nulla sagittis viverra. Sed molestie sed nisl hendrerit porta. Morbi finibus quam magna, eu faucibus justo condimentum at. Vivamus maximus erat a tortor gravida tempor. Aliquam sit amet aliquam odio. Duis dui diam, blandit sit amet varius at, vehicula vitae est. Proin ut enim volutpat, luctus lorem ac, sollicitudin sem.',
  },
  {
    subject: 'dolor sit amet',
    content:
      'Nam a felis finibus, varius nulla in, tempus lectus. Donec eget odio et turpis porta rhoncus vitae non magna. Praesent ullamcorper lectus eget eros commodo dignissim sit amet vel sapien.',

    imageSrc: samplePostImage,
  },
];

export const sampleContentHtml = `<p>We recommend using <strong>Static Generation</strong> (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request</p>
<blockquote>
<p><strong>blockquote</strong></p>
</blockquote>
<p><a href="https://naver.com">네이버</a></p>
<ul>
<li><a href="https://naver.com">네이버</a>
<ul>
<li>큭큭</li>
</ul>
</li>
</ul>
<p>You can use Static Generation for many types of pages, including:</p>
<ul>
<li>Marketing pages</li>
<li>Blog posts</li>
<li>E-commerce product listings</li>
<li>Help and documentation</li>
</ul>
<p>You should ask yourself: "Can I pre-render this page <strong>ahead</strong> of a user's request?" If the answer is yes, then you should choose Static Generation.</p>
<p>On the other hand, Static Generation is <strong>not</strong> a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.</p>
<p>In that case, you can use <strong>Server-Side Rendering</strong>. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.</p>
`;
