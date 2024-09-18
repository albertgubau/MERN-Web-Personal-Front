import * as Yup from "yup";

export function initialValues() {
  return {
    title: "",
    path: "",
    content: "",
    miniature: "",
    file: null,
  };
}

export const validationSchema = Yup.object({
  title: Yup.string().required("The post title is mandatory"),
  path: Yup.string().required("The post path is mandatory"),
  content: Yup.string(),
  miniature: Yup.string().required("The miniature is required"),
});
