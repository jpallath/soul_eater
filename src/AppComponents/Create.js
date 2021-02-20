import { Component } from "react";
// import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: ["One Piece", "Naruto", "Dragon Ball"],
      selectedFiles: [],
      selectedSeries: "",
    };
    this.handleFileInput = this.handleFileInput.bind(this);
    this.onSelectSeries = this.onSelectSeries.bind(this);
  }
  handleFileInput = (files) => {
    files = Object.entries(files);
    let fileSources = files.map((file) => {
      if (file[1].type.includes("image")) {
        return { source: URL.createObjectURL(file[1]), fileData: file[1] };
      } else {
        return null;
      }
    });
    this.setState({ selectedFiles: [...fileSources] });
  };
  onSelectSeries = (sery) => {
    this.setState({ selectedSeries: sery });
  };
  render() {
    let { selectedFiles, series } = this.state;
    let FilesComponent;
    if (selectedFiles.length === 0) {
      FilesComponent = (
        <div>
          <input
            type="file"
            multiple
            onChange={(e) => this.handleFileInput(e.target.files)}
          />
        </div>
      );
    } else {
      let seriesList = null;
      if (series.length > 0) {
        let Series = series.map((sery) => {
          return (
            <li
              onClick={() => this.onSelectSeries(sery)}
              key={sery}
              className={this.state.selectedSeries === sery ? "active" : null}
            >
              {sery}
            </li>
          );
        });
        seriesList = (
          <div className="series_list">
            {Series}
            {
              <li
                onClick={() => this.onSelectSeries("blank")}
                className={
                  this.state.selectedSeries === "blank" ? "active" : null
                }
              >
                No Series
              </li>
            }
          </div>
        );
      }
      let previews = selectedFiles.map((file) => {
        return (
          <img
            src={file.source}
            key={file.fileData.name}
            alt={file.fileData.name}
          />
        );
      });
      FilesComponent = (
        <div>
          <div className="upload_container">{previews}</div>
          <div className="upload_meta">
            <div>{seriesList}</div>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" />
            </div>
            <div>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
              ></textarea>
            </div>
          </div>
          <button onClick="handleUpload">Upload</button>
        </div>
      );
    }
    return <div className="content">{FilesComponent}</div>;
  }
}

export default Create;
