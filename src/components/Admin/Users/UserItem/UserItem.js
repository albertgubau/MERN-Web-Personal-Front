import { useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { UserForm } from "../UserForm";
import "./UserItem.scss";
import { User } from "../../../../api";

export function UserItem(props) {
  const { user } = props;

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const onOpenCloseModal = () => setShowModal((prev) => !prev);

  const openUserUpdate = () => {
    setModalTitle(`Update ${user.email}`);
    onOpenCloseModal();
  };

  return (
    <>
      <div className="user-item">
        <div className="user-item__info">
          <Image
            avatar
            src={
              user.avatar ? `${ENV.BASE_PATH}/${user.avatar}` : image.noAvatar
            }
          />
          <div>
            <p>
              {user.firstName} {user.lastName}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <div>
          <Button icon primary onClick={openUserUpdate}>
            <Icon name="pencil" />
          </Button>
          <Button icon color={user.active ? "orange" : "teal"}>
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red">
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title={modalTitle}>
        <UserForm
          onClose={onOpenCloseModal}
          onReload={() => {
            console.log("RELOAD");
          }}
          user={user}
        />
      </BasicModal>
    </>
  );
}
