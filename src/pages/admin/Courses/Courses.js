import { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { CoursesList } from "../../../components/Admin/Courses/CoursesList/CoursesList";
import "./Courses.scss";

export function Courses() {
  const [showModal, setShowModal] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);

  return (
    <>
      <div className="courses-page">
        <div className="courses-page__add">
          <Button primary onClick={onOpenCloseModal}>
            New Course
          </Button>
        </div>
        <Tab.Pane attached={false}>
          <CoursesList />
        </Tab.Pane>
      </div>

      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title="Create course">
        <p>Create course form</p>
      </BasicModal>
    </>
  );
}
