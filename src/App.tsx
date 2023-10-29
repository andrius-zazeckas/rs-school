import { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Results from './Components/Results/Results';
interface AppProps {}
interface AppState {
  searchValue: string;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const savedSearchValue = localStorage.getItem('searchValue');
    this.state = {
      searchValue: savedSearchValue || '',
    };
  }
  handleSearchChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <div className="App">
        <Header />
        <Search
          onSearchChange={this.handleSearchChange}
          searchValue={searchValue}
        />
        <Results
          searchValue={searchValue}
          onSearchChange={this.handleSearchChange}
        />
      </div>
    );
  }
}
