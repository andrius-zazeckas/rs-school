import { Component } from 'react';

export default class Search extends Component {
  state = {
    searchValue: 'test',
  };

  handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearch = () => {
    const { searchValue } = this.state;

    console.log(searchValue);
  };

  render() {
    return (
      <>
        <input
          value={this.state.searchValue}
          onChange={this.handleSearchValueChange}
        />
        <button onClick={this.handleSearch}>Search</button>
        <p>{this.state.searchValue}</p>
      </>
    );
  }
}
