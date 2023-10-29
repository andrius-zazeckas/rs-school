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
        <h3>Search for a character</h3>
        <div className="search-bar">
          <input
            value={this.state.searchValue}
            onChange={this.handleSearchValueChange}
          />
          <button onClick={this.handleSearch}>Search</button>
        </div>
      </div>
    );
  }
}
