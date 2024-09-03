import { createElement, useCallback } from "react";
import { Form, Image, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { image } from "../../../../assets";
import { initialValues, validationSchema } from "./UserForm.form";
import { useAuth } from "../../../../hooks";
import { User } from "../../../../api";
import "./UserForm.scss";

const userController = new User();

export function UserForm(props) {
  const { close, onReload, user } = props;

  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await userController.createUser(accessToken, formValues);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("avatar", URL.createObjectURL(file));
    formik.setFieldValue("fileAvatar", file);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop,
  });

  const getAvatar = () => {
    if (formik.values.fileAvatar) {
      return formik.values.avatar;
    }
    return image.noAvatar;
  };

  return (
    <Form className="user-form" onSubmit={formik.handleSubmit}>
      <div className="user-form__avatar" {...getRootProps()}>
        <input {...getInputProps()} />
        <Image
          avatar
          size="small"
          src={getAvatar()}
          style={{ opacity: isDragActive && 0.5 }}
        />
        <Icon name="edit" />
      </div>

      <Form.Group widths="equal">
        <Form.Input
          name="firstName"
          placeholder="Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.errors.firstName}
        />
        <Form.Input
          name="lastName"
          placeholder="Lastname"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.errors.lastName}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Dropdown
          placeholder="Select the role"
          options={roleOptions}
          selection
          value={formik.values.role}
          onChange={(_, data) => {
            formik.setFieldValue("role", data.value);
          }}
          error={formik.errors.role}
        />
      </Form.Group>
      <Form.Input
        type="password"
        name="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />

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
