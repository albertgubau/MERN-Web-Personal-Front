import * as Yup from "yup";

export const initialValues = {
  avatar: "",
  fileAvatar: null,
  firstName: "",
  lastName: "",
  email: "",
  role: "",
  password: "",
};

export const validationSchema = Yup.object({
  firstName: Yup.string().required("The first name is mandatory"),
  lastName: Yup.string().required("The last name is mandatory"),
  email: Yup.string()
    .email("The email is not valid")
    .required("The email is mandatory"),
  role: Yup.string().required("The role is required"),
  password: Yup.string()
    .required("This field is mandatory")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
    ),
});
