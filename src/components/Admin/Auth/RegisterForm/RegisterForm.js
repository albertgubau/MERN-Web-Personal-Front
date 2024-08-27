import { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./RegisterForm.form";
import "./RegisterForm.scss";

const authController = new Auth();

export function RegisterForm(props) {
  const [errorMessage, setErrorMessage] = useState("");

  const { openLogin } = props;

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setErrorMessage("");
        await authController.register(formValue);
        openLogin();
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <Form.Input
        name="repeatPassword"
        type="password"
        placeholder="Repeat password"
        value={formik.values.repeatPassword}
        onChange={formik.handleChange}
        error={formik.errors.repeatPassword}
      />
      {/* Checkbox does not work like the inputs, we must program the onChange funcion manually with setFieldValues from formik */}
      <Form.Checkbox
        name="acceptConditions"
        label="I acknowledge that I have read and I accept the user privacy policy. "
        checked={formik.values.acceptConditions}
        onChange={(_, data) =>
          formik.setFieldValue("acceptConditions", data.checked)
        }
        error={formik.errors.acceptConditions}
      />
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Create account
      </Form.Button>
      <p className="register-form__error">{errorMessage}</p>
    </Form>
  );
}
