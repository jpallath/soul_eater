import Content from "./AppComponents/Content";
import MangaViewer from "./AppComponents/MangaViewer";
import Sider from "./AppComponents/Sider";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      triggerMenu: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.setState({ triggerMenu: !this.state.triggerMenu });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Sider
            triggerMenu={this.handleChange}
            additionalClass={this.state.triggerMenu}
          />
          <Switch>
            <Route path="/" exact>
              <Content />
            </Route>
            <Route path="/users/:user">
              <div>testing</div>
            </Route>
            <Route path="/series/:chunkyName/:chapter">
              <MangaViewer />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
