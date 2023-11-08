import { useState } from 'react';
import './App.css';
import { SearchContext } from './Components/Context/SearchContext';
import { MainRouter } from './Components/MainRouter/MainRouter';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div>
      <SearchContext.Provider
        value={{
          searchValue,
          setSearchValue,
        }}
      >
        <MainRouter />
      </SearchContext.Provider>
    </div>
  );
};
