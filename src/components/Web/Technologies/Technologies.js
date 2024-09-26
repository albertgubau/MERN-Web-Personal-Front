import { Container, Icon } from "semantic-ui-react";
import { itemsData } from "./Technologies.data";
import "./Technologies.scss";

export function Technologies() {
  return (
    <Container className="technologies">
      <h2>Technologies I've worked with</h2>
      <h4>
        These are some of the technologies that I have used in some of my
        projects:
      </h4>

      <div className="technologies__items">
        {itemsData.map((item, index) => (
          <div key={index}>
            <Icon name={item.icon} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
