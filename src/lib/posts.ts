/** [!] 모두 page 컴포넌트에서만 사용됨  */
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import {remark} from 'remark';
import html from 'remark-html';

export interface DefaultPost {
  id: string;
  date: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

/** (async) 정적 데이터: 모든 게시글 가져옴  */
export const getPosts = async <TPost extends DefaultPost = DefaultPost>(): Promise<TPost[]> => {
  const result: TPost[] = [];
  const fileNames = fs.readdirSync(postsDirectory);
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const id = fileName.replace(/\.md$/, '');
    const matterResult = matter(fileContents);
    const remarkContent = await remark().use(html).process(matterResult.content);
    result.push({...matterResult.data, id, content: remarkContent.toString()} as TPost);
  }
  return result as TPost[];
};
/** (async) 정적 데이터: 모든 게시글 가져옴 (최근 날짜순으로)  */
export const getSortedPosts = async <TPost extends DefaultPost = DefaultPost>(): Promise<
  TPost[]
> => {
  const posts = await getPosts<TPost>();
  return posts.sort(
    (aPost, bPost) => new Date(bPost.date).valueOf() - new Date(aPost.date).valueOf(),
  );
};

/** (async) 정적 데이터: 단일 게시글 가져옴  */
export const getPost = async <TPost extends DefaultPost = DefaultPost>(
  id: string,
): Promise<TPost> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);
  const remarkContent = await remark().use(html).process(matterResult.content);
  const content = remarkContent.toString();

  return {...matterResult.data, id, content} as TPost;
};

/** 정적 데이터: 모든 게시글의 id 가져옴 */
export const getPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const result = fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  return result;
};
export const getPostIdsForStaticPath = () => getPostIds().map((id) => ({params: {id}}));
