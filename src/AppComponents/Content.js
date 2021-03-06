// rewrite this using hardcoded images.
// All images should be just 200x200 and work from there

import { Component } from "react";
import { Link } from "react-router-dom";
import configData from "../config.json";
import axios from "axios";

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboveTheFold1: [],
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
  fetchHomepage = async (user_id) => {
    let response;
    try {
      response = await axios.get(
        `https://np9avsydf3.execute-api.us-east-1.amazonaws.com/stage/homepage?user_id=${user_id}`
      );
      // console.log(response);
      this.setState({ aboveTheFold1: response.data.data });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.fetchHomepage(1);
  }
  render() {
    let AbTFo1 = this.state.aboveTheFold1.map((series, index) => {
      return (
        <div className="ab_the_fold manga-window" key={index}>
          <Link to={`series/${series.series_name}/${series.chapter_id}`}>
            <img
              src={`${configData.CLOUDTRAIL}/${series.series_icon}`}
              alt=""
            />
            <div className="series_data">
              <p>{series.series_name}</p>
              <p>{series.chapter}</p>
            </div>
          </Link>
        </div>
      );
    });
    // let AbTFo2 = this.state.aboveTheFold2.map((series, index) => {
    //   return (
    //     <div className="ab_the_fold manga-window" key={index}>
    //       <Link
    //         to={`series/${series.chunkyName}/${series.chapterValue}`}
    //         params={series.chunkyName}
    //       >
    //         <img src={series.iconCover} alt="" />
    //         <div className="series_data">
    //           <p>{series.series}</p>
    //           <p>{series.chapter}</p>
    //         </div>
    //       </Link>
    //     </div>
    //   );
    // });
    return (
      <>
        <div className="content">
          <div className="ab_the_fold grid">{AbTFo1}</div>
          {/* <div className="ab_the_fold grid">{AbTFo2}</div> */}
        </div>
      </>
    );
  }
}

export default Content;
