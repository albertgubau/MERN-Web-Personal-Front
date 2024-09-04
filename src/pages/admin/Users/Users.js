import { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import "./Users.scss";
import { BasicModal } from "../../../components/Shared";
import { UserForm, UsersList } from "../../../components/Admin/Users";

export function Users() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);

  const panes = [
    {
      menuItem: "Active users",
      render: () => (
        <Tab.Pane attached={false}>
          <UsersList showActiveUsers={true} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Inactive users",
      render: () => (
        <Tab.Pane attached={false}>
          <UsersList showActiveUsers={false} />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <>
      <div className="users-page">
        <Button className="users-page__add" primary onClick={onOpenCloseModal}>
          New user
        </Button>
        <Tab panes={panes} />
      </div>
      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title="Create a new user">
        <UserForm close={onOpenCloseModal} />
      </BasicModal>
    </>
  );
}
