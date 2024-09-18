import { useState, useEffect } from "react";
import { size } from "lodash";
import { Blog } from "../../../../api/blog";
import { Loader, Pagination } from "semantic-ui-react";
import { PostItem } from "../PostItem";
import "./PostsList.scss";

const blogController = new Blog();

export function PostsList(props) {
  const { reload, onReload } = props;

  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await blogController.getPosts(page);
        setPosts(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          totalPages: response.totalPages,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page, reload]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!posts) return <Loader active inline="centered" />;
  if (size(posts) === 0) return "There are no posts created for the Blog";

  return (
    <div className="posts-list">
      <div className="posts-list__items">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} onReload={onReload} />
        ))}
      </div>
      <div className="posts-list__pagination">
        <Pagination
          totalPages={pagination.totalPages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
