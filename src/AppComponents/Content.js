// rewrite this using hardcoded images.
// All images should be just 200x200 and work from there

import { Component } from "react";
import { Link } from "react-router-dom";
import configData from "../config.json";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboveTheFold1: [
        {
          series: "One Piece",
          chunkyName: "one_piece",
          chapter: "Romance Dawn The Dawn of Adventure",
          iconCover: `${configData.CLOUDTRAIL}/one_piece_icon.jpg`,
          numberedChapter: "0001",
        },
        {
          series: "Shaman King",
          chunkyName: "shaman_king",
          chapter: "The Boy Who Dances with Ghost",
          iconCover: `${configData.CLOUDTRAIL}/shaman_king_icon.jpg`,
          numberedChapter: "0001",
        },
        {
          series: "Dragonball",
          chunkyName: "dragonball",
          chapter: "Bloomers and the Monkey King",
          iconCover: `${configData.CLOUDTRAIL}/dargon_ball_icon.jpg`,
          numberedChapter: "0001",
        },
      ],
      aboveTheFold2: [
        {
          series: "Naruto",
          chunkyName: "naruto",
          chapter: "Uzumaki Naruto",
          iconCover: `${configData.CLOUDTRAIL}/naruto_icon.jpg`,
          numberedChapter: "0001",
        },
        {
          series: "Soul Eater",
          chunkyName: "souleater",
          chapter: "Soul Eater",
          iconCover: `${configData.CLOUDTRAIL}/souleater_icon.png`,
          numberedChapter: "0001",
        },
        {
          series: "Inuyasha",
          chunkyName: "inuyasha",
          chapter: "The Sealed Away Boy",
          iconCover: `${configData.CLOUDTRAIL}/inuyasha_icon.png`,
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
            <img src={series.iconCover} alt="" />
            <div className="series_data">
              <p>{series.series}</p>
              <p>{series.chapter}</p>
            </div>
          </Link>
        </div>
      );
    });
    let AbTFo2 = this.state.aboveTheFold2.map((series, index) => {
      return (
        <div className="ab_the_fold manga-window" key={index}>
          <Link
            to={`series/${series.chunkyName}/${series.numberedChapter}`}
            params={series.chunkyName}
          >
            <img src={series.iconCover} alt="" />
            <div className="series_data">
              <p>{series.series}</p>
              <p>{series.chapter}</p>
            </div>
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
