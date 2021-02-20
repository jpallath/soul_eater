import { Component } from "react";
// import axios from "axios";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: ["One Piece", "Naruto", "Dragon Ball"],
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
  handleTitleChange = (e) => this.setState({ title: e.target.value });
  handleDescriptionChange = (e) =>
    this.setState({ description: e.target.value });
  handleUpload = () => {
    let { selectedFiles, selectedSeries, title, description } = this.state;
    console.log(selectedSeries);
    console.log(title);
    console.log(description);
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
          <div className="upload_preview">
            <img
              src={file.source}
              key={file.fileData.name}
              alt={file.fileData.name}
            />
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
          <button onClick={this.handleUpload}>Upload</button>
        </div>
      );
    }
    return <div className="content">{FilesComponent}</div>;
  }
}

export default Create;
