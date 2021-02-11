import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

class Sider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "pallethechu",
      favorites: ["dragonball", "one piece", "soul eater"],
      notifications: 10,
      ads: ["target"],
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.props.triggerMenu();
  }
  render() {
    let { additionalClass } = this.props;
    let sidebarButton =
      additionalClass === false ? (
        <div className="close_sidebar" onClick={this.handleClose}>
          X
        </div>
      ) : (
        <div className="close_sidebar" onClick={this.handleClose}>
          📚
        </div>
      );
    return (
      <Router>
        <div
          className={
            additionalClass === true ? "sidebar-hidden" : "sidebar-shown"
          }
        >
          <nav>
            <div>
              <Link to="/" className="seibuu-home">
                <h1>Seibuu {additionalClass}</h1>
              </Link>
            </div>
            <div className="sidebar_nav">
              <Link to="/">
                <h3>{this.state.userName}</h3>
              </Link>
              <Link to="/">Notifications</Link>
            </div>
          </nav>
          {sidebarButton}
        </div>
      </Router>
    );
  }
}

export default Sider;
