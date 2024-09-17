import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { EmailsList } from "../../../components/Admin/Newsletter";

export function Newsletter() {
  const [reload, setReload] = useState(false);

  const onReload = () => setReload((prev) => !prev);

  return (
    <div className="newsletter-page">
      <Tab.Pane attached={false}>
        <EmailsList reload={reload} onReload={onReload} />
      </Tab.Pane>
    </div>
  );
}
