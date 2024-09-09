import { useState, useEffect } from "react";
import { Loader } from "semantic-ui-react";
import { size } from "lodash";
import { MenuItem } from "../MenuItem";
import { Menu } from "../../../../api";

const menuController = new Menu();

export function MenusList(props) {
  const { activeMenus, reload, onReload } = props;
  const [menus, setMenus] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setMenus(null);
        const response = await menuController.getMenus(activeMenus);
        setMenus(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [activeMenus, reload]);

  if (!menus) return <Loader active inline="centered" />;
  if (size(menus) === 0) return "There are no menus";

  return (
    <>
      {menus.map((menu) => (
        <MenuItem menu={menu} onReload={onReload} />
      ))}
    </>
  );
}
