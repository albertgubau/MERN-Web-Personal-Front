import { useState } from "react";
import { Form, FormField } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./Newsletter.form";
import { Newsletter as NewsletterController } from "../../../../api";
import "./Newsletter.scss";

const newsletterController = new NewsletterController();

export function Newsletter() {
  const [success, setSuccess] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValues) => {
      setSuccess(false);

      try {
        await newsletterController.subscribeEmail(formValues.email);
        formik.resetForm();
        setSuccess(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="footer-newsletter">
      <h4>Subscribe to the Newsletter!</h4>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Subscribe!
        </Form.Button>
        {success && <p className="success">Email registered correctly</p>}
      </Form>
    </div>
  );
}
