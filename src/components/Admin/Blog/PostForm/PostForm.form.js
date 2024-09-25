import * as Yup from "yup";

export function initialValues(post) {
  return {
    title: post?.title || "",
    path: post?.path || "",
    content: post?.content || "",
    miniature: post?.miniature || "",
    file: null,
  };
}

export const validationSchema = Yup.object({
  title: Yup.string().required("The post title is mandatory"),
  path: Yup.string().required("The post path is mandatory"),
  content: Yup.string(),
  miniature: Yup.string().required("The post miniature is required"),
});
