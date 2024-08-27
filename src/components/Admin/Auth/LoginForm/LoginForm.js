import { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.form";
import { Auth } from "../../../../api";

const authController = new Auth();

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        setErrorMessage("");
        const response = await authController.login(formValue);
        console.log(response);
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });
  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
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
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Enter
      </Form.Button>
      <p className="login-form__error">{errorMessage}</p>
    </Form>
  );
}
