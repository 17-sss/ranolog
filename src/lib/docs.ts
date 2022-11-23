/** [!] 모두 page 컴포넌트에서만 사용됨  */
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import {remark} from 'remark';
import html from 'remark-html';

export interface DefaultDocument {
  id: string;
  date: string;
  content: string;
}
type SubFolderType = 'posts' | 'projects';

const docsDir = path.join(process.cwd(), 'docs');

/** [async] Markdown Text -> HTML 변환 */
export const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

/** [async] 모든 정적 데이터 가져옴  */
export const getDocuments = async <TDoc extends DefaultDocument = DefaultDocument>(
  subFolder?: SubFolderType,
): Promise<TDoc[]> => {
  const result: TDoc[] = [];
  try {
    const currentDir = path.join(docsDir, subFolder ?? '');
    const fileNames = fs.readdirSync(currentDir);
    for (let i = 0; i < fileNames.length; i++) {
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
  subFolder?: SubFolderType,
): Promise<TDoc[]> => {
  const result = await getDocuments<TDoc>(subFolder);
  return result.sort((aDoc, bDoc) => new Date(bDoc.date).valueOf() - new Date(aDoc.date).valueOf());
};

/** [async] 단일 정적 데이터 가져옴  */
export const getDocument = async <TDoc extends DefaultDocument = DefaultDocument>(
  id: string,
  subFolder?: SubFolderType,
): Promise<TDoc | null> => {
  try {
    const fullPath = path.join(docsDir, subFolder ?? '', `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    const content = await markdownToHtml(matterResult.content);
    return {...matterResult.data, id, content} as TDoc;
  } catch (e) {
    console.error(e);
    return null;
  }
};

/** 모든 정적 데이터의 id(fileName) 가져옴 */
export const getDocumentIds = (subFolder?: SubFolderType) => {
  try {
    const currentDir = path.join(docsDir, subFolder ?? '');
    const fileNames = fs.readdirSync(currentDir);
    const result = fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
    return result;
  } catch (e) {
    console.error(e);
    return [];
  }
};
export const getDocumentIdsForStaticPath = (subFolder?: SubFolderType) =>
  getDocumentIds(subFolder).map((id) => ({params: {id}}));