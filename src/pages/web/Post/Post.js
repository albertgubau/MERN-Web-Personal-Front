import { useState, useEffect } from "react";
import { Container, Loader } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { Blog } from "../../../api";
import "./Post.scss";

const blogController = new Blog();

export function Post() {
  const [post, setPost] = useState(null);

  const { postPath } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await blogController.getPostByPath(postPath);
        setPost(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  if (!post) return <Loader active inline="centered" />;

  return (
    <Container className="post">
      <h1 className="title">{post.title}</h1>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </Container>
  );
}
