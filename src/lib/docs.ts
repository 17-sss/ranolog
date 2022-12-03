/** [!] 모두 page 컴포넌트에서만 사용됨  */
import fs from 'fs';
import matter from 'gray-matter';
// @ts-ignore
import mdxPrism from 'mdx-prism';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';
import {remark} from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';

export interface DefaultDocument {
  id: string;
  subject: string;
  date: string | {start: string; end?: string};
  content: string | MDXRemoteSerializeResult;
  extension: string;
  summary?: string;
}
type SubFolderType = 'posts' | 'projects';

const REGEX_MARKDOWN = /\.mdx?$/;

const docsDir = path.join(process.cwd(), 'docs');

/** [async] Markdown Text -> HTML 변환 */
export const markdownToHtml = async (content: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, {sanitize: false})
    .use(remarkPrism)
    .process(content);
  return result.toString();
};

/** [async] Markdown Text -> HTML 변환 (for MDX) */
export const markdownToHtmlForMDX = async (content: string) => {
  const result = await serialize(content, {
    mdxOptions: {remarkPlugins: [remarkGfm, remarkHtml], rehypePlugins: [mdxPrism]},
  });
  return result;
};

/** [async] 모든 정적 데이터 가져옴  */
export const getDocuments = async <TDoc extends DefaultDocument = DefaultDocument>(
  subFolderType?: SubFolderType,
): Promise<TDoc[]> => {
  const createContent = async (content: string, extension?: string) => {
    if (extension === '.mdx') {
      return markdownToHtmlForMDX(content);
    }
    return await markdownToHtml(content);
  };

  const result: TDoc[] = [];
  try {
    const currentDir = path.join(docsDir, subFolderType ?? '');
    const fileNames = fs.readdirSync(currentDir);
    for (let i = 0; i < fileNames.length; i++) {
      const fileName = fileNames[i];
      const fullPath = path.join(currentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const id = fileName.replace(REGEX_MARKDOWN, '');
      const extension = fileName.match(REGEX_MARKDOWN)?.[0] ?? 'unknown';
      const matterResult = matter(fileContents);
      const content = await createContent(matterResult.content, extension);
      result.push({...matterResult.data, id, content, extension} as TDoc);
    }
  } catch (e) {
    console.error(e);
  } finally {
    return result as TDoc[];
  }
};

interface GetSortedDocumentsParams {
  subFolderType?: SubFolderType;
  maxDocCount?: number;
}

/** [async] 모든 정적 데이터 가져옴 (최근 날짜순으로)  */
export const getSortedDocuments = async <TDoc extends DefaultDocument = DefaultDocument>({
  subFolderType,
  maxDocCount,
}: GetSortedDocumentsParams): Promise<TDoc[]> => {
  const sortDocs = (await getDocuments<TDoc>(subFolderType)).sort(
    ({date: aDate}, {date: bDate}) => {
      if (typeof aDate === 'string' && typeof bDate === 'string') {
        return new Date(bDate).valueOf() - new Date(aDate).valueOf();
      }
      if (typeof aDate === 'object' && typeof bDate === 'object') {
        return new Date(bDate.start).valueOf() - new Date(aDate.start).valueOf();
      }
      return 0;
    },
  );
  return sortDocs.slice(0, maxDocCount);
};

/** 모든 정적 데이터의 id(fileName) 가져옴 */
export const getDocumentIds = async (subFolderType: SubFolderType) => {
  try {
    const docs = await getDocuments(subFolderType);
    return docs.map(({id}) => id);
  } catch (e) {
    console.error(e);
    return [];
  }
};
