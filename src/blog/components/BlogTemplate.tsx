import {useMemo} from 'react';

import {CssProp, Post, systemCss} from '@shared';
import {PostBox, PostBoxProps} from '@src/blog/components';

export interface BlogTemplateProps {
  posts: Post[];
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({posts, ...props}) => {
  const allPostBoxProps = useMemo(() => {
    /** 카테고리별로 글 분류(Map) */
    const createAllPropsMap = () => {
      const resultMap = new Map<string, Post[]>();
      posts.forEach((post) => {
        if (Array.isArray(post.category)) {
          return post.category.forEach((category) => {
            resultMap.set(category, [...(resultMap.get(category) ?? []), post]);
          });
        }
        const category = post.category ?? '';
        resultMap.set(category, [...(resultMap.get(category) ?? []), post]);
      });
      return resultMap;
    };
    /** 분류된 글들(Map)을 Array로 변경 후, 각 카테고리마다 제일 최신 글의 날짜 데이터 저장
     * - 적용되는 글들(posts)도 날짜도 내림차순 정렬. (한 카테고리당 최대 5개)
     */
    const createAllPropsEntries = (allPropsMap: Map<string, Post[]>) => {
      const result: (PostBoxProps & {latestDate?: Date})[] = [];
      const MAX_POST_CNT = 5;
      Array.from(allPropsMap.entries()).forEach(([categoryName, posts]) => {
        const sortedPosts = [...posts].sort(
          (aPost, bPost) => new Date(bPost.date).valueOf() - new Date(aPost.date).valueOf(),
        );
        const currentPosts = sortedPosts.slice(0, MAX_POST_CNT);
        if (sortedPosts.length === 0) {
          return result.push({categoryName, posts: currentPosts});
        }
        result.push({categoryName, posts: currentPosts, latestDate: new Date(sortedPosts[0].date)});
      });
      return result;
    };
    // --------
    const result = createAllPropsEntries(createAllPropsMap());
    return result.sort((aProps, bProps) => {
      if (!aProps.latestDate || !bProps.latestDate) {
        return 0;
      }
      return new Date(bProps.latestDate).valueOf() - new Date(aProps.latestDate).valueOf();
    });
  }, [posts]);

  return (
    <div css={containerCss} {...props}>
      {allPostBoxProps.map(({categoryName, posts}) => (
        <PostBox key={categoryName} categoryName={categoryName} posts={posts} />
      ))}
    </div>
  );
};

export default BlogTemplate;

const containerCss: CssProp = systemCss({
  '& > * + *': {
    mt: ['3rem', '4rem'],
  },
});
