import React, { Component } from "react";
import { Link } from "react-router-dom";

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
      <div
        className={
          additionalClass === true ? "sidebar-hidden" : "sidebar-shown"
        }
      >
        <nav>
          <div>
            <Link to="/" className="seibuu-home">
              <h1>Seibu {additionalClass}</h1>
            </Link>
          </div>
          <div className="sidebar_nav">
            <Link to={"/users/" + this.state.userName}>
              {this.state.userName}
            </Link>
            <Link to="/create">Create</Link>
            <Link to="/">Notifications</Link>
          </div>
        </nav>
        {sidebarButton}
      </div>
    );
  }
}

export default Sider;
