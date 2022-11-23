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

export const samplePrismHtml = `<div class="remark-highlight"><pre class="language-js"><code class="language-js"><span class="token doc-comment comment">/**
* <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span> <span class="token parameter">strs</span>
* <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>string<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">}</span></span>
*/</span>
<span class="token keyword">const</span> <span class="token function-variable function">calcAlphaCnt</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">arrStr<span class="token punctuation">,</span> searchChar</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span>
 arrStr<span class="token punctuation">.</span><span class="token method function property-access">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">cnt<span class="token punctuation">,</span> currChar</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span>currChar <span class="token operator">===</span> searchChar <span class="token operator">&#x26;&#x26;</span> cnt<span class="token operator">++</span><span class="token punctuation">,</span> cnt<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">isDuplicateKey</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">object<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token known-class-name class-name">Object</span><span class="token punctuation">.</span><span class="token method function property-access">keys</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">indexOf</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">createSortedObjectKey</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">object</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>
 <span class="token keyword">const</span> result <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
 <span class="token keyword">const</span> keys <span class="token operator">=</span> <span class="token known-class-name class-name">Object</span><span class="token punctuation">.</span><span class="token method function property-access">keys</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">sort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 keys<span class="token punctuation">.</span><span class="token method function property-access">forEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">key</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>
   result<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">=</span> object<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword control-flow">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> <span class="token function-variable function">createObjectValueKey</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">object</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span>
 <span class="token known-class-name class-name">Object</span><span class="token punctuation">.</span><span class="token method function property-access">keys</span><span class="token punctuation">(</span>object<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token method function property-access">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">result<span class="token punctuation">,</span> key</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">(</span><span class="token punctuation">(</span>result <span class="token operator">+=</span> key <span class="token operator">+</span> object<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token function-variable function">groupAnagrams</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter">strs</span><span class="token punctuation">)</span> <span class="token arrow operator">=></span> <span class="token punctuation">{</span>
 <span class="token keyword">const</span> listMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>

 <span class="token keyword">let</span> nLoop <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
 <span class="token keyword control-flow">while</span> <span class="token punctuation">(</span>nLoop <span class="token operator">&#x3C;</span> strs<span class="token punctuation">.</span><span class="token property-access">length</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">const</span> currStr <span class="token operator">=</span> strs<span class="token punctuation">[</span>nLoop<span class="token punctuation">]</span><span class="token punctuation">;</span>
   <span class="token keyword">const</span> arrCurrStr <span class="token operator">=</span> currStr<span class="token punctuation">.</span><span class="token method function property-access">split</span><span class="token punctuation">(</span><span class="token string">''</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token keyword">const</span> tmpMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
   <span class="token keyword control-flow">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&#x3C;</span> arrCurrStr<span class="token punctuation">.</span><span class="token property-access">length</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">const</span> tmpChar <span class="token operator">=</span> arrCurrStr<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
     <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span><span class="token function">isDuplicateKey</span><span class="token punctuation">(</span>tmpMap<span class="token punctuation">,</span> tmpChar<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword control-flow">continue</span><span class="token punctuation">;</span>

     <span class="token keyword">const</span> alpCnt <span class="token operator">=</span> <span class="token function">calcAlphaCnt</span><span class="token punctuation">(</span>arrCurrStr<span class="token punctuation">,</span> tmpChar<span class="token punctuation">)</span><span class="token punctuation">;</span>
     tmpMap<span class="token punctuation">[</span>tmpChar<span class="token punctuation">]</span> <span class="token operator">=</span> alpCnt<span class="token punctuation">;</span>
   <span class="token punctuation">}</span>

   <span class="token keyword">const</span> strKey <span class="token operator">=</span> <span class="token function">createObjectValueKey</span><span class="token punctuation">(</span><span class="token function">createSortedObjectKey</span><span class="token punctuation">(</span>tmpMap<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

   <span class="token keyword control-flow">if</span> <span class="token punctuation">(</span><span class="token function">isDuplicateKey</span><span class="token punctuation">(</span>listMap<span class="token punctuation">,</span> strKey<span class="token punctuation">)</span><span class="token punctuation">)</span> listMap<span class="token punctuation">[</span>strKey<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token method function property-access">push</span><span class="token punctuation">(</span>currStr<span class="token punctuation">)</span><span class="token punctuation">;</span>
   <span class="token keyword control-flow">else</span> listMap<span class="token punctuation">[</span>strKey<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>currStr<span class="token punctuation">]</span><span class="token punctuation">;</span>

   nLoop<span class="token operator">++</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>

 <span class="token keyword control-flow">return</span> <span class="token known-class-name class-name">Object</span><span class="token punctuation">.</span><span class="token method function property-access">values</span><span class="token punctuation">(</span>listMap<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token function">groupAnagrams</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'aba'</span><span class="token punctuation">,</span> <span class="token string">'cbc'</span><span class="token punctuation">,</span> <span class="token string">'baa'</span><span class="token punctuation">,</span> <span class="token string">'adc'</span><span class="token punctuation">,</span> <span class="token string">'ccd'</span><span class="token punctuation">,</span> <span class="token string">'bb'</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre></div>
`;
