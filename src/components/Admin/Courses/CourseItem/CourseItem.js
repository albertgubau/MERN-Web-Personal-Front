import { useState } from "react";
import { Image, Button, Icon, Confirm } from "semantic-ui-react";
import { ENV } from "../../../../utils";
import { BasicModal } from "../../../Shared";
import { CourseForm } from "../CourseForm";
import { Course } from "../../../../api";
import { useAuth } from "../../../../hooks";
import "./CourseItem.scss";

const courseController = new Course();

export function CourseItem(props) {
  const { course, onReload } = props;
  const { accessToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const onOpenCloseCourseUpdate = () => {
    setModalTitle(`Update course ${course.title}`);
    setShowModal((prev) => !prev);
  };

  const onOpenCloseDeleteCourse = () => setShowDeleteConfirm((prev) => !prev);

  const onDeleteCourse = async () => {
    try {
      await courseController.deleteCourse(accessToken, course._id);
      onReload();
      onOpenCloseDeleteCourse();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="course-item">
        <div className="course-item__info">
          <Image src={`${ENV.BASE_PATH}/${course.miniature}`} />
          <div>
            <p>{course.title}</p>
          </div>
        </div>
        <div>
          <Button icon as="a" href={course.url} target="_blank">
            <Icon name="eye" />
          </Button>
          <Button icon primary onClick={onOpenCloseCourseUpdate}>
            <Icon name="pencil" />
          </Button>
          <Button icon color="red" onClick={onOpenCloseDeleteCourse}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>

      <BasicModal
        show={showModal}
        title={modalTitle}
        onClose={onOpenCloseCourseUpdate}>
        <CourseForm
          course={course}
          onClose={onOpenCloseCourseUpdate}
          onReload={onReload}
        />
      </BasicModal>

      <Confirm
        open={showDeleteConfirm}
        onCancel={onOpenCloseDeleteCourse}
        onConfirm={onDeleteCourse}
        content={`Delete course "${course.title}" ?`}
        size="mini"
      />
    </>
  );
}
