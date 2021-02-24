import { Component } from "react";

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSeriesFilter = this.handleSeriesFilter.bind(this);
    this.updateSeries = this.updateSeries.bind(this);
  }
  updateSeries = (serie) => this.props.seriesSelect(serie);
  handleSeriesFilter = (e) => {
    this.props.seriesChange(e.target.value);
  };
  render() {
    let SeriesList = this.props.series.map((serie) => (
      <li key={serie} onClick={() => this.updateSeries(serie)}>
        {serie}
      </li>
    ));
    return (
      <div>
        <input type="text" onChange={this.handleSeriesFilter} />
        <div>{SeriesList}</div>
      </div>
    );
  }
}

export default Autocomplete;
