import { useCallback } from "react";
import { Form, Image } from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import { Editor } from "@tinymce/tinymce-react";
import "./PostForm.scss";

export function PostForm() {
  const onDrop = useCallback((acceptedFile) => {
    const file = acceptedFile[0];
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/png, image/jpg",
    onDrop,
  });

  const getMiniature = () => {
    return null;
  };

  return (
    <Form className="post-forms">
      <Form.Group widths="equal">
        <Form.Input name="title" placeholder="Post title" />
        <Form.Input name="path" placeholder="Post path" />
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
      </div>

      <Form.Button type="submit" primary fluid>
        Create post
      </Form.Button>
    </Form>
  );
}
