import {PostDocument, ProjectDocument} from '../types';

/* POST ==================================================== */
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
    extension: '.md',
  },
  {
    subject: 'dolor sit amet',
    content: `${sampleContentHtml}${samplePrismHtml}`,
    thumbnail: '/sample.jpg',
    extension: '.md',
  },
];

/* PROJECT ==================================================== */

export const sampleCompiledSourceHtml =
  '/*@jsxRuntime automatic @jsxImportSource react*/\nconst {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];\nconst {useMDXComponents: _provideComponents} = arguments[0];\nfunction _createMdxContent(props) {\n  const _components = Object.assign({\n    p: "p",\n    ul: "ul",\n    li: "li",\n    pre: "pre",\n    code: "code",\n    span: "span"\n  }, _provideComponents(), props.components), {Typography, CustomCode, Divider} = _components;\n  if (!CustomCode) _missingMdxReference("CustomCode", true, "14:3-14:58");\n  if (!Divider) _missingMdxReference("Divider", true, "16:1-16:46");\n  if (!Typography) _missingMdxReference("Typography", true, "2:1-4:14");\n  return _jsxs(_Fragment, {\n    children: [_jsx(Typography, {\n      backgroundColor: "gray",\n      variant: "h3",\n      children: _jsx(_components.p, {\n        children: "🧚🏻 ⚙️ backgroundColor_Green Text (Typography Component, h3)"\n      })\n    }), "\\n", _jsxs(_components.ul, {\n      children: ["\\n", _jsx(_components.li, {\n        children: "One"\n      }), "\\n", _jsx(_components.li, {\n        children: "Two"\n      }), "\\n", _jsx(_components.li, {\n        children: "Three"\n      }), "\\n"]\n    }), "\\n", _jsx(Typography, {\n      backgroundColor: "gray",\n      variant: "h3",\n      children: _jsx(_components.p, {\n        children: "⚙️ backgroundColor_Gray Text (Typography Component, h3)"\n      })\n    }), "\\n", _jsxs(_components.ul, {\n      children: ["\\n", _jsxs(_components.li, {\n        children: ["\\n", _jsx(CustomCode, {\n          color: "orange",\n          children: "I am CustomCode"\n        }), "\\n"]\n      }), "\\n"]\n    }), "\\n", _jsx(Divider, {\n      height: "2rem",\n      children: "I am Divider"\n    }), "\\n", _jsx("br", {}), "\\n", _jsx(_components.pre, {\n      className: "language-js",\n      children: _jsxs(_components.code, {\n        className: "language-js",\n        children: [_jsx(_components.span, {\n          className: "token keyword",\n          children: "const"\n        }), " one ", _jsx(_components.span, {\n          className: "token operator",\n          children: "="\n        }), " ", _jsx(_components.span, {\n          className: "token number",\n          children: "1"\n        }), _jsx(_components.span, {\n          className: "token punctuation",\n          children: ";"\n        }), "\\n", _jsx(_components.span, {\n          className: "token keyword",\n          children: "const"\n        }), " two ", _jsx(_components.span, {\n          className: "token operator",\n          children: "="\n        }), " ", _jsx(_components.span, {\n          className: "token number",\n          children: "2"\n        }), _jsx(_components.span, {\n          className: "token punctuation",\n          children: ";"\n        }), "\\n", _jsx(_components.span, {\n          className: "token console class-name",\n          children: "console"\n        }), _jsx(_components.span, {\n          className: "token punctuation",\n          children: "."\n        }), _jsx(_components.span, {\n          className: "token method function property-access",\n          children: "log"\n        }), _jsx(_components.span, {\n          className: "token punctuation",\n          children: "("\n        }), "one ", _jsx(_components.span, {\n          className: "token operator",\n          children: "+"\n        }), " two ", _jsx(_components.span, {\n          className: "token operator",\n          children: "==="\n        }), " ", _jsx(_components.span, {\n          className: "token number",\n          children: "3"\n        }), _jsx(_components.span, {\n          className: "token punctuation",\n          children: ")"\n        }), _jsx(_components.span, {\n          className: "token punctuation",\n          children: ";"\n        }), "\\n", _jsx(_components.span, {\n          className: "token keyword",\n          children: "const"\n        }), " js ", _jsx(_components.span, {\n          className: "token operator",\n          children: "="\n        }), " ", _jsx(_components.span, {\n          className: "token string",\n          children: "\'is good!\'"\n        }), _jsx(_components.span, {\n          className: "token punctuation",\n          children: ";"\n        }), "\\n"]\n      })\n    })]\n  });\n}\nfunction MDXContent(props = {}) {\n  const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);\n  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {\n    children: _jsx(_createMdxContent, props)\n  })) : _createMdxContent(props);\n}\nreturn {\n  default: MDXContent\n};\nfunction _missingMdxReference(id, component, place) {\n  throw new Error("Expected " + (component ? "component" : "object") + " `" + id + "` to be defined: you likely forgot to import, pass, or provide it." + (place ? "\\nIt’s referenced in your code at `" + place + "`" : ""));\n}\n';

export const sampleMDXData = {compiledSource: sampleCompiledSourceHtml, frontmatter: {}, scope: {}};

export const tempProjects: Omit<ProjectDocument, 'id' | 'category' | 'date'>[] = [
  {
    links: [
      {text: 'Internal', href: '/'},
      {text: 'External(Naver)', href: 'https://www.naver.com/'},
    ],
    subject: 'Sample Project (MDX)',
    content: sampleMDXData,
    extension: '.mdx',
  },
  {
    subject: 'THE SAMPLE MDX',
    content: sampleMDXData,
    extension: '.mdx',
    thumbnail: '/sample.jpg',
  },
];
