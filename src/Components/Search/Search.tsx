import { Component } from 'react';
import './Search.css';

export default class Search extends Component {
  previousSearchValue = localStorage.getItem('searchValue');

  state = {
    searchValue: this.previousSearchValue ? this.previousSearchValue : '',
  };

  handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearch = () => {
    if (this.state.searchValue) {
      localStorage.setItem('searchValue', this.state.searchValue);
    }
  };

  render() {
    return (
      <div className="search">
        <input
          value={this.state.searchValue}
          onChange={this.handleSearchValueChange}
        />
        <button onClick={this.handleSearch}>Search</button>
        <p>{this.state.searchValue}</p>
      </div>
    );
  }
}
