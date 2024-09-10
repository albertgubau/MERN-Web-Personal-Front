import { useState } from "react";
import { Tab, Button } from "semantic-ui-react";
import { BasicModal } from "../../../components/Shared";
import { CoursesList, CourseForm } from "../../../components/Admin/Courses";
import "./Courses.scss";

export function Courses() {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  const onOpenCloseModal = () => setShowModal((prev) => !prev);
  const onReload = () => setReload((prev) => !prev);

  return (
    <>
      <div className="courses-page">
        <div className="courses-page__add">
          <Button primary onClick={onOpenCloseModal}>
            New Course
          </Button>
        </div>
        <Tab.Pane attached={false}>
          <CoursesList reload={reload} onReload={onReload} />
        </Tab.Pane>
      </div>

      <BasicModal
        show={showModal}
        onClose={onOpenCloseModal}
        title="Create course">
        <CourseForm onClose={onOpenCloseModal} onReload={onReload} />
      </BasicModal>
    </>
  );
}
