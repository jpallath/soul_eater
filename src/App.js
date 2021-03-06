import Content from "./AppComponents/Content";
import MangaViewer from "./AppComponents/MangaViewer";
import Create from "./AppComponents/Create";
import Menu from "./AppComponents/MenuComponents/Menu";
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
          <Menu />
          <Switch>
            <Route path="/" exact>
              <Content />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/users/:user"></Route>
            <Route
              path="/series/:chunkyName/:chapter"
              render={(props) => <MangaViewer {...props} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
