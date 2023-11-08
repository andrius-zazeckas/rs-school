import { useState } from 'react';
import './App.css';
import { SearchContext } from './Components/Context/SearchContext';
import { MainRouter } from './Components/MainRouter/MainRouter';
import { PeopleContext } from './Components/Context/PeopleContext';
import { TPerson } from './Components/Results/Results';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [people, setPeople] = useState<TPerson[]>([]);
  const [personDetails, setPersonDetails] = useState<TPerson | null>(null);

  return (
    <div>
      <PeopleContext.Provider
        value={{
          people,
          setPeople,
          personDetails,
          setPersonDetails,
        }}
      >
        <SearchContext.Provider
          value={{
            searchValue,
            setSearchValue,
          }}
        >
          <MainRouter />
        </SearchContext.Provider>
      </PeopleContext.Provider>
    </div>
  );
};
