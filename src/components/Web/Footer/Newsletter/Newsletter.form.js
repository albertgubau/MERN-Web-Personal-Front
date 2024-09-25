import * as Yup from "yup";

export const initialValues = {
  email: "",
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("The email is not valid")
    .required("An email is required"),
});
