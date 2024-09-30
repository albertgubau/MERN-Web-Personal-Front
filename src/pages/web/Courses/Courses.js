import { useState, useEffect } from "react";
import { Container, Image, Button } from "semantic-ui-react";
import { Course } from "../../../components/Web/Courses";
import { image } from "../../../assets";
import { Course as CourseController } from "../../../api";
import "./Courses.scss";

const courseController = new CourseController();

export function Courses() {
  const [courses, setCourses] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  const isCurrentLastPage = pagination?.page === pagination?.pages;

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ page, limit: 3 });
        setPagination({
          page: response.page,
          pages: response.totalPages,
        });

        if (!courses) setCourses(response.docs);
        else setCourses([...courses, ...response.docs]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <Container className="courses-page">
      <Image src={image.academyLogo} />
      <h2>
        In this page you will find all the courses that I have attended based
        software engineering and frontend
      </h2>

      <div className="courses">
        {courses?.map((course) => (
          <div key={course._id} className="courses__item">
            <Course course={course} />
          </div>
        ))}
      </div>

      {!isCurrentLastPage && (
        <div className="more">
          <Button onClick={loadMore} primary>
            Load more
          </Button>
        </div>
      )}
    </Container>
  );
}
