import { Container } from "semantic-ui-react";
import "./Banner.scss";

export function Banner() {
  return (
    <div className="banner">
      <Container>
        <h1>This is my personal web page</h1>
        <h2>
          Developed with the MERN Stack (MongoDb, Express, React and Node)
          <br />
          to show some of my professional habilities.
        </h2>
        <div className="banner__dark" />
      </Container>
    </div>
  );
}
