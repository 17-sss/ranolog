/** [!] 모두 page 컴포넌트에서만 사용됨  */
import fs from 'fs';
import matter from 'gray-matter';
// @ts-ignore
import mdxPrism from 'mdx-prism';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import {serialize} from 'next-mdx-remote/serialize';
import path from 'path';
import {getPlaiceholder} from 'plaiceholder';
import {remark} from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';

export interface DocumentImageProps {
  src: string;
  blurDataURL?: string;
}

interface MatterData {
  subject: string;
  date: string | {start: string; end?: string};
  summary?: string;
  thumbnail?: DocumentImageProps | string | null;
}

export interface DefaultDocument extends MatterData {
  id: string;
  content: string | MDXRemoteSerializeResult;
  extension: string;
  thumbnail?: DocumentImageProps | null;
}

type SubFolderType = 'posts' | 'projects';

const REGEX_MARKDOWN = /\.mdx?$/;

const docsDir = path.join(process.cwd(), 'docs');

/** [async] Markdown Text -> HTML 변환 */
const markdownToHtml = async (content: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, {sanitize: false})
    .use(remarkPrism)
    .process(content);
  return result.toString();
};

/** [async] Markdown Text -> HTML 변환 (for MDX) */
const markdownToHtmlForMDX = async (content: string) => {
  const result = await serialize(content, {
    mdxOptions: {remarkPlugins: [remarkGfm, remarkHtml], rehypePlugins: [mdxPrism]},
  });
  return result;
};

export const createMarkdownContent = async (content: string, extension?: string) => {
  if (extension === '.mdx') {
    return markdownToHtmlForMDX(content);
  }
  return await markdownToHtml(content);
};

/** markdown frontmatter에 정의한 string 형식의 image 정보를 변환함
 * - string 형식인 image 정보(thumbnail 등..)를 {src, blurDataURL} 형태로 변환
 */
export const convertDocumentImageProps = async (
  src?: string,
): Promise<DocumentImageProps | null> => {
  try {
    if (typeof src === 'undefined') {
      return null;
    }
    const {base64: blurDataURL} = await getPlaiceholder(src);
    return {src, blurDataURL};
  } catch (e) {
    console.error(e);
    return null;
  }
};

/** [async] 모든 정적 데이터 가져옴  */
export const getDocuments = async <TDoc extends DefaultDocument = DefaultDocument>(
  subFolderType?: SubFolderType,
): Promise<TDoc[]> => {
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
      const {data, content: matterContent} = matter(fileContents);
      const thumbnail = await convertDocumentImageProps(data['thumbnail']);
      const content = await createMarkdownContent(matterContent, extension);
      result.push({...data, id, thumbnail, content, extension} as TDoc);
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

interface GetDocumentsParams {
  fileName: string;
  subFolderType?: SubFolderType;
}

/** [async] 단일 정적 데이터 가져옴 (파일명으로 가져옴)  */
export const getDocumentByFileName = async <TDoc extends DefaultDocument = DefaultDocument>({
  fileName,
  subFolderType,
}: GetDocumentsParams): Promise<TDoc | null> => {
  try {
    const fullPath = path.join(docsDir, subFolderType ?? '', fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const id = fileName.replace(REGEX_MARKDOWN, '');
    const extension = fileName.match(REGEX_MARKDOWN)?.[0] ?? 'unknown';
    const matterResult = matter(fileContents);
    const content = await createMarkdownContent(matterResult.content, extension);
    return {...matterResult.data, id, content, extension} as TDoc;
  } catch (e) {
    console.error(e);
    return null;
  }
};
