import React, { Component } from "react";
import axios from "axios";

class MangaViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mangaka: "",
      series: "",
      fullPages: [],
      currentPage: 0,
    };
    this.goForward = this.goForward.bind(this);
    this.goBackward = this.goBackward.bind(this);
    this.handleDirection = this.handleDirection.bind(this);
    this.handleEvent = this.handleEvent.bind(this);
  }
  handleEvent(event) {
    console.log(event);
  }
  goForward() {
    this.setState({ currentPage: this.state.currentPage + 1 });
  }
  goBackward() {
    this.setState({ currentPage: this.state.currentPage - 1 });
  }
  handleDirection(event) {
    if (event.key === "ArrowRight") {
      this.goBackward();
    }
    if (event.key === "ArrowLeft") {
      this.goForward();
    }
  }
  fetchChapterJson = async (chunkyName, chapter) => {
    try {
      const response = await axios.get(
        `https://np9avsydf3.execute-api.us-east-1.amazonaws.com/stage/series/${chunkyName}/chapter/${chapter}`
      );
      let { mangaka, series, fullPages } = response.data.body;
      this.setState({ mangaka, series, fullPages });
    } catch (err) {}
  };
  componentDidMount() {
    let { chunkyName, chapter } = this.props.match.params;
    this.fetchChapterJson(chunkyName, chapter);
    document.addEventListener("keydown", this.handleDirection);
  }
  render() {
    let fullpages = this.state.fullPages.map((fullpage, index) => {
      if (this.state.currentPage < index) {
        return (
          <div className="manga-panel-left" key={index}>
            <img
              src={"https://d1ttoszco3sayb.cloudfront.net" + fullpage}
              alt="testing"
            />
          </div>
        );
      }
      if (this.state.currentPage === index) {
        return (
          <div
            className="manga-panel-center"
            key={index}
            onTouchMove={this.handleEvent}
          >
            <img
              src={"https://d1ttoszco3sayb.cloudfront.net" + fullpage}
              alt="testing"
            />
          </div>
        );
      }
      if (this.state.currentPage > index) {
        return (
          <div className="manga-panel-right" key={index}>
            <img
              src={"https://d1ttoszco3sayb.cloudfront.net" + fullpage}
              alt="testing"
            />
          </div>
        );
      } else {
        return null;
      }
    });
    return (
      <div className="manga-viewer">
        <div className="manga-container">{fullpages}</div>
        <div className="manga-pager">
          <div onClick={this.goForward}> ⏩ </div>
          <div onClick={this.goBackward}> ⏪ </div>
        </div>
      </div>
    );
  }
}

export default MangaViewer;
