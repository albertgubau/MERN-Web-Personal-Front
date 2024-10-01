import { useState, useEffect } from "react";
import { Loader, Pagination } from "semantic-ui-react";
import { PostItem } from "../PostItem";
import { useNavigate, useSearchParams } from "react-router-dom";
import { size } from "lodash";
import { Blog } from "../../../../api";
import "./PostsList.scss";

const blogController = new Blog();

export function PostsList(props) {
  const [posts, setPosts] = useState(null);

  const [pagination, setPagination] = useState();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 1);

  useEffect(() => {
    (async () => {
      try {
        const response = await blogController.getPosts(page, 2);

        setPosts(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          pages: response.totalPages,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const changePage = (_, data) => {
    setPage(data.activePage);
    navigate(`?page=${data.activePage}`);
  };

  if (!posts) return <Loader active inline="centered" />;
  if (size(posts) === 0) return "There are no posts in the blog";

  return (
    <div className="posts-list-web">
      <div className="list">
        {posts.map((post) => (
          <div key={post._id} className="item">
            <PostItem post={post} />
          </div>
        ))}
      </div>

      <div className="pagination">
        <Pagination
          onPageChange={changePage}
          totalPages={pagination.pages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          secondary
          pointing
        />
      </div>
    </div>
  );
}
