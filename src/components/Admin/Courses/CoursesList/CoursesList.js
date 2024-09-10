import { useState, useEffect } from "react";
import { size } from "lodash";
import { Course } from "../../../../api";
import { Loader, Pagination } from "semantic-ui-react";
import { CourseItem } from "../CourseItem";
import "./CoursesList.scss";

const courseController = new Course();

export function CoursesList() {
  const [courses, setCourses] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState();

  useEffect(() => {
    (async () => {
      try {
        const response = await courseController.getCourses({ page, limit: 10 });
        setCourses(response.docs);
        setPagination({
          limit: response.limit,
          page: response.page,
          totalPages: response.totalPages,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [page]);

  const changePage = (_, data) => {
    setPage(data.activePage);
  };

  if (!courses) return <Loader active inline="centered" />;
  if (size(courses) === 0) return "There are no courses created";

  return (
    <div className="courses-list">
      <div className="courses-list__items">
        {courses.map((course) => (
          <CourseItem key={course._id} course={course} />
        ))}
      </div>
      <div className="courses-list__pagination">
        <Pagination
          totalPages={pagination.totalPages}
          defaultActivePage={pagination.page}
          ellipsisItem={null}
          firstItem={null}
          lastItem={null}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
}
