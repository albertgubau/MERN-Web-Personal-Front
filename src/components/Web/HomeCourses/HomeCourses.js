import { useState, useEffect } from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Course } from "../../../api";
import { ENV } from "../../../utils";
import "./HomeCourses.scss";

const courseController = new Course();

export function HomeCourses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ limit: 6 });
        setCourses(response.docs);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <Container className="home-courses">
      <h2>These are some of the courses that I have completed!</h2>
      <div className="home-courses__all-courses">
        {courses?.map((course) => (
          <a
            key={course._id}
            href={course.url}
            target="_blank"
            rel="noreferrer">
            <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
            <div>
              <span>{course.title}</span>
              <span>{course.description}</span>
            </div>
          </a>
        ))}
      </div>
      <div className="home-courses__more">
        <Button as={Link} to="/courses" primary>
          See more
        </Button>
      </div>
    </Container>
  );
}
