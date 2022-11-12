/** [!] 모두 page 컴포넌트에서만 사용됨  */
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

export interface DefaultPost {
  id: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');

/** 정적 데이터: 모든 게시글 가져옴  */
export const getPosts = <TPost extends DefaultPost = DefaultPost>(): TPost[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const result = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const {data, content} = matter(fileContents);
    const id = fileName.replace(/\.md$/, '');
    return {...data, id, content};
  });
  return result as TPost[];
};

/** 정적 데이터: 모든 게시글의 id 가져옴 */
export const getPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const result = fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
  return result;
};
export const getPostIdsForStaticPath = () => getPostIds().map((id) => ({params: {id}}));

/** 정적 데이터: 단일 게시글 가져옴  */
export const getPost = <TPost extends DefaultPost = DefaultPost>(id: string): TPost => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const {data, content} = matter(fileContents);
  return {...data, id, content} as TPost;
};
