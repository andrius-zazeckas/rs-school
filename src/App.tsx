import React, { useState } from 'react';
import './App.css';
import { Header } from './Components/Header/Header';
import { Search } from './Components/Search/Search';
import { Results } from './Components/Results/Results';

interface AppProps {}

export const App: React.FC<AppProps> = () => {
  const [searchValue, setSearchValue] = useState(
    localStorage.getItem('searchValue') || ''
  );
  const [error, setError] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const throwNewError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('Lets test the error boundary');
  }

  return (
    <div className="App">
      <Header />
      <button onClick={throwNewError}>Error test button</button>
      <Search onSearchChange={handleSearchChange} searchValue={searchValue} />
      <Results searchValue={searchValue} onSearchChange={handleSearchChange} />
    </div>
  );
};
