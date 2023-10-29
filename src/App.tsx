import { Component } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Results from './Components/Results/Results';
import Search from './Components/Search/Search';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Search />
        <Results />
      </div>
    );
  }
}
