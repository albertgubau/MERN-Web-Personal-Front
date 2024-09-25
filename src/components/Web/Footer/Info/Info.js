import { Button } from "semantic-ui-react";
import { Icon } from "../../../../assets";
import { socialData } from "../../../../utils/social-data";
import "./Info.scss";

export function Info() {
  return (
    <div className="footer-info">
      <Icon.LogoWhite className="logo" />
      <p>
        I enjoy creating websites and learning the latest up-to-date
        technologies.
      </p>
      {socialData.map((socialDataItem) => (
        <Button
          key={socialDataItem.type}
          as="a"
          href={socialDataItem.link}
          color={socialDataItem.type}
          icon={socialDataItem.type}
        />
      ))}
    </div>
  );
}
