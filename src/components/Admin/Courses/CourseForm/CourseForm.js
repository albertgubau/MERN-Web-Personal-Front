import { useCallback } from "react";
import { Form, Image, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import "./CourseForm.scss";
import { initialValues, validationSchema } from "./CourseForm.form";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import { ENV } from "../../../../utils";

const courseController = new Course();

export function CourseForm(props) {
  const { course, onClose, onReload } = props;

  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(course),
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        if (!course) {
          await courseController.createCourse(accessToken, formValues);
        } else {
          await courseController.updateCourse(
            accessToken,
            course._id,
            formValues
          );
        }

        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    formik.setFieldValue("miniature", URL.createObjectURL(file));
    formik.setFieldValue("file", file);
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpg",
    onDrop,
  });

  const getMiniature = () => {
    if (formik.values.file) {
      return formik.values.miniature;
    } else if (formik.values.miniature) {
      return `${ENV.BASE_PATH}/${formik.values.miniature}`;
    }
  };

  return (
    <Form className="course-form" onSubmit={formik.handleSubmit}>
      <div className="course-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Drop your miniature</span>
          </div>
        )}
        <Icon name="edit" />
      </div>
      <Form.Input
        name="title"
        placeholder="Title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />
      <Form.Input
        name="url"
        placeholder="Link"
        value={formik.values.url}
        onChange={formik.handleChange}
        error={formik.errors.url}
      />
      <Form.TextArea
        name="description"
        placeholder="Description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
      />
      <Form.Group widths="equals">
        <Form.Input
          type="number"
          name="price"
          placeholder="Price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <Form.Input
          type="number"
          name="score"
          placeholder="Score"
          value={formik.values.score}
          onChange={formik.handleChange}
          error={formik.errors.score}
        />
      </Form.Group>
      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        {course ? "Update course" : "Create course"}
      </Form.Button>
    </Form>
  );
}
