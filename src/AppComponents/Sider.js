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
  }
  render() {
    return (
      <Router>
        <ul className="sidebar">
          <li>
            <Link to="/">
              <h1>{this.state.userName}</h1>
            </Link>
          </li>
          <li>Favorites: {this.state.favorites.length}</li>
          <li>Notifications {this.state.notifications}</li>
          <img src="/ads/target.jpg" alt="" />
        </ul>
      </Router>
    );
  }
}

export default Sider;
