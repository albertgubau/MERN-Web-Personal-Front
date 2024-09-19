import { useCallback } from "react";
import { ENV } from "../../../../utils";
import { Form, Image, Icon } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./PostForm.form";
import { Blog } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./PostForm.scss";

const blogController = new Blog();

export function PostForm(props) {
  const { onClose, onReload } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await blogController.createPost(accessToken, formValues);
        onReload();
        onClose();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
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
      return `${ENV.BASE_API}/${formik.values.miniature}`;
    }
  };

  return (
    <Form className="post-forms" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="title"
          placeholder="Post title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Form.Input
          name="path"
          placeholder="Post path"
          value={formik.values.path}
          onChange={formik.handleChange}
          error={formik.errors.path}
        />
      </Form.Group>

      <Editor
        init={{
          height: 400,
          menubar: true,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help",
        }}
        initialValue={formik.values.content}
        onChange={(e) => formik.setFieldValue("content", e.target.getContent())}
        error={formik.errors.content}
      />

      <div className="post-form__miniature" {...getRootProps()}>
        <input {...getInputProps()} />
        {getMiniature() ? (
          <Image size="small" src={getMiniature()} />
        ) : (
          <div>
            <span>Drop your image here</span>
          </div>
        )}
        <Icon name="edit" />
      </div>

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Create post
      </Form.Button>
    </Form>
  );
}
