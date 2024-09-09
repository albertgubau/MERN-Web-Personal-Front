import { useState } from "react";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { BasicModal } from "../../../Shared";
import { MenuForm } from "../MenuForm";
import { Menu } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./MenuItem.scss";

const menuController = new Menu();

export function MenuItem(props) {
  const { menu, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);
  const onOpenCloseConfirm = () => setShowConfirm((prev) => !prev);

  const onOpenUpdateModal = () => {
    setModalTitle(`Update menu ${menu.title}`);
    onOpenCloseModal();
  };

  const onOpenActivateDeactivateConfirm = () => {
    setIsDelete(false);
    setConfirmMessage(
      menu.active
        ? `Deactivate menu "${menu.title}" ?`
        : `Activate menu "${menu.title}" ?`
    );
    onOpenCloseConfirm();
  };

  const onOpenDeleteConfirm = () => {
    setIsDelete(true);
    setConfirmMessage(`Delete menu "${menu.title}" ?`);
    onOpenCloseConfirm();
  };

  const onActivateDeactivate = async () => {
    try {
      await menuController.updateMenu(accessToken, menu._id, {
        active: !menu.active,
      });
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      await menuController.deleteMenu(accessToken, menu._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="menu-item">
        <div className="menu-item__info">
          <span className="menu-item__info-title">{menu.title}</span>
          <span className="menu-item__info-path">{menu.path}</span>
        </div>

        <div>
          <Button icon primary onClick={onOpenUpdateModal}>
            <Icon name="pencil" />
          </Button>
          <Button
            icon
            color={menu.active ? "orange" : "teal"}
            onClick={onOpenActivateDeactivateConfirm}>
            <Icon name={menu.active ? "ban" : "check"} />
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
        <MenuForm onClose={onOpenCloseModal} menu={menu} onReload={onReload} />
      </BasicModal>

      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={isDelete ? onDelete : onActivateDeactivate}
        content={confirmMessage}
        size="mini"
      />
    </>
  );
}
