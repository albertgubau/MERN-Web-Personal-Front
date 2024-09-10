import * as Yup from "yup";

export function initialValues(course) {
  return {
    title: course?.title || "",
    miniature: course?.miniature || "",
    file: null,
    description: course?.description || "",
    url: course?.url || "",
    price: course?.price || undefined,
    score: course?.price || undefined,
  };
}

export const validationSchema = Yup.object({
  title: Yup.string().required("The title is mandatory"),
  miniature: Yup.string().required("The miniature is mandatory"),
  description: Yup.string().required("The description is mandatory"),
  url: Yup.string().required("The url is mandatory"),
  price: Yup.number().required("The price is required"),
  score: Yup.number()
    .min(1, "The minimum score is 1 star")
    .max(5, "The maximum score is 5 stars")
    .required("The score is required"),
});
