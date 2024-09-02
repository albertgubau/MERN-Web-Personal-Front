import { Form, Image } from "semantic-ui-react";

export function UserForm(props) {
  const { close, onReload, user } = props;

  return (
    <Form className="user-form">
      <div className="user-form__avatar">
        <span>AVATAR</span>
      </div>

      <Form.Group widths="equal">
        <Form.Input name="firstName" placeholder="Name" />
        <Form.Input name="lastName" placeholder="Lastname" />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input name="email" placeholder="Email" />
        <Form.Dropdown
          placeholder="Select the role"
          options={roleOptions}
          selection
        />
      </Form.Group>
      <Form.Input type="password" name="password" placeholder="Password" />

      <Form.Button type="submit" primary fluid>
        {user ? "Update user" : "Create user"}
      </Form.Button>
    </Form>
  );
}

const roleOptions = [
  {
    key: "user",
    text: "User",
    value: "user",
  },
  {
    key: "admin",
    text: "Administrator",
    value: "admin",
  },
];
