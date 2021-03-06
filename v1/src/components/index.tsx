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
import { DataForm } from "./dataForm";
import { Login } from "./login";
import { Register } from "./register";
import { ListData } from "./ListData";
import { AgencyList } from "./AgencyList";
import { Database } from "./Database";

class MastHead extends React.Component<any, any> {
  render() {
    return (
      <HashRouter>
        <div>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/lists" component={AgencyList} />
            <Route path="/login" component={Login} />
            <Route path="/list" component={ListData} />
            <Route path="/form" component={DataForm} />
            <Route path="/database" component={Database} />
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
