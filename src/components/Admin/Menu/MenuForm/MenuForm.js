import { Form, Dropdown, Input } from "semantic-ui-react";
import { useFormik } from "formik";
import { Menu } from "../../../../api/menu";
import { initialValues, validationSchema } from "./MenuForm.form";
import { useAuth } from "../../../../hooks";

const menuController = new Menu();

export function MenuForm(props) {
  const { onClose, onReload, menu } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(menu),
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (!menu) {
          await menuController.createMenu(accessToken, formValues);
        } else {
          await menuController.updateMenu(accessToken, menu._id, formValues);
        }
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const options = [
    {
      key: "https://",
      text: "https://",
      value: "https://",
    },
    {
      key: "http://",
      text: "http://",
      value: "http://",
    },
    {
      key: "/",
      text: "/",
      value: "/",
    },
  ];

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Form.Input
          type="number"
          name="order"
          placeholder="Order"
          value={formik.values.order}
          onChange={formik.handleChange}
          error={formik.errors.order}
        />
      </Form.Group>
      <Input
        name="path"
        placeholder="Menu url"
        fluid
        label={
          !menu && (
            <Dropdown
              options={options}
              value={formik.values.protocol}
              onChange={(_, data) => {
                formik.setFieldValue("protocol", data.value);
              }}
              error={formik.errors.protocol}
            />
          )
        }
        value={formik.values.path}
        onChange={formik.handleChange}
        error={formik.errors.path}
      />
      <Form.Group />
      <Form.Button type="submit" primary fluid>
        {menu ? "Update menu" : "Create menu"}
      </Form.Button>
    </Form>
  );
}
