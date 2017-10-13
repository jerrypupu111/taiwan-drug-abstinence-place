import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Header,
  Segment,
  Container,
  Menu,
  Item,
  Button,
  Icon
} from "semantic-ui-react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { Home } from "./home";

class MastHead extends React.Component<any, any> {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
class SearchForm extends React.Component<any, any> {}
const Main = () => (
  <div>
    <MastHead />
  </div>
);

ReactDOM.render(<Main />, document.getElementById("main"));