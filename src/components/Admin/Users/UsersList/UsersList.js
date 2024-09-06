import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { User } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { UserItem } from "../../../../components/Admin/Users";

const userController = new User();

export function UsersList(props) {
  const { activeUsers, reload, onReload } = props;
  const [users, setUsers] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    (async () => {
      try {
        setUsers(null);
        const response = await userController.getUsers(
          accessToken,
          activeUsers
        );
        setUsers(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [activeUsers, reload]);

  if (!users) return <Loader active inline="centered" />;

  if (size(users) === 0) return "There are no users";

  return (
    <>
      {users.map((user) => (
        <UserItem user={user} onReload={onReload} />
      ))}
    </>
  );
}
