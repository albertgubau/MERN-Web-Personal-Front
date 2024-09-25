import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Menu.scss";

export function Menu() {
  return (
    <div className="footer-menu">
      <h4>Navigation</h4>

      <Grid columns={2}>
        <Grid.Column>
          <Link to="#">
            <Icon name="book" /> Online courses
          </Link>
          <Link to="#">
            <Icon name="code" /> Web Development
          </Link>
          <Link to="#">
            <Icon name="database" /> Databases
          </Link>
          <Link to="#">
            <Icon name="code" /> UX/UI
          </Link>
        </Grid.Column>

        <Grid.Column>
          <Link to="#">
            <Icon name="server" /> Servers / Systems
          </Link>
          <Link to="#">
            <Icon name="cogs" /> CMS
          </Link>
          <Link to="#">
            <Icon name="user outline" /> Portfolio
          </Link>
          <Link to="#">
            <Icon name="python" /> Backend
          </Link>
        </Grid.Column>
      </Grid>
    </div>
  );
}
