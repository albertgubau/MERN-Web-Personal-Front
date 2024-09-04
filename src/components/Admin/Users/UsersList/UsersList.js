import { User } from "../../../../api";

const userController = new User();

export function UsersList(props) {
  const { showActiveUsers } = props;

  return (
    <div>
      <h2>We are on userslist</h2>
      <p>{showActiveUsers ? "Active users" : "Inactive users"}</p>
    </div>
  );
}
