// rewrite this using hardcoded images.
// All images should be just 200x200 and work from there

import { Component } from "react";
import { Link } from "react-router-dom";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboveTheFold1: [
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
      ],
      aboveTheFold2: [
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
    let AbTFo1 = this.state.aboveTheFold1.map((series, index) => {
      return (
        <div className="ab_the_fold manga-window" key={index}>
          <Link to={`series/${series.chunkyName}/${series.numberedChapter}`}>
            <p>{series.series}</p>
            <img src={series.iconCover} alt="" />
            <p>{series.chapter}</p>
          </Link>
        </div>
      );
    });
    let AbTFo2 = this.state.aboveTheFold2.map((series, index) => {
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
        <div className="content">
          <div className="ab_the_fold grid">{AbTFo1}</div>
          <div className="ab_the_fold grid">{AbTFo2}</div>
        </div>
      </>
    );
  }
}

export default Content;
