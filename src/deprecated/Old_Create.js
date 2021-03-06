import { Component } from "react";
import axios from "axios";
import Autocomplete from "../AppComponents/CreateComponents/Autocomplete";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "pallethechu",
      baseSeries: ["One Piece", "Naruto", "Dragon Ball"],
      series: [
        "One Piece",
        "Shaman King",
        "Dragon Ball",
        "Naruto",
        "Soul Eater",
        "The Sealed Away Boy",
      ],
      selectedFiles: [],
      selectedSeries: "",
      title: "",
      description: "",
    };
    this.handleFileInput = this.handleFileInput.bind(this);
    this.onSelectSeries = this.onSelectSeries.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  seriesSelect = (serie) => {
    this.setState({ selectedSeries: serie });
  };
  seriesBlurred = (serie) => {
    this.setState({ selectedSeries: serie });
  };
  handleFileInput = (files) => {

  };
  onSelectSeries = (sery) => {
    this.setState({ selectedSeries: sery });
  };
  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleDescriptionChange = (e) =>
    this.setState({ description: e.target.value });

  render() {
    let { selectedFiles, series } = this.state;
    let FilesComponent;
    if (selectedFiles.length === 0) {
      FilesComponent = (

      );
    } else {
      let seriesList = null;
      if (series.length > 0) {

        );
      }
      let previews = selectedFiles.map((file) => {
        return (
          <div className="upload_preview" key={file.fileData.name}>
            <img src={file.source} alt={file.fileData.name} />
            <p>{file.fileData.name}</p>
          </div>
        );
      });
      FilesComponent = (
        <div>
          <div className="upload_container">{previews}</div>
          <div className="upload_meta">
            <div>{seriesList}</div>
            <div>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                onChange={this.handleTitleChange}
              />
            </div>
            <div>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              ></textarea>
            </div>
          </div>

        </div>
      );
    }
    return <div className="content">{FilesComponent}</div>;
  }
}

export default Create;
