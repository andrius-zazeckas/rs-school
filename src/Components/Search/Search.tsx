import { Component } from 'react';
import './Search.css';

interface SearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
}

interface SearchState {
  searchValue: string;
}

export default class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedSearchValue = localStorage.getItem('searchValue');
    this.state = {
      searchValue: savedSearchValue || props.searchValue,
    };
  }

  handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      searchValue: e.target.value,
    });
  };

  handleSearch = () => {
    localStorage.setItem('searchValue', this.state.searchValue.trim());
    this.props.onSearchChange(this.state.searchValue);
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
