import { useState } from "react";
import { Tab } from "semantic-ui-react";
import { Icon } from "../../../assets";
import "./Auth.scss";

export function Auth() {
  const [activeIndex, setActiveIndex] = useState(0);

  const panes = [
    {
      menuItem: "Enter",
      render: () => (
        <Tab.Pane>
          <h2>Login Form</h2>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "New user",
      render: () => (
        <Tab.Pane>
          <h2>Register form</h2>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <div className="auth">
      <Icon.LogoWhite className="logo" />
      <Tab
        panes={panes}
        className="auth__forms"
        activeIndex={activeIndex}
        onTabChange={(_, data) => setActiveIndex(data.activeIndex)}
      />
    </div>
  );
}
