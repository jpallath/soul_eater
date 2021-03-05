import { Component } from "react";
import axios from "axios";
import Autocomplete from "./CreateComponents/Autocomplete";

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
  handleSeriesUpdate = (seriesText) => {
    seriesText = seriesText.toLowerCase();
    let { baseSeries } = this.state;
    let newSeries = baseSeries.filter((serie) =>
      serie.toLowerCase().includes(seriesText)
    );
    if (newSeries.length < 1) {
      this.setState({ series: baseSeries });
    } else {
      this.setState({ series: newSeries });
    }
  };
  seriesSelect = (serie) => {
    this.setState({ selectedSeries: serie });
  };
  seriesBlurred = (serie) => {
    this.setState({ selectedSeries: serie });
  };
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
  handleUpload = async () => {
    let { selectedFiles, selectedSeries, title, user } = this.state;
    // before we upload each file to s3 we need to set up database space of the new series/chapter
    let s3Sync = await axios.post(
      "https://np9avsydf3.execute-api.us-east-1.amazonaws.com/stage/chapter-data",
      {
        chapter: title,
        mangaka: user,
        mangaka_id: "pallethechu_id",
        series_name: selectedSeries,
        series_id: "0",
        path: "xyz",
        numberOfPages: selectedFiles.length,
      }
    );
    selectedFiles.forEach((file, index) => {
      index = (index + 1).toString();
      while (index.length < 4) {
        index = 0 + index;
      }
      axios
        .post(
          "https://np9avsydf3.execute-api.us-east-1.amazonaws.com/stage/chapter",
          {
            filename: s3Sync.data.path + "/" + index + ".png",
            fileType: file.fileData.type,
          }
        )
        .then((response) => {
          let name = file.fileData;
          let options = {
            headers: { "Content-Type": file.fileData.type },
          };
          let endpoint = response.data.body.signed_url;
          axios
            .put(endpoint, name, options)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => console.log(err));
        });
    });
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
        seriesList = (
          <Autocomplete
            series={series}
            seriesChange={this.handleSeriesUpdate}
            seriesSelect={this.seriesSelect}
            seriesBlurred={this.seriesBlurred}
          />
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
          <button onClick={this.handleUpload}>Upload</button>
        </div>
      );
    }
    return <div className="content">{FilesComponent}</div>;
  }
}

export default Create;
