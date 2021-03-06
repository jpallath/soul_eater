import { Component } from "react";
import axios from "axios";
import FileSelect from "./CreateComponents/FileSelect";
import FileManagement from "./CreateComponents/FileManagement";

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "pallethechu",
      baseSeries: [
        "One Piece",
        "Shaman King",
        "Dragon Ball",
        "Naruto",
        "Soul Eater",
        "The Sealed Away Boy",
      ],
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

  handleTitleChange = (title) => this.setState({ title: title });

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

  handleDescriptionChange = (description) =>
    this.setState({ description: description });

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
    let { selectedFiles, series, title, description } = this.state;
    let CreateComponent;
    if (selectedFiles.length === 0) {
      CreateComponent = <FileSelect onFileSelect={this.handleFileInput} />;
    } else {
      CreateComponent = (
        <FileManagement
          series={series}
          setSeries={this.onSelectSeries}
          selectedFiles={selectedFiles}
          onSeriesTyped={this.handleSeriesUpdate}
          title={title}
          description={description}
          titleChange={this.handleTitleChange}
          handleDescriptionChange={this.handleDescriptionChange}
          handleUpload={this.handleUpload}
        />
      );
    }
    return <div className="content">{CreateComponent}</div>;
  }
}

export default Create;
