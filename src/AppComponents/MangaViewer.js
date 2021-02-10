import React, { Component } from "react";

class MangaViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullPages: [
        "/series/one_piece/0001/desktop/page__0001.png",
        "/series/one_piece/0001/desktop/page_0002",
        "/series/one_piece/0001/desktop/page_0003",
        "/series/one_piece/0001/desktop/page_0004",
        "/series/one_piece/0001/desktop/page_0005",
        "/series/one_piece/0001/desktop/page_0006",
        "/series/one_piece/0001/desktop/page_0007",
        "/series/one_piece/0001/desktop/page_0008",
        "/series/one_piece/0001/desktop/page_0009",
        "/series/one_piece/0001/desktop/page_0010",
      ],
      panelPages: [
        "/series/one_piece/0001/mobile/page_0001_panel_0001.png",
        "/series/one_piece/0001/mobile/page_0001_panel_0002.png",
      ],
      currentPage: 0,
    };
    this.goForward = this.goForward.bind(this);
    this.goBackward = this.goBackward.bind(this);
  }
  goForward() {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }
  goBackward() {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }
  render() {
    let panels = this.state.panelPages.map((panel, index) => {
      if (this.state.currentPage > index) {
        return (
          <img
            key={index}
            src={panel}
            className="manga-panel-left"
            alt="testing"
          />
        );
      }
      if (this.state.currentPage === index) {
        return (
          <img
            key={index}
            src={panel}
            className="manga-panel-center"
            alt="testing"
          />
        );
      }
      if (this.state.currentPage < index) {
        return (
          <img
            key={index}
            src={panel}
            className="manga-panel-right"
            alt="testing"
          />
        );
      } else {
        return null;
      }
    });
    return (
      <div className="manga-viewer">
        <div className="manga-container">{panels}</div>
        <div className="manga-pager">
          <div onClick={this.goForward}> ⏪ </div>
          <div onClick={this.goBackward}> ⏩ </div>
        </div>
      </div>
    );
  }
}

export default MangaViewer;
