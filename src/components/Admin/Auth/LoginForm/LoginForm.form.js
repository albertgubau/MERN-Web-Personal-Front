import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Email is not valid")
    .required("The email is mandatory"),
  password: Yup.string().required("The password is mandatory"),
});
