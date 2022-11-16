import {centerAlignedChildren, CssProp, Post, systemCss} from '@shared';
import {useBlogTemplate, PostList, Pagination} from '@src/blog';

export interface BlogTemplateProps {
  posts: Post[];
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({posts, ...props}) => {
  const {currentPosts, pageInfo, pageNums, handlePageButtonClick} = useBlogTemplate(posts);

  return (
    <div css={containerCss} {...props}>
      <PostList posts={currentPosts} />
      <Pagination
        css={paginationCss}
        pageInfo={pageInfo}
        pageNums={pageNums}
        handlePageButtonClick={handlePageButtonClick}
      />
    </div>
  );
};

export default BlogTemplate;

const containerCss: CssProp = systemCss({});
const paginationCss: CssProp = [centerAlignedChildren, systemCss({py: '1.5rem'})];
