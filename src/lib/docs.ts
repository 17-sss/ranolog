/** [!] 모두 page 컴포넌트에서만 사용됨  */
import fs from 'fs';
import matter from 'gray-matter';
import {MDXRemoteSerializeResult} from 'next-mdx-remote';
import path from 'path';

import {markdownToHtml} from '@src/shared';

export interface DefaultDocument {
  id: string;
  subject: string;
  date: string | {start: string; end?: string};
  content?: string | MDXRemoteSerializeResult;
  summary?: string;
}
type SubFolderType = 'posts' | 'projects' | 'resumes';

const REGEX_MARKDOWN = /\.mdx?$/;

const docsDir = path.join(process.cwd(), 'docs');

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
      const matterResult = matter(fileContents);
      const content = await markdownToHtml(matterResult.content);
      result.push({...matterResult.data, id, content} as TDoc);
    }
  } catch (e) {
    console.error((e as Error).message);
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
    console.error((e as Error).message);
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
    const matterResult = matter(fileContents);
    const content = await markdownToHtml(matterResult.content);
    return {...matterResult.data, id, content} as TDoc;
  } catch (e) {
    console.error((e as Error).message);
    return null;
  }
};
