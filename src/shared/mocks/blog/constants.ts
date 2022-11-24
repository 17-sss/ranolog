import samplePostImage from '../../assets/sample_post.jpeg';
import {PostDocument} from '../../types';

export const sampleContentHtml = `<h3>> Headings</h3>
<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h4>h4</h4>
<h5>h5</h5>
<h6>h6</h6>
<h3>> Texts &#x26; code &#x26; hr &#x26; anchor</h3>
<p><strong>bold</strong></p>
<p><em>italic</em></p>
<p><del>strikethrough</del></p>
<p><code>code</code></p>
<hr>
<p><a href="about:blank">Anchor (about:blank)</a></p>
<h3>> Contents</h3>
<p>We recommend using <strong>Static Generation</strong> (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a <del>server</del> render the page <em>on</em> every request</p>
<p>You can use <strong><em>Static Generation</em></strong> for many types of pages, including:</p>
<ul>
<li>Marketing pages
<ul>
<li>pages
<ul>
<li><code>pages</code></li>
</ul>
</li>
</ul>
</li>
</ul>
<ol>
<li>Blog posts</li>
<li>posts</li>
<li>test</li>
</ol>
<ul>
<li>E-commerce product listings</li>
<li>Help and documentation</li>
</ul>
<h3>> Table</h3>
<table>
<thead>
<tr>
<th>th 1</th>
<th>th 2</th>
<th>th 3</th>
</tr>
</thead>
<tbody>
<tr>
<td>td 1</td>
<td>td 2</td>
<td>td 3</td>
</tr>
<tr>
<td>td 1</td>
<td>td 2</td>
<td>td 3</td>
</tr>
<tr>
<td>td 1</td>
<td>td 2</td>
<td>td 3</td>
</tr>
<tr>
<td>td 1</td>
<td>td 2</td>
<td>td 3</td>
</tr>
</tbody>
</table>
<h3>> Blockquote</h3>
<blockquote>
<p>Blockquote??</p>
<blockquote>
<p>inner Blockquote??</p>
<blockquote>
<p>inner inner Blockquote??</p>
</blockquote>
</blockquote>
</blockquote>`;

export const samplePrismHtml = `<h3>> Code Block</h3>
<div class="remark-highlight"><pre class="language-js"><code class="language-js"><span class="token keyword">const</span> num <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> str <span class="token operator">=</span> <span class="token string">'1'</span><span class="token punctuation">;</span>
<span class="token keyword">function</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
  result<span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword control-flow">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre></div>`;

export const tempPosts: Omit<PostDocument, 'id' | 'category' | 'date'>[] = [
  {
    subject: 'Fusce suscipit lorem',
    content: sampleContentHtml,
  },
  {
    subject: 'dolor sit amet',
    content: `${sampleContentHtml}${samplePrismHtml}`,
    imageSrc: samplePostImage,
  },
];
