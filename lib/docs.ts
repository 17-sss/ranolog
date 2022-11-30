/** [!] 모두 page 컴포넌트에서만 사용됨  */
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import {remark} from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';

export interface DefaultDocument {
  id: string;
  date: string;
  content: string;
  summary?: string;
}
type SubFolderType = 'posts' | 'projects';

const docsDir = path.join(process.cwd(), 'docs');

/** [async] Markdown Text -> HTML 변환 */
export const markdownToHtml = async (markdown: string) => {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, {sanitize: false})
    .use(remarkPrism)
    .process(markdown);
  return result.toString();
};

interface GetDocumentsParams {
  subFolderType?: SubFolderType;
  maxDocCount?: number;
}

/** [async] 모든 정적 데이터 가져옴  */
export const getDocuments = async <TDoc extends DefaultDocument = DefaultDocument>({
  subFolderType,
  maxDocCount,
}: GetDocumentsParams): Promise<TDoc[]> => {
  const result: TDoc[] = [];
  try {
    const currentDir = path.join(docsDir, subFolderType ?? '');
    const fileNames = fs.readdirSync(currentDir);

    let numLoop = fileNames.length;
    if (typeof maxDocCount === 'number') {
      numLoop = fileNames.length < maxDocCount ? fileNames.length : maxDocCount;
    }
    for (let i = 0; i < numLoop; i++) {
      const fileName = fileNames[i];
      const fullPath = path.join(currentDir, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const id = fileName.replace(/\.md$/, '');
      const matterResult = matter(fileContents);
      const content = await markdownToHtml(matterResult.content);
      result.push({...matterResult.data, id, content} as TDoc);
    }
  } catch (e) {
    console.error(e);
  } finally {
    return result as TDoc[];
  }
};

/** [async] 모든 정적 데이터 가져옴 (최근 날짜순으로)  */
export const getSortedDocuments = async <TDoc extends DefaultDocument = DefaultDocument>(
  params: GetDocumentsParams,
): Promise<TDoc[]> => {
  const result = await getDocuments<TDoc>(params);
  return result.sort((aDoc, bDoc) => new Date(bDoc.date).valueOf() - new Date(aDoc.date).valueOf());
};

/** 모든 정적 데이터의 id(fileName) 가져옴 */
export const getDocumentIds = async (params: GetDocumentsParams) => {
  try {
    const docs = await getDocuments(params);
    return docs.map(({id}) => id);
  } catch (e) {
    console.error(e);
    return [];
  }
};
