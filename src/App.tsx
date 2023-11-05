import { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Search from './Components/Search/Search';
import Results from './Components/Results/Results';
interface AppProps {}
interface AppState {
  searchValue: string;
  error: boolean;
}

export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const savedSearchValue = localStorage.getItem('searchValue');
    this.state = {
      searchValue: savedSearchValue || '',
      error: false,
    };
  }
  handleSearchChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  throwNewError = () => {
    this.setState({
      error: true,
    });
  };
  render() {
    if (this.state.error) {
      throw new Error('Lets test the error boundary');
    }

    const { searchValue } = this.state;
    return (
      <div className="App">
        <Header />
        <button onClick={this.throwNewError}>Error test button</button>
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
