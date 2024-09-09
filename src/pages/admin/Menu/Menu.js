import { useState } from "react";
import { BasicModal } from "../../../components/Shared";
import { Tab, Button } from "semantic-ui-react";
import { MenusList } from "../../../components/Admin/Menu";
import "./Menu.scss";
import { MenuForm } from "../../../components/Admin/Menu/MenuForm/MenuForm";

export function Menu() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);
  const onReload = () => setReload((prev) => !prev);

  const panes = [
    {
      menuItem: "Active menus",
      render: () => (
        <Tab.Pane attached={false}>
          <MenusList activeMenus={true} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactive menus",
      render: () => (
        <Tab.Pane attached={false}>
          <MenusList activeMenus={false} reload={reload} onReload={onReload} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="menu-page">
        <Button className="menu-page__add" primary onClick={onOpenCloseModal}>
          New menu
        </Button>
        <Tab panes={panes} />
      </div>

      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title="Create a new menu">
        <MenuForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
