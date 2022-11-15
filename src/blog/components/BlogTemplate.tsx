import {centerAlignedChildren, CssProp, Post, systemCss, useMedia} from '@shared';
import {usePagination, Pagination, PostList} from '@src/blog';

export interface BlogTemplateProps {
  posts: Post[];
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({posts, ...props}) => {
  const {isMobile} = useMedia();
  const {pageInfo, pageNums, currentData, handlePageButtonClick} = usePagination<Post[]>({
    data: posts,
    pageUnit: isMobile ? 3 : 5,
  });

  return (
    <div css={containerCss} {...props}>
      <PostList posts={currentData} />
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
