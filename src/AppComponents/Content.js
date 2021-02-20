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
          chunkyName: "one_piece",
          chapter: "Romance Dawn The Dawn of Adventure",
          iconCover: "https://d5dplrzteyoni.cloudfront.net/one_piece_icon.jpg",
          numberedChapter: "0001",
        },
        {
          series: "Shaman King",
          chunkyName: "shaman_king",
          chapter: "The Boy Who Dances with Ghost",
          iconCover:
            "https://d5dplrzteyoni.cloudfront.net/shaman_king_icon.jpg",
          numberedChapter: "0001",
        },
        {
          series: "Dragonball",
          chunkyName: "dragonball",
          chapter: "Bloomers and the Monkey King",
          iconCover:
            "https://d5dplrzteyoni.cloudfront.net/dargon_ball_icon.jpg",
          numberedChapter: "0001",
        },
      ],
      aboveTheFold2: [
        {
          series: "Naruto",
          chunkyName: "naruto",
          chapter: "Uzumaki Naruto",
          iconCover: "https://d5dplrzteyoni.cloudfront.net/naruto_icon.jpg",
          numberedChapter: "0001",
        },
        {
          series: "Soul Eater",
          chunkyName: "souleater",
          chapter: "Soul Eater",
          iconCover: "https://d5dplrzteyoni.cloudfront.net/souleater_icon.png",
          numberedChapter: "0001",
        },
        {
          series: "Inuyasha",
          chunkyName: "inuyasha",
          chapter: "The Sealed Away Boy",
          iconCover: "https://d5dplrzteyoni.cloudfront.net/inuyasha_icon.png",
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
