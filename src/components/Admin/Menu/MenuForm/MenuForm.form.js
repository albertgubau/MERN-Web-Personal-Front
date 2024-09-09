import * as Yup from "yup";

export function initialValues(menu) {
  return {
    title: menu?.title || "",
    path: menu?.path || "",
    protocol: menu?.protocol || "https://",
    active: menu?.active || true,
    order: menu?.order || undefined,
  };
}

export const validationSchema = Yup.object({
  title: Yup.string().required("The title is required"),
  path: Yup.string().required("The path is required"),
  order: Yup.number().required("The order is required"),
});
