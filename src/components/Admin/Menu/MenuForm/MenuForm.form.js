import * as Yup from "yup";

export function initialValues() {
  return {
    title: "",
    path: "",
    protocol: "https://",
    active: true,
    order: undefined,
  };
}

export const validationSchema = Yup.object({
  title: Yup.string().required("The title is required"),
  path: Yup.string().required("The path is required"),
  order: Yup.number().required("The order is required"),
});
