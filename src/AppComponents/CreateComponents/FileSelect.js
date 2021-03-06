import { Component } from "react";

class FileSelectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFileInput = this.handleFileInput.bind(this);
  }
  handleFileInput = (files) => {
    this.props.onFileSelect(files);
  };
  render() {
    return (
      <div>
        <input
          type="file"
          multiple
          onChange={(e) => this.handleFileInput(e.target.files)}
        />
      </div>
    );
  }
}

export default FileSelectComponent;
