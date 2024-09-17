import { useState } from "react";
import { useAuth } from "../../../../hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { Newsletter } from "../../../../api";
import "./EmailItem.scss";

const newsletterController = new Newsletter();

export function EmailItem(props) {
  const { email, onReload } = props;
  const [showConfirm, setShowConfirm] = useState(false);

  const { accessToken } = useAuth();

  const onOpenCloseConfirm = () => setShowConfirm((prev) => !prev);

  const onDelete = async () => {
    try {
      await newsletterController.deleteEmail(accessToken, email._id);
      onReload();
      onOpenCloseConfirm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="email-item">
        <span>{email.email}</span>

        <div>
          <Button icon color="red" onClick={onOpenCloseConfirm}>
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      <Confirm
        open={showConfirm}
        onCancel={onOpenCloseConfirm}
        onConfirm={onDelete}
        content={`Unsubscribe email "${email.email}" ?`}
        size="mini"
      />
    </>
  );
}
