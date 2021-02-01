import Content from "./AppComponents/Content";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Content />
          </Route>
          <Route path="/series/:chunkyName/:chapter">
            <About />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

function About() {
  return <h1>testing</h1>;
}

export default App;
