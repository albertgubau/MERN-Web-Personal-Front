import { useState, useEffect } from "react";
import { Container, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Icon } from "../../../assets";
import { Menu } from "../../../api";
import { socialData } from "../../../utils/social-data";
import "./TopBar.scss";

const menuController = new Menu();

export function TopBar() {
  const [menuItems, setMenuItems] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await menuController.getMenuItems(true);
        setMenuItems(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="top-bar">
      <Container>
        <div className="top-bar__left">
          <Link to="/" className="logo">
            <Icon.LogoWhite />
          </Link>
          <div className="menu">
            {menuItems?.map((menuItem) => (
              <a key={menuItem._id} href={menuItem.path}>
                {menuItem.title}
              </a>
            ))}
          </div>
        </div>
        <div>
          {socialData?.map((socialDataItem) => (
            <Button
              key={socialDataItem.type}
              as="a"
              target="_blank"
              href={socialDataItem.link}
              color={socialDataItem.type}
              icon={socialDataItem.type}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
