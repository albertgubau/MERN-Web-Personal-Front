import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { PostForm } from "../PostForm";
import { Blog } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./PostItem.scss";

const blogController = new Blog();

export function PostItem(props) {
  const { post, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);
  const onOpenCloseConfirm = () => setShowConfirm((prev) => !prev);

  const onDeletePost = async () => {
    try {
      await blogController.deletePost(accessToken, post._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="post-item">
        <div className="post-item__info">
          <span className="post-item__info-title">{post.title}</span>
          <span className="post-item__info-path">{post.path}</span>
        </div>

        <div>
          <Button icon as={Link} to={`/blog/${post.path}`} target="_blank">
            <Icon name="eye" />
          </Button>
          <Button icon primary onClick={onOpenCloseModal}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title="Edit post"
        size="large">
        <PostForm onClose={onOpenCloseModal} onReload={onReload} post={post} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDeletePost}
        content={`Delete post "${post.title}" ?`}
        size="mini"
      />
    </>
  );
}
