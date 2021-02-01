import React, { Component } from "react";
import { Link } from "react-router-dom";

import Sider from "./Sider";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboveTheFold: [
        {
          series: "One Piece",
          chunkyName: "onepiece",
          chapter: "Romance Dawn The Dawn of Adventure",
          iconCover: "/covers/onepiece_0001.png",
          numberedChapter: "0001",
        },
        {
          series: "Shaman King",
          chunkyName: "shamanking",
          chapter: "The Boy Who Dances with Ghost",
          iconCover: "/covers/shamanking_0001.png",
          numberedChapter: "0001",
        },
        {
          series: "Dragonball",
          chunkyName: "dragonball",
          chapter: "Bloomers and the Monkey King",
          iconCover: "/covers/dragonball_0001.png",
          numberedChapter: "0001",
        },
        {
          series: "Naruto",
          chunkyName: "naruto",
          chapter: "Uzumaki Naruto",
          iconCover: "/covers/naruto_0001.png",
          numberedChapter: "0001",
        },
        {
          series: "Soul Eater",
          chunkyName: "souleater",
          chapter: "Soul Eater",
          iconCover: "/covers/souleater_0001.png",
          numberedChapter: "0001",
        },
        {
          series: "Inuyasha",
          chunkyName: "inuyasha",
          chapter: "The Sealed Away Boy",
          iconCover: "/covers/inuyasha_0001.png",
          numberedChapter: "0001",
        },
      ],
    };
  }
  render() {
    let AbTFo = this.state.aboveTheFold.map((series, index) => {
      return (
        <div className="ab_the_fold manga-window" key={index}>
          <Link to={`series/${series.chunkyName}/${series.numberedChapter}`}>
            <img src={series.iconCover} alt="" />
            <p>{series.chapter}</p>
          </Link>
        </div>
      );
    });
    return (
      <>
        <Sider />
        <div className="content">
          <div className="ab_the_fold grid">{AbTFo}</div>
        </div>
      </>
    );
  }
}

export default Content;
