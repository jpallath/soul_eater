import { Component } from "react";
import Autocomplete from "./Autocomplete";

class FileManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleTitleChange = this.handleTitleChange.bind(this);
    // this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleDescriptionChange = (e) => {
    this.props.handleDescriptionChange(e.target.value);
  };
  handleTitleChange = (e) => this.props.titleChange(e.target.value);
  handleFileInput = (files) => {
    this.props.onFileSelect(files);
  };
  handleSeriesUpdate = (seriesText) => {
    this.props.onSeriesTyped(seriesText);
  };
  seriesSelect = (serie) => {
    this.props.setSeries(serie);
  };
  seriesBlurred = (serie) => {
    console.log(serie);
  };
  handleUpload = () => this.props.handleUpload();
  render() {
    let { series, title, description } = this.props;
    let SeriesSelect;
    if (series.length > 0) {
      SeriesSelect = (
        //   Will have to rewire seriesBlurred later
        <Autocomplete
          series={series}
          seriesChange={this.handleSeriesUpdate}
          seriesSelect={this.seriesSelect}
          seriesBlurred={this.seriesBlurred}
        />
      );
    }
    let previews = this.props.selectedFiles.map((file) => {
      return (
        <div className="upload_preview" key={file.fileData.name}>
          <img src={file.source} alt={file.fileData.name} />
          <p>{file.fileData.name}</p>
        </div>
      );
    });
    return (
      <div>
        <div className="upload_container">{previews}</div>
        <div className="upload_meta">
          <div>{SeriesSelect}</div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              onChange={this.handleTitleChange}
            />
          </div>
          <div>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              value={description}
              onChange={this.handleDescriptionChange}
            ></textarea>
          </div>
        </div>
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default FileManagement;
