import { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { PostsList } from "../../../components/Admin/Blog/PostsList";
import { BasicModal } from "../../../components/Shared";
import { PostForm } from "../../../components/Admin/Blog";
import "./Blog.scss";

export function Blog() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);
  const onReload = () => setReload((prev) => !prev);

  return (
    <>
      <div className="blog-page">
        <div className="blog-page__add">
          <Button primary onClick={onOpenCloseModal}>
            New post
          </Button>
        </div>
        <Tab.Pane attached={false}>
          <PostsList reload={reload} onReload={onReload} />
        </Tab.Pane>
      </div>

      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title="New post"
        size="large">
        <PostForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
