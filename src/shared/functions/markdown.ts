// @ts-ignore
import mdxPrism from 'mdx-prism';
import {serialize} from 'next-mdx-remote/serialize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

/** [async] Markdown Text -> HTML 변환 (MDX 포함) */
export const markdownToHtml = async (aMarkdown: string) => {
  const result = await serialize(aMarkdown, {
    mdxOptions: {remarkPlugins: [remarkGfm, remarkHtml], rehypePlugins: [rehypeSlug, mdxPrism]},
  });
  return result;
};
