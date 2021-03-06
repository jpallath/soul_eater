import { Component } from "react";
import { Link } from "react-router-dom";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="Main-Menu">
        <Link to="/" className="seibuu-home">
          <div>📖Seibu📖</div>
        </Link>
        <div className="Menu-Items">
          <Link to="/create">
            <div>+</div>
          </Link>
          <div>o</div>
        </div>
      </nav>
    );
  }
}

export default Menu;
