import { useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { image } from "../../../../assets";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { UserForm } from "../UserForm";
import { useAuth } from "../../../../hooks";
import { User } from "../../../../api";
import "./UserItem.scss";

const userController = new User();

export function UserItem(props) {
  const { user, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);
  const onOpenCloseConfirm = () => setShowConfirm((prev) => !prev);

  const onOpenUserUpdate = () => {
    setModalTitle(`Update ${user.email}`);
    onOpenCloseModal();
  };

  const onOpenActivateDeactivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      user.active
        ? `Deactivate user "${user.email}" ?`
        : `Activate user "${user.email}" ?`
    );
    onOpenCloseConfirm();
  };

  const onOpenDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Delete user "${user.email}" ?`);
    onOpenCloseConfirm();
  };

  const onActivateDeactivate = async () => {
    try {
      await userController.updateUser(accessToken, user._id, {
        active: !user.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteUser = async () => {
    try {
      await userController.deleteUser(accessToken, user._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
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
          <Button icon primary onClick={onOpenUserUpdate}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={user.active ? "orange" : "teal"}
            onClick={onOpenActivateDeactivateConfirm}>
            <Icon name={user.active ? "ban" : "check"} />
          </Button>
          <Button icon color="red" onClick={onOpenDeleteConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title={modalTitle}>
        <UserForm onClose={onOpenCloseModal} onReload={onReload} user={user} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDeleteUser : onActivateDeactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
