import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  acceptConditions: false,
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("The email is not valid")
    .required("This field is mandatory"),
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
  repeatPassword: Yup.string()
    .required("This field is mandatory")
    .oneOf([Yup.ref("password")], "The passwords must be the same"),
  acceptConditions: Yup.bool().isTrue(true),
});
